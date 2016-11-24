(function() {
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

	var setDisplay = function(el, val) {
		el.style.display = val;
	};
	var setListDisplay = function(val) {
		setDisplay(genderList, val);
	};

	var hideList = function(e) {
		e.stopPropagation();
		setListDisplay('none');
		var children = genderList.children;
		for (var i = 0; i < children.length; i += 1) {
			var child = children[i];
			child.classList.remove('selected');
		}
	};
	var showList = function(e) {
		e.stopPropagation();
		setListDisplay('inline-block');
	};
	var getSelected = function() {
		var children = genderList.children;
		for (var i = 0, len = children.length; i < len; i += 1) {
			var child = children[i];
			if (child.classList.contains('selected')) {
				return child;
			}
		}
	};
	genderList.addEventListener('click', function(e) {
		e.stopPropagation();
		// Copy list item value to input field
		genderInput.value = e.target.innerHTML;
		hideList();
	});

	genderList.addEventListener('hover', function(e) {
		e.stopPropagation();
		var selected = getSelected();
		if (!selected) {
			genderList.children[0].classList.add('selected');
		}
		selected.classList.remove('selected');
		e.target.claassList.add('selected');
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
		var exclusions = ['Custom...'];
		var list = genderList.children;
		var filterList = filter.bind(null, list, exclusions);
		var showThese = filterList(function(val) {
			var html = val.innerHTML.toLowerCase();
			var inputValue = genderInput.value.toLowerCase();
			return html.includes(inputValue);
		});
		var hideThese = filterList(function(val) {
			var html = val.innerHTML.toLowerCase();
			var inputValue = genderInput.value.toLowerCase();
			return !html.includes(inputValue);
		});
		hideThese.forEach(function(el) {
			setDisplay(el, 'none');
		});
		showThese.forEach(function(el) {
			setDisplay(el, 'list-item');
		});
	});
	var getFirstVisibleChild = function() {
		var children = genderList.children;
		for (var i = 0, len = children.length; i < len; i += 1) {
			var child = children[i];
			if (child.style.display !== 'none') {
				return child;
			}
		}
	};
	var getLastVisibleChild = function() {
		var children = genderList.children;
		for (var i = children.length - 1; i >= 0; i -= 1) {
			var child = children[i];
			if (child.style.display !== 'none') {
				return child;
			}
		}
	};
	var scrollDown = function() {
		var selected = getSelected();
		if (!selected) {
			getFirstVisibleChild().classList.add('selected');
			return;
		}
		var next = selected.nextSibling;
		if (next) {
			selected.classList.remove('selected');
			next.classList.add('selected');
		}
	};
	var scrollUp = function() {
		var selected = getSelected();
		if (!selected) {
			getLastVisibleChild().classList.add('selected');
			return;
		}
		var next = selected.previousSibling;
		if (next) {
			selected.classList.remove('selected');
			next.classList.add('selected');
		}
	};
	var nextButton = document.getElementById('next');
	genderInput.addEventListener('keydown', function(e) {
		var keyDown = 40;
		var keyUp = 38;
		if (e.keyCode === 13) {
			nextButton.click();
		}
		if (e.keyCode === keyDown) {
			scrollDown();
		}
		if (e.keyCode === keyUp) {
			scrollUp();
		}
	});
	// Prevent the click event from bubbling up to #main, hiding the gender list
	genderInput.addEventListener('click', function(e) { e.stopPropagation(); });
	// Hide the gender list if a click event bubbles up to #main
	document.getElementById('main').addEventListener('click', hideList);
}());
