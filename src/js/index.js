ask.for(['utils']).in(function(utils) {
	var isMobile = window.innerWidth > 1001 ? false : true;

	var doc = document.documentElement;
	var body = document.body;
	var compose = utils.compose; // defined in utils.js
	console.log(utils);

	(function() {
		// Language controller
		var en = document.getElementById('en');
		var no = document.getElementById('no');
		var halt = function(e) {
			if (!e) {
				return;
			}
			e.stopPropagation();
			return e;
		};
		var changeLang = function(lang) {
			if (typeof lang !== 'string' || lang.length !== 2){
				return;
			}
			doc.setAttribute('lang', lang);
		};
		var getEl = function(e) {
			if (!e) {
				return;
			}
			return e.target.getAttribute('id');
		};
		var isEnter = function(e) {
			return e.keyCode === '13' ? true : false;
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
		var clickHandle = compose(halt, getEl, changeLang, changeSelected);
		var keyEnterHandle = compose(isEnter, halt, getEl, changeLang, changeSelected);
		no.addEventListener('click', clickHandle);
		en.addEventListener('click', clickHandle);
		no.addEventListener('keydown', keyEnterHandle);
	}());

	(function() {
		// Dummy prompt for unimplemented features
		var exclusions = [];
		window.dummyPrompt = function(el) {
			if (exclusions.includes(el)) {
				console.log('Excluded');
				return;
			}
			exclusions.push(el);

			var lang = doc.getAttribute('lang');
			if (lang === 'en') {
				window.alert('This feature is not really implemented as of yet.');
			} else {
				window.alert('Denne funksjonen har ikke blitt implementert ennå.');
			}
			return false;
		};
	}());

	(function() {
		// Control no-js style classes
		var noJs = document.getElementsByClassName('no-js');
		noJs = Array.prototype.slice.call(noJs);
		for (var i = 0, len = noJs.length; i < len; i += 1) {
			noJs[i].classList.remove('no-js');
		}
	}());

	(function() {
		// Mobile menu controller
		var menuIcon = document.getElementById('menu-icon');
		var nav = document.getElementsByTagName('nav')[0];

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
				style = window.getComputedStyle(nav).display;
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
		body.addEventListener('keydown', function(e) {
			var left = 37;
			var right = 39;
			if (e.keyCode === left) {
				back.click();
			} else if (e.keyCode === right) {
				next.click();
			}
		});
		back.click();
	}());

	(function() {
		// Image modal
		var modal = document.getElementById('image-modal');
		var imageEl = modal.children[0];

		var halt = function(e) { e.stopPropagation(); return e; };

		var zoomables = document.getElementsByClassName('zoomable');
		var imgClickHandle = compose(halt, function(e) {
			var img = e.target;
			var src = img.getAttribute('src');
			imageEl.setAttribute('src', src);
			modal.style.display = 'flex';
		});

		Array.prototype.forEach.call(zoomables, function(img) {
			img.addEventListener('click', imgClickHandle);
		});
		modal.addEventListener('click', compose(halt, function() {
			modal.style.display = 'none';
		}));
	}());

}).when.ready();

