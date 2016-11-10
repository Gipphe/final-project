(function() {
	// Simple call-based "state machine", if you can call it that
	window.State = (function() {
		var getIds = function(elementList) {
			var els = Array.prototype.map.call(elementList, function(el) {
				return { id: el.getAttribute('id') };
			});
			return els;
		};
		var getIndexByProperty = function(arr, prop, val) {
			for (var i = 0, len = arr.length; i < len; i += 1) {
				if (arr[i][prop] === val) {
					return i;
				}
			}
		};
		var prot = {};
		prot.states = [];
		Object.defineProperty(prot, 'state', {
			enumerable: true,
			configurable: false,
			get: function() {
				return this._state;
			},
			set: function(newState) {
				var oldState = this._state;
				this._state = newState;
				this.whenNewState(newState, oldState);
			}
		});
		prot.whenNewState = function(newState) {
			document.getElementById(newState.id).scrollIntoView(true);
		};
		prot.next = function() {
			var states = this.states;
			var currState = this.state;
			var nextStateIndex = getIndexByProperty(states, 'id', currState.id) + 1;
			if (nextStateIndex >= states.length) {
				this.state = currState;
				return;
			}
			var nextState = states[nextStateIndex];
			this.state = nextState;
			return this.state;
		};
		prot.back = function() {
			var states = this.states;
			var currState = this.state;
			var prevStateIndex = getIndexByProperty(states, 'id', currState.id) - 1;
			if (prevStateIndex < 0) {
				this.state = currState;
				return;
			}
			var prevState = states[prevStateIndex];
			this.state = prevState;
			return this.state;
		};
		var State = function(el, slides) {
			var state = Object.create(prot);
			state.el = el;
			state.states = getIds(slides);
			state._state = state.states[0];
			return state;
		};
		return State;
	}());
}());
