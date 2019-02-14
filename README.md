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

### Function variables

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

The PeopleSoft web library that will be called. It needs to have two functions:

1. IScript_GetVars
2. IScript_CompileTemplate

Example: `WEBLIB_H_BRNDNG`
