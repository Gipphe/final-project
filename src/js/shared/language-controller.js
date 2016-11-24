(function() {
	// Language controller

	var compose = window.utils.compose;
	var doc = document.documentElement;

	var en = document.getElementById('en');
	var no = document.getElementById('no');
	var halt = function(e) {
		e.stopPropagation();
		return e;
	};
	var changeLang = function(lang) {
		if (typeof lang === 'string' || lang.length === 2) {
			doc.setAttribute('lang', lang);
		}
		return lang;
	};
	var piper = function(val) {
		return function(){
			return val;
		};
	};
	var changeSelected = function(lang) {
		if (lang === 'no') {
			no.classList.add('selected');
			en.classList.remove('selected');
		} else {
			en.classList.add('selected');
			no.classList.remove('selected');
		}
	};
	var noClickHandle = compose(halt, piper('no'), changeLang, changeSelected);
	var enClickHandle = compose(halt, piper('en'), changeLang, changeSelected);
	no.addEventListener('click', noClickHandle);
	en.addEventListener('click', enClickHandle);
}());
