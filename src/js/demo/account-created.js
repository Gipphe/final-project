(function() {
	var accountEmail = document.getElementById('account-email');
	var genderTitle = document.getElementById('gender-title');
	var genderSlides = document.getElementById('gender-slides');

	window.GenderAll.accountCreatedHandle = function() {
		var defined = window.GenderAll.graph;
		var title = window.GenderAll.title;
		var email = window.GenderAll.email;

		accountEmail.innerHTML = email;
		genderTitle.innerHTML = title;
		genderSlides.innerHTML = defined[0] + ', ' + defined[1];
	};
}());
