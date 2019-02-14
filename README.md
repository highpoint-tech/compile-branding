# Compile Branding

Utility to compile HighPoint application branding.

## Installation

`yarn add -D @highpoint/compile-branding`

## Usage

Copy `.env-sample` to your application's root directory and name it `.env`.
Populate the values. You can reference the table below for examples of what
values should be used. This file should _not_ be included in your source
control, so add it to your `.gitignore` (or similar) file.

### Environment Variables

| Variable       | Example                  |
| -------------- | ------------------------ |
| PS_HOSTNAME    | cs92-devo.mhighpoint.com |
| PS_ENVIRONMENT | csdev92                  |
| PS_NODE        | SA                       |
| PS_USERNAME    | PS                       |
| PS_PASSWORD    | mysupersecretpassword    |
| HTTP_USERNAME  | PS                       |
| HTTP_PASSWORD  | mysupersecretpassword    |

# API

## `compileBranding`

Produces a compiled version of the branding in a local directory.

### Example

```javascript
const { compileBranding } = require('@highpoint/compile-branding');
const { resolve } = require('path');

compileBranding({
  app: 'app',
  inFile: resolve(`./src/main.scss`),
  outDir: resolve('./dist'),
  weblib: 'WEBLIB_H_BRNDNG'
}).catch(({ message }) => console.error(message));
```

### Variables

#### `app`

The abbreviation of the application whose branding is being compiled.

Examples: `app`, `dp`, `mc`, `sb`

#### `inFile`

The absolute path to the SCSS file that acts as the template for compiling
branding.

Example: `path.resolve('./scss/main.scss')`

#### `outDir`

The absolute path to the directory that the compiled CSS files should be
outputted to.

Example: `path.resolve('./dist')`

#### `weblib`

The PeopleSoft web library that will be called. It needs to have the following
functions:

- IScript_GetVars
- IScript_CompileTemplate

Example: `WEBLIB_H_BRNDNG`

## `triggerCompile`

Triggers branding compilation remotely. This is primarily used by continuous
integration services (e.g. Jenkins) to tell PeopleSoft that it should compile
the branding.

### Example

```javascript
const { triggerCompile } = require('@highpoint/compile-branding');

triggerCompile({ weblib: 'WEBLIB_H_BRNDNG' }).catch(({ message }) => {
  console.error(message);
  process.exit(1);
});
```

### Variables

#### `weblib`

The PeopleSoft web library that will be called. It needs to have the following
function:

- IScript_Compile
