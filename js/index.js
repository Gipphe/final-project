document.addEventListener("DOMContentLoaded", function() {

	var isMobile = window.innerWidth > 1001 ? false : true;

	var doc = document.documentElement;
	var body = document.body;

	(function() {
		// Reading Disability Mode
		var rdm = document.getElementsByClassName('rdm')[0];
		window.toggleRDM = function() {
			if (body.classList.contains('rdm')) {
				body.classList.remove('rdm');
				rdm.classList.remove('active');
			} else {
				body.classList.add('rdm');
				rdm.classList.add('active');
			}
			return false;
		};
	}());

	(function() {
		// Language controller
		var en = document.getElementById('en');
		var no = document.getElementById('no');
		var changeLang = function(lang) {
			if (typeof lang !== 'string' || lang.length !== 2) return;
			doc.setAttribute('lang', lang);
			return false; // Do not scroll the page
		};
		no.addEventListener('click', function() {
			changeLang('no');
			this.classList.add('selected');
			en.classList.remove('selected');
		});

		en.addEventListener('click', function() {
			changeLang('en');
			this.classList.add('selected');
			no.classList.remove('selected');
		});
	}());

	window.dummyPrompt = function() {
		// Dummy prompt for unimplemented features
		var lang = doc.getAttribute('lang');
		if (lang === 'en') {
			window.alert('This feature is not really implemented as of yet.');
		} else {
			window.alert('Denne funksjonen har ikke blitt implementert ennå.');
		}
		return false;
	};

	(function() {
		// Control no-js style classes
		var noJs = document.getElementsByClassName('no-js');
		noJs = Array.prototype.slice.call(noJs);
		var addNoJs = function(el) {
			el.classList.add('no-js');
		};
		var removeNoJs = function(el) {
			el.classList.remove('no-js');
		};
		var evaluateNoJs = function() {
			var isMobile = window.innerWidth > 1001 ? false : true;
			var fn;
			if (isMobile) {
				fn = addNoJs;
			} else {
				fn = removeNoJs;
			}
			for (var i = 0, len = noJs.length; i < len; i += 1) {
				fn(noJs[i]);
			}
		};
		var resizeHandler = function() {
			evaluateNoJs();
			window.onresize = null;
			setTimeout(function() {
				window.onresize = resizeHandler;
			}, 100);
		};
		evaluateNoJs();
		window.onresize = resizeHandler;
	}());
	(function() {
		// Mobile menu controller
		var menuIcon = document.getElementById('menu-icon');
		var nav = document.getElementsByTagName('nav')[0];
		var compose = function() {
			var fns = Array.prototype.slice.call(arguments);
			return function(arg) {
				var coll = arg;
				for (var i = 0, len = fns.length; i < len; i += 1) {
					coll = fns[i](coll);
				}
				return coll;
			};
		};
		var halt = function(e) {
			e.stopPropagation();
			return e;
		};
		var showNav = function(v) {
			nav.style.display = 'block';
			return v;
		};
		var hideNav = function(v) {
			nav.style.display = '';
			return v;
		};
		var queuedHideNav = function(v) {
			setTimeout(function() {
				return hideNav(v);
			}, 1);
			return v;
		};
		var isNavVisible = function() {
			var style = nav.style.display;
			if (style === '') {
				return window.getComputedStyle(nav).display !== 'none';
			}
			return style !== 'none';
		};
		var evalShowHide = function() {
			if (isNavVisible()) {
				return false;
			} else {
				return true;
			}
		};
		var showHideNav = function(show) {
			if (show) {
				showNav();
			} else {
				hideNav();
			}
			return show;
		};
		var menuIconClickHandler = compose(halt, evalShowHide, showHideNav);
		var navClickHandler = compose(halt, queuedHideNav);
		var docClickHandler = compose(halt, hideNav);
		menuIcon.addEventListener('click', menuIconClickHandler);
		nav.addEventListener('click', navClickHandler);
		doc.addEventListener('click', docClickHandler);
	}());

	(function() {
		if (isMobile) {
			return;
		}
		// Slideshow controller
		var State = window.State; // window.State is defined in state.js
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
		var fadeOut = function(button) {
			button.children[0].style.opacity = '0';
			button.style.cursor = 'default';
		};
		var fadeIn = function(button) {
			button.children[0].style.opacity = '';
			button.style.cursor = '';
		};
		state.whenNewState = function(newState, oldState) {
			// At the beginning of the slideshow
			if (newState.id === this.states[0].id) {
				fadeOut(back);
			} else {
				fadeIn(back);
			}
			// At the end of the slideshow
			if (newState.id === this.states.slice(-1)[0].id) {
				fadeOut(next);
			} else {
				fadeIn(next);
			}
			if (newState.id === oldState.id) {
				return;
			}

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
		next.addEventListener('click', function(e) {
			e.stopPropagation();
			lastButton = 'next';
			state.next();
		});
		back.addEventListener('click', function(e) {
			e.stopPropagation();
			lastButton = 'back';
			state.back();
		});
		back.click();
	}());
});

