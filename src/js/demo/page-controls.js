(function() {
	// window.State is defined in state.js
	var State = window.State;
	var validators = window.GenderAll.validators;

	var back = document.getElementById('back');
	var next = document.getElementById('next');
	var slideList = document.getElementsByClassName('slide');
	var el = document.getElementById('#lander');
	var state = State(el, slideList, back, next);

	var dimButton = function(button) {
		button.classList.add('dimmed');
	};
	var undimButton = function(button) {
		button.classList.remove('dimmed');
	};
	var toggleButton = function(button) {
		var currState = state.state;
		var nextState = state.getNextState();
		if (!validators[currState.id]() || !nextState) {
			dimButton(button);
		} else {
			undimButton(button);
		}
	};
	toggleButton(next);

	back.addEventListener('click', function() {
		var newState = state.back();
		if (newState.id === 'sign-up') {
			next.innerHTML = 'Sign up';
		} else {
			back.innerHTML = 'Back';
			next.innerHTML = 'Next';
		}
	});
	next.addEventListener('click', function() {
		var currState = state.state;
		if (!validators[currState.id]()) {
			return;
		}
		var nextState = state.next();
		if (nextState.id === 'account-created') {
			window.GenderAll.accountCreatedHandle();
		}
		toggleButton(next);
	});
	window.GenderAll.validate = function() {
		var currState = state.state;
		if (!validators[currState.id]()) {
			return;
		}
		toggleButton(next);
	};
}());
