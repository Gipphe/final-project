(function() {
	// window.State is defined in state.js
	var State = window.State;

	var back = document.getElementById('back');
	var next = document.getElementById('next');
	var state = new State(back, next);
	back.addEventListener('click', function() {
		state.back();
	});
	next.addEventListener('click', function() {
		state.next();
	});
}());
