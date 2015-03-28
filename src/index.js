'use strict';

const Path = require('path');


/**
 * This can be used as a standalone function or as an extension for String.prototype.
 *
 * Examples:
 *
 * String.prototype.subpath = require('./lib/subpath');
 * let root = 'path/to/root'.subpath('build','source');
 *
 * const SubPath = require('./lib/subpath');
 * let root = SubPath.bind('path/to/root')('build','source');
 *
 * These two examples would yield:
 * {
 *
 * }
 */

let toInstance = function(el){
	if (Array.isArray(el)) el = Array.prototype.join.call(el, Path.sep);
	return new String(Path.resolve(String(el)));
};

let addProperty = (el, key, val) => Object.defineProperty(el, key, {
	configurable : false,
	enumerable   : true,
	writable     : true,
	value        : val
});

let convert = function(el){
	if (el.constructor === String) el = [el];
	if (el.constructor === Array) return el.map( v => {

	});
};

module.exports = function SubPath(paths){

	if (paths.constructor !== Object) throw new TypeError('Expecting a path object');
	if (!Object.keys(paths).length) throw new Error('Unexpected empty path object');

	let root = toInstance(this);

	for (let name in paths){
		let path = paths[name];

		if (path.constructor === String) path = [path];
		if (path.constructor === Array) {
			let tmp = {};
			// path.forEach( (v,i) => {
			// 	if (path[i].constructor  === String) tmp[v] = v;
			// 	else {
			// 		let t = Path.join(String(name),String(v));
			// 		tmp[name] = v;
			// 	}
			// });
			path = tmp;
		}

		console.info(path);

	}


	// console.info('»', self);

	// for (let key in tree){
	// 	let target = tree[key];





	// 	// if (dir.constructor === Object){
	// 	// 	dir = SubPath.bind(key)(dir);
	// 	// 	console.info(dir);
	// 	// 	continue;
	// 	// }

	// 	if (branch.constructor !== Array) throw new TypeError('Unexpected directory type');

	// 	for(let subkey in brancg){
	// 		let subdir = dir[subkey];
	// 		console.info('»»»»»»»»', subkey,subdir,self);
	// 		self = addProperty(self, subkey, subdir);
	// 	}
	//}



	// let string = String(self);

	// for (let i in arguments){
	// 	let argument = String(arguments[i]);
	// 	Object.defineProperty(self, argument, {
	// 		__proto__: null,
	// 		value    : Path.resolve(Path.join(string, argument))
	// 	});
	// }

	// return self;
};