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
}());
