#!/usr/bin/env node
'use strict'

const fs = require('fs')
const meow = require('meow')
const chalk = require('chalk')
const isCss = require('is-css')
const isGlob = require('is-glob')
const postcss = require('postcss')
const isBlank = require('is-blank')
const fileExists = require('file-exists')
const atImport = require('postcss-import')
const reporter = require('postcss-reporter')
const immutableCss = require('immutable-css')

const cli = meow(`
  Usage
    $ immutable-css <vendor-css-file> <app-css-file>
    $ immutable-css <glob>

  Options
    -j, --json Return json to std out

  Example
    $ immutable-css vendor.css app.css
    $ immutable-css src/css/**/*.css
    $ immutable-css src/css/**/*.css --json > mutations.json
`, {
  alias: {
    j: 'json'
  }
})

const vendorFileOrGlob = cli.input[0]
const appFile = cli.input[1]

if (isBlank(vendorFileOrGlob)) {
  console.error(chalk.red('Please provide CSS files or a glob\n') + cli.help)
  process.exit(1)
}
