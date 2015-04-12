# Changelog
### v0.0.10

- Generated gulpfile no longer tries to build when watching, it now tests.
- Allowed the use of `xit` without declaration on testing.
- Corrected a typo on the YAML file.
- Added gulp, and prepublish scripts on `package.json`
- Ignored coverage folder from npm and git.

### v0.0.9

- Added 'asyncToGenerator' transformer to Babel configurations.
- Updated babel-related modules to fix some known errors with the runtime.

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
