(function() {
	var cache = {};

	var checkTypes = function(arr) {
		if (typeof arr !== 'object' || !(arr instanceof Array)) {
			throw new TypeError('invalid type');
		}
		for (var i = 0, len = arr.length; i < len; i += 1) {
			var el = arr[i];
			if (typeof el !== 'string') {
				throw new TypeError('invalid type');
			}
		}
	};
	var createNode = function() {
		var node = document.createElement('script');
		node.type = 'text/javascript';
		node.charset = 'utf-8';
		node.async = true;
		return node;
	};
	var head = document.getElementsByTagName('HEAD')[0];

	var ask = function(moduleNames, cb) {

		// Check for non-strings
		checkTypes(moduleNames);

		var max = moduleNames.length;
		var coll = {};

		// Get modules and populate coll
		moduleNames.forEach(function(moduleName, index) {
			askForModule(moduleName, index);
		});
		function addToColl(fn, index) {
			coll[index](fn);
			console.log(fn, index, max);
			if (coll.length === max) {
				cb.apply(null, coll.map(function(name) {
					return cache[name];
				}));
			}
		}
		function askForModule(moduleName, index) {
			var node = createNode();
			var moduleLoadHandle = function(e) {
				var el = e.path[0];
				console.log(e.readyState, e.type);
				console.log({foo: e.target.readyState});
				console.log(e);
				if (e.readyState === 'complete') {
					node.removeEventListener('load', moduleLoadHandle);
					addToColl(moduleName, index);
				}
			};
			node.addEventListener('load', moduleLoadHandle);
			node.src = 'js/' + (moduleName.slice(-3) === '.js' ? moduleName : moduleName + '.js');
			head.appendChild(node);
		}
	};
	var question = {};
	question.for = function(deps) {
		this.depLength = deps.length;
		var res = [];
		for (var i = 0, leni = deps.length; i < leni; i += 1) {
			var depName = deps[i];
			res.push(cache[depName]);
		}
		this.deps = res;

		return this;
	};
	question.in = function(fn) {
		this.callback = fn;

		return this;
	};
	question.when = {};
	question.when.ready = function() {
		window.addEventListener('DOMContentLoaded', function() {
			this.loadedCallback();
		});
		return this;
	}.bind(question);
	question.when.now = function() {
		this.callback.apply(null, this.deps);
	}.bind(question);

	var ask = function(deps, cb) {
		this.for(deps);
		this.in(cb);
		this.when.now();
	};
	ask.prototype = Object.create(question);

	var answer = function(name, fn) {
		cache[name] = fn;
	};

	window.ask = ask;
	window.answer = answer;
}());
