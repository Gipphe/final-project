(function() {
	var changeLangEls = document.getElementsByClassName('langs')[0].children;
	var handler = function(){
		var lang = String.prototype.split.call(this.classList, ' ').contains('no') ? 'no' : 'en';
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
	var filter = function(list, predicate) {
		var res = [];
		for (var i = 0, len = list.length; i < len; i += 1) {
			var item = list[i];
			if (predicate(item)) {
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
	genderInput.addEventListener('focusin', showList);
	genderInput.addEventListener('input', function(e) {
		e.stopPropagation();
		if (!genderInput.value) {
			hideList();
		} else {
			showList();
		}
		var list = genderList.children;
		var showThese = filter(list, function(val) {
			return val.innerHTML.toLowerCase().includes(genderInput.value.toLowerCase());
		});
		var hideThese = filter(list, function(val) {
			return !val.innerHTML.toLowerCase().includes(genderInput.value.toLowerCase());
		});
		hideThese.forEach(function(el) {
			setDisplay(el, 'none');
		});
		showThese.forEach(function(el) {
			setDisplay(el, 'list-item');
		});
	});
	genderInput.addEventListener('click', function(e) { e.stopPropagation(); });
	document.getElementById('main').addEventListener('click', hideList);
}());
