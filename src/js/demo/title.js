(function() {
	// Gender input control

	var genderInput = document.getElementById('gender-input');
	var genderList = document.getElementById('gender-list');
	var compose = window.utils.compose;

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
		var trueVal = val === 'hide' ? '' : 'visible';
		genderList.style.visibility = trueVal;
	};
	var hideListEl = function(el) {
		setDisplay(el, 'none');
	};
	var showListEl = function(el) {
		setDisplay(el, '');
	};
	var hideList = function() {
		setListDisplay('hide');
	};
	var showList = function() {
		setListDisplay('show');
	};

	var halt = function(e) {
		if (!e.stopPropagation) {
			return e;
		}
		e.stopPropagation();
		return e;
	};
	var setInputValue = function(e) {
		genderInput.value = e.target.innerHTML;
		return e;
	};
	var resetSelected = function() {
		var children = genderList.children;
		for (var i = 0; i < children.length; i += 1) {
			var child = children[i];
			child.classList.remove('selected');
		}
	};
	var getSelected = function(e) {
		var children = genderList.children;
		for (var i = 0, len = children.length; i < len; i += 1) {
			var child = children[i];
			if (child.classList.contains('selected')) {
				return [e, child];
			}
		}
		return [e];
	};
	var checkSelected = function(container) {
		var e = container[0];
		var selected = container[1];
		if (!selected) {
			selected = genderList.children[0];
			selected.classList.add('selected');
		}
		return [e, selected];
	};
	var setSelected = function(container) {
		var e = container[0];
		var selected = container[1];
		selected.classList.remove('selected');
		e.target.classList.add('selected');
		return [e, selected];
	};
	var setTitle = function() {
		window.GenderAll.title = genderInput.value;
		window.GenderAll.validate();
	};

	var genderListClickHandle = compose(halt, setInputValue, hideList, resetSelected, setTitle);
	var genderListHoverHandle = compose(halt, getSelected, checkSelected, setSelected);
	genderList.addEventListener('click', genderListClickHandle);
	genderList.addEventListener('mouseenter', genderListHoverHandle);

	var showHideList = function() {
		if (!genderInput.value) {
			hideList();
			return false;
		} else {
			showList();
			return true;
		}
	};
	var filterListItems = function(doRun) {
		if (!doRun) {
			return;
		}
		var exclusions = ['Custom...'];
		var list = genderList.children;
		var filterList = filter.bind(null, list, exclusions);
		var showThese = filterList(function(val) {
			var html = val.innerHTML.toLowerCase();
			var inputValue = genderInput.value.toLowerCase();
			if (!inputValue.length) {
				return true;
			}
			return html.includes(inputValue);
		});
		var hideThese = filterList(function(val) {
			var html = val.innerHTML.toLowerCase();
			var inputValue = genderInput.value.toLowerCase();
			if (!inputValue.length) {
				return false;
			}
			return !html.includes(inputValue);
		});
		hideThese.forEach(function(el) {
			hideListEl(el);
		});
		showThese.forEach(function(el) {
			showListEl(el);
		});
	};
	var genderInputClickHandle = compose(halt, showList);
	var genderInputInputHandle = compose(halt, showHideList, filterListItems, setTitle);
	genderInput.addEventListener('click', genderInputClickHandle);
	genderInput.addEventListener('focusin', genderInputClickHandle);
	genderInput.addEventListener('input', genderInputInputHandle);

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
	document.getElementById('title').addEventListener('click', hideList);

	window.GenderAll.validators.title = function() {
		return window.GenderAll.title && window.GenderAll.title.length ? true : false;
	};
}());
