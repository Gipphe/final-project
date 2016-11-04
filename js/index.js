(function() {
	var en = document.getElementById('en');
	var no = document.getElementById('no');
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
		document.documentElement.setAttribute('lang', lang);
	};
}());

