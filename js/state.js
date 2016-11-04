(function() {
	// Simple call-based state machine
	var getIds = function(elementList) {
		var els = Array.prototype.map.call(elementList, function(el) {
			return {id: el.getAttribute('id')};
		});
		return els;
	};
	window.State = (function() {
		var slideList = document.getElementsByClassName('slide');
		var getIndexByProperty = function(arr, prop, val) {
			var index;
			for (var i = 0, len = arr.length; i < len; i += 1) {
				if (arr[i][prop] === val) {
					index = i;
					break;
				}
			}
			return index;
		};
		var State = function(backEl, nextEl) {
			this.backEl = backEl;
			this.nextEl = nextEl;
		};
		State.prototype.defaultNext = 'Next';
		State.prototype.defaultBack = 'Back';
		State.prototype.setNextText = function(text) {
			this.nextEl.innerHTML = text;
		};
		State.prototype.setBackText = function(text) {
			this.backEl.innerHTML = text;
		};
		State.prototype.states = getIds(slideList);
		State.prototype._state = State.prototype.states[0];
		Object.defineProperty(State.prototype, 'state', {
			enumerable: true,
			configurable: false,
			get: function() {
				return this._state;
			},
			set: function(newState) {
				this._state = newState;
				this.whenNewState(newState);
			}
		});
		State.prototype.whenNewState = function(newState) {
			document.getElementById(newState.id).scrollIntoView(true);
			if (newState.id === 'sign-up') {
				this.setNextText('Sign up');
			} else {
				this.setBackText(this.defaultBack);
				this.setNextText(this.defaultNext);
			}
		};
		State.prototype.next = function() {
			var states = this.states;
			var currState = this.state;
			var nextStateIndex = getIndexByProperty(states, 'id', currState.id) + 1;
			if (nextStateIndex >= states.length) {
				// nextStateIndex = 0;
				this.state = currState;
				return;
			}
			var nextState = states[nextStateIndex];
			this.state = nextState;
		};
		State.prototype.back = function() {
			var states = this.states;
			var currState = this.state;
			var prevStateIndex = getIndexByProperty(states, 'id', currState.id) - 1;
			if (prevStateIndex < 0) {
				// prevStateIndex = states.length - 1;
				this.state = currState;
				return;
			}
			var prevState = states[prevStateIndex];
			this.state = prevState;
		};
		return State;
	}());
}());
