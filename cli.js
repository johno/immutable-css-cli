#!/usr/bin/env node
'use strict'

const fs = require('fs')
const meow = require('meow')
const chalk = require('chalk')
const isCss = require('is-css')
const postcss = require('postcss')
const isBlank = require('is-blank')
const fileExists = require('file-exists')
const atImport = require('postcss-import')
const immutableCss = require('immutable-css')

const cli = meow(`
  Usage
    $ immutable-css [<path/to/css/file.css> ...]

  Options
    -j, --json Return json to std out
    -s, --strict Lint mutations in the same file

  Example
    $ immutable-css vendor.css app.css
    $ immutable-css src/css/**/*.css
    $ immutable-css app.css --strict
    $ immutable-css src/css/**/*.css --json > mutations.json
`, {
  alias: {
    h: 'help',
    j: 'json',
    s: 'strict'
  }
})

if (cli.flags.help) {
  console.log(cli.help)
  process.exit(0)
}

if (isBlank(cli.input)) {
  console.error(chalk.red('Please provide CSS files or a glob\n') + cli.help)
  process.exit(1)
}

var opts = {}
if (cli.flags.strict) {
  opts.strict = true
}

var root = null
cli.input.forEach(file => {
  if (isValidFile(file)) {
    var css = fs.readFileSync(file, 'utf8')
    var newRoot = postcss.parse(css, { from: file })

    if (root) {
      root.append(newRoot)
    } else {
      root = newRoot
    }
  } else {
    console.error('Ignoring ' + file)
  }
})

root = atImport.process(root)
root = immutableCss.process(root, opts)

if (cli.flags.json) {
  console.log(JSON.stringify(root.messages))
} else {
  root.messages.forEach(message => {
    console.log(chalk.white(message.text))
  })

  process.exit(isBlank(root.messages) ? 0 : 1)
}

function isValidFile (file) {
  return isCss(file) && fileExists(file)
}
