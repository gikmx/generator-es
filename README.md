# generator-es
A yeoman-generator for ECMA Script apps using Babel ( ES6 / ES2015 )

## What's included?

* Build to ES5 (including babel-runtime)
* ESLint
* Unit testing using Mocha & Chai (w/Babel)
* Code coverage with Istanbul, Coveralls & Travis
* NPM ignores source & tests
* GIT ignores build
* Automatically build on changes (watch)

## Installation

Install globally yeoman and this package

```bash
    npm install -g yo generator-es
```

Create your project's directory and CD into it.

```bash
    mkdir project && cd $_
    yo es
```

## Run Tests

Just write ES6 files (JS inside the `test` folder and then run:

```bash
npm test
```

if you want to generate code coverage reports, only enable the production environment var:

```bash
NODE_ENV=production npm test
```

## Building

Just write ES6 files (JS) inside the `src` folder and then run:

```bash
npm run build
```

## Watching

It automatically builds when you make changes inside the `src` and `test` folders.

```bash
npm run watch
```
