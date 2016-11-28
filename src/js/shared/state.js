(function() {
	// Simple call-based "state machine", if you can call it that
	window.State = (function() {
		var getIds = function(elementList) {
			var els = Array.prototype.map.call(elementList, function(el) {
				return { id: el.getAttribute('id') };
			});
			return els;
		};
		var indexOfWith = function(arr, prop, val) {
			for (var i = 0, len = arr.length; i < len; i += 1) {
				if (arr[i][prop] === val) {
					return i;
				}
			}
		};
		var prot = {};
		prot.getNextState = function() {
			var states = this.states;
			var currState = this.state;
			var nextStateIndex = indexOfWith(states, 'id', currState.id) + 1;
			if (nextStateIndex >= states.length) {
				return null;
			}
			var nextState = states[nextStateIndex];
			return nextState;
		};
		prot.getPrevState = function() {
			var states = this.states;
			var currState = this.state;
			var prevStateIndex = indexOfWith(states, 'id', currState.id) - 1;
			if (prevStateIndex < 0) {
				return null;
			}
			var prevState = states[prevStateIndex];
			return prevState;
		};
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
		Object.defineProperty(prot, 'nextState', {
			enumerable: true,
			configurable: false,
			get: function() {
				return this.getNextState();
			}
		});
		prot.whenNewState = function(newState) {
			document.getElementById(newState.id).scrollIntoView(true);
		};
		prot.next = function() {
			var currState = this.state;
			var nextState = this.getNextState();
			if (!nextState) {
				this.state = currState;
				return;
			}
			this.state = nextState;
			return this.state;
		};
		prot.back = function() {
			var currState = this.state;
			var prevState = this.getPrevState();
			if (!prevState) {
				this.state = currState;
				return;
			}
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
