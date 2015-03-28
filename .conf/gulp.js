'use strict';

////////////////////////////// NODE MODULES

const Path  = require('path');


////////////////////////////// NPM MODULES

const Gulp   = require('gulp');
const Util   = require('gulp-util');
const Lint   = require('gulp-eslint');
const Source = require('gulp-sourcemaps');
const Babel  = require('gulp-babel');
const Mocha  = require('gulp-mocha');
const Extend = require('extend');
const Del    = require('del');
const Pipes  = require('lazypipe');

const Config = {};

Config.dir = {
	configurable : false,
	enumerable   : true,
	writable     : true
};

////////////////////////////// PATH SETUP

const Dir = new String(Path.resolve(Path.join(__dirname, '..')));

for (let dir of ['src', 'test', 'build']){
	let prop = { value:Path.join(String(Dir), dir) };
	Object.defineProperty(Dir, dir, Extend(prop, Config.dir));
}

const Route = {
	src  : [Path.join(Dir.src, '/**/*.js')],
	test : [Path.join(Dir.test, '/**/*.js')]
};

////////////////////////////// CONFIGURATION

Config.lint = {

	src:{
		useEslintrc : true
	},

	test:{
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
	ui       : 'bdd',
	reporter : 'mocha-unfunk-reporter',
	require  : './chai'
};


////////////////////////////// TASKS

Gulp.task('test', ['lint-self', 'lint-test'], function(){
	return Gulp.src(Route.test)
		.pipe(Mocha(Config.mocha));
});

Gulp.task('build', ['lint', 'clean'], function(){
	return Gulp.src(Route.src)
		.pipe(Source.init().on('error', Util.log))
		.pipe(Babel(Config.babel))
		.pipe(Source.write()) // inline sourcemaps
		.pipe(Gulp.dest(Dir.build));
});


Gulp.task('clean', function(callback){
	Del([Dir.build], callback);
});

const PipeLint = Pipes()
	.pipe(Lint.format)
	.pipe(Lint.failOnError);

Gulp.task('lint-self', ()=>
	Gulp.src(__filename).pipe(Lint(Config.lint.src)).pipe(PipeLint())
);

Gulp.task('lint-test', ()=>
	Gulp.src(Route.test).pipe(Lint(Config.lint.test)).pipe(PipeLint())
);

Gulp.task('lint', ['lint-self', 'lint-test'], ()=>
	Gulp.src(Route.src).pipe(Lint(Config.lint.src)).pipe(PipeLint())
);
