'use strict';

///////////////////////////////////////////////////////////////////////////// NODE MODULES

const Path  = require('path');


////////////////////////////////////////////////////////////////////////////// NPM MODULES

const Gulp   = require('gulp');
const Lint   = require('gulp-eslint');
const Source = require('gulp-sourcemaps');
const Babel  = require('gulp-babel');
const Mocha  = require('gulp-spawn-mocha');
const Extend = require('extend');
const Del    = require('del');
const Pipes  = require('lazypipe');


////////////////////////////////////////////////////////////////////////////////// ROUTING

const Dir = new String(Path.resolve(Path.join(__dirname, '..')));

for (let dir of ['src', 'test', 'build', '.conf']){
	let prop = { value:Path.join(String(Dir), dir) };
	Object.defineProperty(Dir, dir, Extend(prop, {
		configurable : false,
		enumerable   : true,
		writable     : false
	}));
}

const Route = {
	src  : [Path.join(Dir.src, '/**/*.js')],
	test : [Path.join(Dir.test, '/**/*.js')]
};


//////////////////////////////////////////////////////////////////////////// CONFIGURATION

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
	reporter  : 'mocha-unfunk-reporter',
	require   : Path.join(Dir['.conf'], 'chai'),
	compilers : 'js:babel/register',
	istanbul  : { dir: Path.join(Dir.build, 'coverage') }
};


/////////////////////////////////////////////////////////////////////////// ERROR HANDLING

const onError = function(){ process.exit(1); };


//////////////////////////////////////////////////////////////////////////////////// TASKS

Gulp.task('build', ['clean', 'lint', 'test'], function(){
	return Gulp.src(Route.src)
		.pipe(Source.init().on('error', onError))
		.pipe(Babel(Config.babel))
		.pipe(Source.write()) // inline sourcemaps
		.pipe(Gulp.dest(Dir.build));
});

Gulp.task('test', ['lint-self', 'lint-test'], function(){
	return Gulp.src(Route.test)
		.pipe(Mocha(Config.mocha).on('error', onError));
});

Gulp.task('clean', function(callback){
	Del([Dir.build], callback);
});

const PipeLint = Pipes()
	.pipe(Lint.format)
	.pipe(Lint.failOnError);

Gulp.task('lint-self', ()=>
	Gulp.src(__filename)
		.pipe(Lint(Config.lint.src).on('error', onError))
		.pipe(PipeLint())
);

Gulp.task('lint-test', ()=>
	Gulp.src(Route.test)
		.pipe(Lint(Config.lint.test).on('error', onError))
		.pipe(PipeLint())
);

Gulp.task('lint', ['lint-self', 'lint-test'], ()=>
	Gulp.src(Route.src)
		.pipe(Lint(Config.lint.src).on('error', onError))
		.pipe(PipeLint())
);
