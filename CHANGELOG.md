# Changelog

### v0.0.6

- Removed console.infos left in the installation process.
- Added gulp-sourcemaps-support to actually add support for sourcemaps on built files.
- Updated Watch task, it no longer tries to run a script after detecting changes, it only builds now.
- Updated Babel configuration, added sourceRoot and remove auto generation of 'use strict'.
- Updated test task, istanbul is only run when NODE_ENV is set to production.
- Removed camelcase checking.
- Updated ignored files to improve publishing.

### v0.0.2

- Implemented alpha version of gulp-watch. lots of tests needed.
- Converted to yeoman-generator
- Removed lazypipe,  ignoring source files, added travis, added coveralls.
- Removed extend, renamed sublime-project.
- Enabled mocha and chai support vía spawn, istannbul enabled.

### v0.0.1

- test environment setup
