# Yeoman Generator for ES6 apps.

## What's included?

* Build to ES5 (including babel-runtime)
* ESLint
* Unit testing using Mocha & Chai (w/Babel)
* Code coverage with Istanbul
* Coveralls & Travis
* NPM ignores source & tests
* GIT ignores build
* Basic watching (alpha)

## Installation

    npm install -g yo
    npm install -g generator-es
    mkdir project && cd $_
    yo es

## Run Tests

Just write ES6 files (JS inside the `test` folder and then run:

	npm test

## Building

Just write ES6 files (JS) inside the `src` folder and then run:

    npm run build
