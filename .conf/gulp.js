'use strict';

//--------------------------------------------------------------------------- NODE MODULES

const Path  = require('path');


//---------------------------------------------------------------------------- NPM MODULES

const Gulp   = require('gulp');
const Lint   = require('gulp-eslint');
const Source = require('gulp-sourcemaps');
const Babel  = require('gulp-babel');
const Mocha  = require('gulp-spawn-mocha');
const Del    = require('del');


//------------------------------------------------------------------------- PATHS & ROUTES

const Dir = new String(Path.resolve(Path.join(__dirname, '..')));

for (let dir of ['src', 'test', 'build', '.conf', 'coverage'])
	Object.defineProperty(Dir, dir, {
		value        : Path.join(String(Dir), dir),
		writable     : false,
		enumerable   : true,
		configurable : false
	});

const Route = {
	src  : [Path.join(Dir.src, '/**/*.js')],
	test : [Path.join(Dir.test, '/**/*.js')]
};


//-------------------------------------------------------------------------- CONFIGURATION

const Config = {};

Config.lint = {

	src: {
		useEslintrc : true
	},

	test: {
		rulesPath   : [Dir.test],
		useEslintrc : true
	}
};

Config.babel = {
	optional      : ['runtime'],
	sourceMap     : 'both',
	sourceMapName : '.map',
	comments      : false
};

Config.mocha = {
	ui        : 'bdd',
	bail      : true,
	require   : Path.join(Dir['.conf'], 'chai'),
	reporter  : 'mocha-unfunk-reporter',
	compilers : 'js:babel/register',
	istanbul  : {
		dir: Path.join(Dir.toString(), 'coverage')
	}
};


//---------------------------------------------------------------------------------- TASKS

Gulp.task('clean', function(callback){
	Del([Dir.build, Dir.coverage], callback);
});

Gulp.task('lint-self', ()=>
	Gulp.src(__filename)
		.pipe(Lint(Config.lint.src))
		.pipe(Lint.format())
		.pipe(Lint.failOnError())
);

Gulp.task('lint-test', ['lint-self'], ()=>
	Gulp.src(Route.test)
		.pipe(Lint(Config.lint.test))
		.pipe(Lint.format())
		.pipe(Lint.failOnError())
);

Gulp.task('lint', ['lint-self'], ()=>
	Gulp.src(Route.src)
		.pipe(Lint(Config.lint.src))
		.pipe(Lint.format())
		.pipe(Lint.failOnError())
);

Gulp.task('test', ['lint-test'], ()=>
	Gulp.src(Route.test)
		.pipe(Mocha(Config.mocha))
);

Gulp.task('build', ['clean', 'lint', 'test'], function(){
	return Gulp.src(Route.src)
		.pipe(Source.init())
		.pipe(Babel(Config.babel))
		.pipe(Source.write()) // inline sourcemaps
		.pipe(Gulp.dest(Dir.build));
});
