answer('utils', function() {
	var self = {};
	self.compose = function() {
		var fns = Array.prototype.slice.call(arguments);
		return function(arg) {
			var coll = arg;
			for (var i = 0, len = fns.length; i < len; i += 1) {
				coll = fns[i](coll);
			}
			return coll;
		};
	};

	return self;
});
