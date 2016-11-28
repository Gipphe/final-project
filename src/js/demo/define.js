(function() {
	// Gender graph
	var graph = document.getElementById('gender-graph');
	var cursor = document.getElementById('cursor');
	var cursorStyle = window.getComputedStyle(cursor);
	var cursorXOffset = cursorStyle.getPropertyValue('width');
	var cursorYOffset = cursorStyle.getPropertyValue('height');
	var staticFix = 7;
	cursorXOffset = Number(cursorXOffset.replace('px', ''));
	cursorXOffset = Math.round(cursorXOffset / 2) - staticFix;
	cursorYOffset = Number(cursorYOffset.replace('px', ''));
	cursorYOffset = Math.round(cursorYOffset / 2) - staticFix;

	var handleUp = function() {
		graph.removeEventListener('mousemove', handleClick);
		graph.removeEventListener('mouseup', handleUp);
	};
	var handleClick = function(e) {
		var minMax = function(min, max, val) {
			return Math.max(Math.min(val, max), min);
		};
		var round5 = function(x) {
			return Math.round(x/5)*5;
		};
		var x = e.offsetX;
		var y = e.offsetY;
		var horLine = document.getElementById('x-line');
		var verLine = document.getElementById('y-line');
		var xMin = verLine.getAttribute('x1');
		var xMax = verLine.getAttribute('x2');
		var yMin = horLine.getAttribute('y1');
		var yMax = horLine.getAttribute('y2');
		var width = xMax - xMin;
		var height = yMax - yMin;
		var xOffset = -50;
		var yOffset = 100;
		x -= xMin;
		y -= yMin;
		x = minMax(x, xMax, xMin);
		y = minMax(y, yMax, yMin);
		var realX = xOffset + Math.round(x / width * 100);
		var realY = yOffset - Math.round(y / height * 100);

		var near5X = round5(realX);
		var near5Y = round5(realY);
		near5X = minMax(near5X, 50, -50);
		near5Y = minMax(near5Y, 100, 0);
		var verRange = document.getElementById('gender-range-vertical');
		var horRange = document.getElementById('gender-range-horizontal');
		verRange.value = near5Y;
		horRange.value = near5X;

		cursor.style.display = 'block';
		cursor.style.left = String(x - cursorXOffset) + 'px';
		cursor.style.top = String(y - cursorYOffset) + 'px';

		window.GenderAll.graph = [near5X, near5Y];
	};
	graph.addEventListener('mousedown', function() {
		graph.addEventListener('mousemove', handleClick);
		graph.addEventListener('mouseup', handleUp);
	});
	graph.addEventListener('click', handleClick);


	// Toggle gender sliders button
	document.getElementById('gender-range-vertical').addEventListener('click', function(e) {e.stopPropagation();});
	document.getElementById('gender-range-horizontal').addEventListener('click', function(e) {e.stopPropagation();});
	var sliders = document.getElementsByClassName('gender-slider');
	window.toggleGenderSliders = function() {
		Array.prototype.forEach.call(sliders, function(slider) {
			var display = slider.style.display;
			if (!display) {
				display = window.getComputedStyle(slider).getPropertyValue('display');
			}
			slider.style.display = display === 'block' ? 'none' : 'block';
		});
	};
}());
