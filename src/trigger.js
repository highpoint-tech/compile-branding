const getToken = require('@highpoint/get-ps-token');
const request = require('request-promise');

require('dotenv').config({ silent: true });

const {
  PS_HOSTNAME,
  PS_ENVIRONMENT,
  PS_NODE,
  HTTP_USERNAME,
  HTTP_PASSWORD
} = process.env;

const triggerCompile = async ({ weblib }) => {
  const uri =
    `https://${PS_HOSTNAME}/psc/${PS_ENVIRONMENT}/EMPLOYEE/${PS_NODE}/s/` +
    `${weblib}.ISCRIPT1.FieldFormula.IScript_Compile`;

  const response = await request({
    method: 'POST',
    uri,
    headers: { 'User-Agent': 'request' },
    jar: await getToken(process.env),
    json: true,
    resolveWithFullResponse: true
  }).auth(HTTP_USERNAME, HTTP_PASSWORD, false);

  if (parseInt(response.headers['x-status-code'], 10) !== 201) {
    throw new Error(response.body.exception);
  }
};

module.exports = triggerCompile;
