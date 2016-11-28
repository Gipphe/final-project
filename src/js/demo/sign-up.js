(function() {
	var signUpEmail = document.getElementById('sign-up-email');
	signUpEmail.addEventListener('change', function(e) {
		e.stopPropagation();
		var val = e.target.value;
		window.GenderAll.email = val;
	});
}());
