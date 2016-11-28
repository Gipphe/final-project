(function() {
	var signUpEmail = document.getElementById('sign-up-email');
	var compose = window.utils.compose;

	var emailReg = /@.+\..+/;
	var halt = function(e) {
		e.stopPropagation();
		return e;
	};
	var propagateEmail = function(e) {
		var val = e.target.value;
		window.GenderAll.email = val;
		window.GenderAll.validate();
	};
	var handle = compose(halt, propagateEmail);

	signUpEmail.addEventListener('input', handle);
	signUpEmail.addEventListener('change', handle);
	window.GenderAll.validators['sign-up'] = function() {
		return emailReg.test(window.GenderAll.email);
	};
}());
