(function() {
	// window.State is defined in state.js
	var State = window.State;

	var back = document.getElementById('back');
	var next = document.getElementById('next');
	var slideList = document.getElementsByClassName('slide');
	var el = document.getElementById('#lander');
	var state = State(el, slideList, back, next);
	back.addEventListener('click', function() {
		var newState = state.back();
		if (newState.id === 'sign-up') {
			next.innerHTML = 'Sign up';
		} else {
			back.innerHTML = 'Back';
			next.innerHTML = 'Next';
		}
	});
	next.addEventListener('click', function(e) {
		var nextState = state.next();
		if (nextState.id === 'account-created') {
			window.GenderAll.accountCreatedHandle();
		}
	});
}());
