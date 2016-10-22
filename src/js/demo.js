(function() {
	var changeLangEls = document.getElementsByClassName('langs')[0].children;
	var handler = function(){
		var lang = String.prototype.split.call(this.classList, ' ').includes('no') ? 'no' : 'en';
		for (var i = 0; i < changeLangEls.length; i += 1) {
			changeLangEls[i].classList.remove('selected');
		}
		this.classList.add('selected');
	};
	for (var i = 0; i < changeLangEls.length; i += 1) {
		changeLangEls[i].addEventListener('click', handler);
	}
	window.changeLang = function(lang) {
		if (typeof lang !== 'string' || lang.length !== 2) return;
		var html = document.documentElement;
		html.setAttribute('lang', lang);
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
	genderInput.addEventListener('click', showList);
	genderInput.addEventListener('focusin', showList);
	genderInput.addEventListener('input', function(e) {
		e.stopPropagation();
		if (!genderInput.value) {
			hideList();
		} else {
			showList();
		}
		// Array of genders to exclude from filtering
		var exclusion = ['Custom...'];
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
		var hideThese = filter(function(val) {
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
	// Prevent the click event from bubbling up to #main, hiding the gender list
	genderInput.addEventListener('click', function(e) { e.stopPropagation(); });
	// Hide the gender list if a click event bubbles up to #main
	document.getElementById('main').addEventListener('click', hideList);
}());
