'use strict';

var FS   = require('fs');
var Path = require('path');

var Yeoman = require('yeoman-generator');
var Yeosay = require('yosay');
var Chalk  = require('chalk');

module.exports = Yeoman.generators.Base.extend({

	constructor: function(){
		Yeoman.Base.apply(this, arguments);
		this.argument('AppName', {type:'string', required:false});
	},

	initializing: function(){
		this.log(Yeosay('Build your awesome application, using ' + Chalk.yellow('ES6') + '!'));
		this.pkg = require('../package.json');
	},

	prompting: function(){
		var self    = this;
		var done    = this.async();
		var prompts = [];

		if (!this.AppName){
			prompts.push({
				type    : 'input',
				name    : 'AppName',
				message : 'What\'s your app name?',
				default : this._.slugify(this.appname)
			});
		}

		prompts.push({
			type    : 'input',
			name    : 'AppDesc',
			message : 'What will your app do?'
		});

		prompts.push({
			type    : 'input',
			name    : 'AuthorName',
			message : 'What\'s your name?',
			default : 'Someone'
		});

		prompts.push({
			type    : 'input',
			name    : 'AuthorEmail',
			message : 'What\'s your email address?',
			default : 'someone@somewhere.com'

		});

		prompts.push({
			type    : 'input',
			name    : 'AuthorWebsite',
			message : 'What\'s your website address?',
			default : 'http://somewhere.com'
		});

		this.prompt(prompts, function(answers){
			var key, val, vals = {};
			for(key in answers){
				val = answers[key];
				if (key === 'AppName') val = self._.slugify(val);
				vals[key] = val;
			}
			self.VARS = vals;
			done();
		});
	},

	writing: function(){
		var self = this;
		var root = this.sourceRoot();
		var i, j, dir, dirs = ['.conf', 'src', 'test','.'], files, file, stat, dest, tmp;

		for (i in dirs){
			dir   = Path.join(root, dirs[i]);
			files = FS.readdirSync(dir);
			for (j in files){
				file = files[j];
				stat = FS.statSync(Path.join(dir, files[j]));
				if (stat.isDirectory()) continue;
				tmp  = dir.replace(root,'').replace('/','');
				dest = Path.join(tmp, file.indexOf('_') === 0? file.slice(1) : file);
				file = self.templatePath(Path.join(tmp, file));
				dest = self.destinationPath(dest);
				self.fs.copyTpl(file, dest, self.VARS);
			}
		}
	},

	install: function(){
		this.installDependencies();
	}

});
