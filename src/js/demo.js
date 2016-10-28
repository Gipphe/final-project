(function() {
	var en = document.getElementById('en');
	var no = document.getElementById('no');
	no.addEventListener('click', function(){
		this.classList.add('selected');	
		en.classList.remove('selected');
	});

	en.addEventListener('click', function() {
		this.classList.add('selected');
		no.classList.remove('selected');
	});
	window.changeLang = function(lang) {
		if (typeof lang !== 'string' || lang.length !== 2) return;
		document.documentElement.setAttribute('lang', lang);
	};

	// Gender input control
	var genderInput = document.getElementById('gender-input');
	var genderList = document.getElementById('gender-list');
	var filter = function(list, ex, predicate) {
		if (typeof ex === 'function') {
			predicate = ex;
			ex = null;
		}
		var res = [];
		for (var i = 0, len = list.length; i < len; i += 1) {
			var item = list[i];
			if (ex && ex.includes(item.innerHTML)) {
				res.push(item);
			} else if (predicate(item)) {
				res.push(item);
			}
		}
		return res;
	};
	var setListDisplay = function(val, e) {
		if (e) e.stopPropagation();
		genderList.style.display = val;
	};
	var setDisplay = function(el, val) {
		el.style.display = val;
	};
	var hideList = setListDisplay.bind(null, 'none');
	var showList = setListDisplay.bind(null, 'inline-block');
	genderList.addEventListener('click', function(e) {
		e.stopPropagation();
		genderInput.value = e.target.innerHTML;
		hideList();
	});
	genderInput.addEventListener('click', showList, true);
	genderInput.addEventListener('focusin', showList);
	genderInput.addEventListener('input', function(e) {
		e.stopPropagation();
		if (!genderInput.value) {
			hideList();
		} else {
			showList();
		}
		// Array of genders to exclude from filtering
		var exclusions = ['Custom...'];
		// List of gender LI HTMLElements
		var list = genderList.children;
		// bind filter with repeated variables
		var filterList = filter.bind(null, list, exclusions);
		// Filter out elements to display
		var showThese = filterList(function(val) {
			var html = val.innerHTML.toLowerCase();
			var inputValue = genderInput.value.toLowerCase();
			return html.includes(inputValue);
		});
		// Filter out elements to hide
		var hideThese = filterList(function(val) {
			var html = val.innerHTML.toLowerCase();
			var inputValue = genderInput.value.toLowerCase();
			return !html.includes(inputValue);
		});
		// Set display of hidden elements to 'none'
		hideThese.forEach(function(el) {
			setDisplay(el, 'none');
		});
		// Set display of shown elements to 'list-item'
		showThese.forEach(function(el) {
			setDisplay(el, 'list-item');
		});
	});
	genderInput.addEventListener('keydown', function(e) {
		console.log(e);
	});
	// Prevent the click event from bubbling up to #main, hiding the gender list
	genderInput.addEventListener('click', function(e) { e.stopPropagation(); });
	// Hide the gender list if a click event bubbles up to #main
	document.getElementById('main').addEventListener('click', hideList);


	// Page controls
	var getIds = function(elementList) {
		var els = Array.prototype.map.call(elementList, function(el) {
			return {id: el.getAttribute('id')};
		});
		return els;
	};

	var State = (function() {
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
		var State = function() {};
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
		};
		State.prototype.next = function() {
			var states = this.states;
			var currState = this.state;
			var nextStateIndex = getIndexByProperty(states, 'id', currState.id) + 1;
			if (nextStateIndex >= states.length) {
				nextStateIndex = 0;
			}
			var nextState = states[nextStateIndex];
			this.state = nextState;
		};
		State.prototype.back = function() {
			var states = this.states;
			var currState = this.state;
			var prevStateIndex = getIndexByProperty(states, 'id', currState.id) - 1;
			if (prevStateIndex < 0) {
				prevStateIndex = states.length - 1;
			}
			var prevState = states[prevStateIndex];
			this.state = prevState;
		};
		return State;
	}());

	(function() {
		var back = document.getElementById('back');
		var next = document.getElementById('next');
		var state = new State();
		back.addEventListener('click', function() {
			state.back();
		});
		next.addEventListener('click', function() {
			state.next();
		});
	}());

	// Gender graph
	var graph = document.getElementById('gender-graph');
	var cursor = document.getElementById('cursor');
	var cursorStyle = window.getComputedStyle(cursor);
	var cursorXOffset = cursorStyle.getPropertyValue('width');
	var cursorYOffset = cursorStyle.getPropertyValue('height');
	var staticFix = 7;
	cursorXOffset = Number(cursorXOffset.replace('px', ''));
	cursorXOffset = Math.round(cursorXOffset / 2) - staticFix;
	cursorYOffset = Number(cursorYOffset.replace('px', ''));
	cursorYOffset = Math.round(cursorYOffset / 2) - staticFix;
	console.log(cursorXOffset);
	console.log(cursorYOffset);

	var handleUp = function() {
		graph.removeEventListener('mousemove', handleClick);
		graph.removeEventListener('mouseup', handleUp);
	};
	var handleClick = function(e) {
		var minMax = function(min, max, val) {
			return Math.max(Math.min(val, max), min);
		};
		var round5 = function(x) {
			return Math.round(x/5)*5;
		};
		var x = e.offsetX;
		var y = e.offsetY;
		// console.log('pure x', x);
		// console.log('pure y', y);
		var horLine = document.getElementById('x-line');
		var verLine = document.getElementById('y-line');
		var xMin = verLine.getAttribute('x1');
		var xMax = verLine.getAttribute('x2');
		var yMin = horLine.getAttribute('y1');
		var yMax = horLine.getAttribute('y2');
		var width = xMax - xMin;
		var height = yMax - yMin;
		var xOffset = -50;
		var yOffset = 100;
		x -= xMin;
		y -= yMin;
		x = minMax(x, xMax, xMin);
		y = minMax(y, yMax, yMin);
		var realX = xOffset + Math.round(x / width * 100);
		var realY = yOffset - Math.round(y / height * 100);
		// console.log('x', realX);
		// console.log('y', realY);

		var near5X = round5(realX);
		var near5Y = round5(realY);
		near5X = minMax(near5X, 50, -50);
		near5Y = minMax(near5Y, 100, 0);
		var verRange = document.getElementById('gender-range-vertical');
		var horRange = document.getElementById('gender-range-horizontal');
		verRange.value = near5Y;
		horRange.value = near5X;

		cursor.style.display = 'block';
		cursor.style.left = String(x - cursorXOffset) + 'px';
		cursor.style.top = String(y - cursorYOffset) + 'px';
	};
	graph.addEventListener('mousedown', function(e) {
		graph.addEventListener('mousemove', handleClick);
		graph.addEventListener('mouseup', handleUp);
	});
	graph.addEventListener('click', handleClick);


	// Toggle gender sliders
	document.getElementById('gender-range-vertical').addEventListener('click', function(e) {e.stopPropagation();});
	document.getElementById('gender-range-horizontal').addEventListener('click', function(e) {e.stopPropagation();});
	var sliders = document.getElementsByClassName('gender-slider');
	window.toggleGenderSliders = function() {
		Array.prototype.forEach.call(sliders, function(slider) {
			var display = slider.style.display;
			if (!display) {
				display = window.getComputedStyle(slider).getPropertyValue('display');
			}
			slider.style.display = display === 'block' ? 'none' : 'block';
		});
	};
}());
