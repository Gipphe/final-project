(function() {
	// Dummy prompt for unimplemented features

	var doc = document.documentElement;

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
