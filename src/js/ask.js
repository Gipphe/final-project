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

	var say = function(name, fn) {
		cache[name] = fn;
	};

	window.ask = ask;
	window.say = say;
}());
