(function() {
	var en = document.getElementById('en');
	var no = document.getElementById('no');
	var doc = document.documentElement;
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
		doc.setAttribute('lang', lang);
	};
	window.dummyPrompt = function() {
		var lang = doc.getAttribute('lang');
		if (lang === 'en') {
			window.alert('This feature is not really implemented as of yet.');
		} else {
			window.alert('Denne funksjonen har ikke blitt implementert ennå.');
		}
	};

	// window.State is defined in State.js
	var State = window.State;
	var slideshow = document.getElementById('#slideshow');
	var slides = slideshow.children;
	var next = document.getElementById('slide-next');
	var back = document.getElementById('slide-back');
	var state = State(slideshow, slides);
	next.addEventListener('click', function() {
		state.next();
	});
	back.addEventListener('click', function() {
		state.back();
	});
}());

