document.addEventListener("DOMContentLoaded", function() {
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

	// window.State is defined in state.js
	var State = window.State;
	var slideshow = document.getElementById('slideshow');
	var slideshowWidth = slideshow.offsetWidth;
	var slides = Array.prototype.slice.call(slideshow.children);
	var next = document.getElementById('slide-next');
	var back = document.getElementById('slide-back');
	var otherSlides = slides.slice(1);
	for (var i = 0, len = otherSlides.length; i < len; i += 1) {
		otherSlides[i].style.left = slideshowWidth + 'px';
	}
	var state = State(slideshow, slides);
	var lastButton = null;
	state.whenNewState = function(newState, oldState) {
		var newEl = document.getElementById(newState.id);
		var oldEl = document.getElementById(oldState.id);
		if (lastButton === 'back') {
			oldEl.style.left = slideshowWidth + 'px';
		}
		oldEl.style.opacity = '0';
		oldEl.classList.remove('view');
		newEl.style.left = '0';
		newEl.style.opacity = '1';
		newEl.classList.add('view');
	};
	next.addEventListener('click', function() {
		lastButton = 'next';
		state.next();
	});
	back.addEventListener('click', function() {
		lastButton = 'back';
		state.back();
	});
});

