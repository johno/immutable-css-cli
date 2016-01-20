<h1 align="center">
  <img width="360" src="https://rawgit.com/johnotander/immutable-css/master/media/logo.png" alt="immutable-css">
</h1>

[![Build Status](https://secure.travis-ci.org/johnotander/immutable-css-cli.png?branch=master)](https://travis-ci.org/johnotander/immutable-css-cli) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

CLI app for [immutable-css](https://github.com/johnotander/immutable-css.git).

## Installation

```bash
npm i -g immutable-css-cli
```

## Usage

```sh
immutable-css -h
  CSS linter for immutable selectors.

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
```

```sh
immutable-css test/fixtures/app.css test/fixtures/vendor.css

.awesome was mutated 2 times
[line 5, col 1]: /Users/johnotander/code/lab/immutable-css-cli/test/fixtures/app.css
[line 5, col 1]: /Users/johnotander/code/lab/immutable-css-cli/test/fixtures/vendor.css

.foo was mutated 2 times
[line 17, col 1]: /Users/johnotander/code/lab/immutable-css-cli/test/fixtures/app.css
[line 1, col 1]: /Users/johnotander/code/lab/immutable-css-cli/test/fixtures/vendor.css
```

When mutations are present, `immutable-css` exits with an error code of `1`.

```sh
npm t && immutable-css dist/vendor.css dist/app.css && npm run deploy
```

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by John Otander ([@4lpine](https://twitter.com/4lpine)).

***

> This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).
