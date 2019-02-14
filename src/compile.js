const { writeFileSync } = require('fs');
const getToken = require('@highpoint/get-ps-token');
const mergeSCSS = require('@highpoint/merge-scss');
const postcss = require('postcss');
const postCssUrl = require('postcss-url');
const request = require('request-promise');

require('dotenv').config({ silent: true });

const {
  PS_HOSTNAME,
  PS_ENVIRONMENT,
  PS_NODE,
  HTTP_USERNAME,
  HTTP_PASSWORD
} = process.env;

const compileBranding = async ({ app, inFile, outDir, weblib }) => {
  const baseURI =
    `https://${PS_HOSTNAME}/psc/${PS_ENVIRONMENT}/EMPLOYEE/${PS_NODE}/s/` +
    `${weblib}.ISCRIPT1.FieldFormula.IScript`;

  const requestConfig = {
    headers: { 'User-Agent': 'request' },
    jar: await getToken(process.env),
    resolveWithFullResponse: true
  };

  const template = await mergeSCSS(inFile);

  const prependUrls = cssIn =>
    postcss([
      postCssUrl({
        url: ({ url }) => `https://${PS_HOSTNAME}${url}`
      })
    ])
      .process(cssIn)
      .then(({ css }) => css);

  const checkResponse = response => {
    const isOK =
      !Object.keys(response.headers).includes('x-status-code') ||
      parseInt(response.headers['x-status-code'], 10) < 300;

    if (!isOK) {
      throw new Error(response.body);
    }
  };

  const getInstitutions = async () => {
    const response = await request({
      ...requestConfig,
      uri: `${baseURI}_GetVars`,
      json: true
    }).auth(HTTP_USERNAME, HTTP_PASSWORD, false);

    checkResponse(response);

    return Object.keys(response.body);
  };

  const compileInstitutionStylesheet = async institution => {
    const queryString = `postDataBin=y&institution=${institution}`;

    const response = await request({
      ...requestConfig,
      uri: `${baseURI}_CompileTemplate?${queryString}`,
      method: 'POST',
      body: template
    }).auth(HTTP_USERNAME, HTTP_PASSWORD, false);

    checkResponse(response);

    const cssFilename = `${outDir}/h_${app}_${institution.toLowerCase()}_css.css`;
    const css = await prependUrls(response.body);

    writeFileSync(cssFilename, css);
  };

  const institutions = await getInstitutions();

  institutions.forEach(compileInstitutionStylesheet);
};

module.exports = compileBranding;
