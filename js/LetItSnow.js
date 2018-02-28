addEvent(window, 'resize', LetItSnow, { passive: true });
LetItSnow();
function LetItSnow() {
	var snowCanvasId = 'snowCanvas'
	  , framerate = 30
	  , flakeNumberModifier = 0.05
	  , fallSpeedModifier = 0.4
	  , sliceWidth = 1000
	  , width = window.innerWidth;
  sliceWidth = Math.min(width, sliceWidth); // limit max width to window's
  while (width % sliceWidth != 0 && (sliceWidth - width % sliceWidth > sliceWidth / 3)) { // if most of the slice is wasted, adjust it's size
	sliceWidth += Math.ceil((width % sliceWidth) / Math.ceil(width / sliceWidth));
  }
	var height = window.innerHeight
	  , numFlakes = Math.max((sliceWidth * height / 400 * flakeNumberModifier), 100)
	  , flakes = []
	  , TWO_PI = Math.PI * 2
	  , radHeight = 40
	, range =
  (start, end) => { // get a random number inside a range
		return Math.random() * (end - start) + start;
	}
	, getRandomFlake =
  (init) => { // randomize flake data
		return {
			x: range(10, sliceWidth + 10),
			y: init ? range(-5, height + 5) : range(-5 * fallSpeedModifier, -5),
			size: (Math.max(range(1, 4), 2)),
			yMod: range(0, 150),
			waveSize: range(1, 4)
		}
	}
	, tick =
  () => { // main routine
	var posX = 0;
		context.clearRect(0, 0, width, height); // reset canvas for next frame
		flakes.forEach((flake, k, flakes) => {
			// calculate changes to snowflake
			posX = flake.x + Math.sin(flake.yMod + flake.y / radHeight * (5 - flake.size)) * flake.waveSize * (1 - flake.size);
			flake.y += flake.size * fallSpeedModifier; // bigger flakes are nearer to screen, thus they fall faster to create 3d effect

			if (flake.y > height + 5) {
				flakes[k] = getRandomFlake(); // if snowflake is out of bounds, reset
			}
			// draw snowflake
			context.globalAlpha = (flake.size - 1) / 3;
			context.drawImage(flakeTemplate, posX, flake.y, flake.size, flake.size);
		});
		// repeat (sliceWidth)px wide strip with snowflakes to fill whole canvas
		if (width > sliceWidth) {
	  context.globalAlpha = 1
			for (var i = sliceWidth; i < width; i *= 2) {
				context.drawImage(canvas, i, 0);
			}
		}
	};
	while (canvas = document.getElementById(snowCanvasId)) {
		Element.remove(canvas);
	}

	console.log(
		'Resolution: ', width, 'x', height, ' ~', Math.round(width * height * 100 / 1e6) / 100, 'M', '\n',
		'Slice width: ', sliceWidth, '\n',
		'Slices: ', Math.ceil(width / sliceWidth)
	);

	var canvas        = Element.create('canvas', document.body, { width, height }, snowCanvasId)
	  , context = canvas.getContext('2d')
	  , flakeTemplate = Element.create('canvas', false, { width : 8, height: 8 }) // create flake graphic
	  , flakeTemplateContext = flakeTemplate.getContext("2d");
	flakeTemplateContext.fillStyle = "#fff";
	flakeTemplateContext.beginPath();
	flakeTemplateContext.arc(4, 4, 4, 0, TWO_PI);
	flakeTemplateContext.fill();
	// init snowflakes
	for (i = 0; i < numFlakes; i++) {
		flakes.push(getRandomFlake(true));
	}
	// start tick at specified fps
	if (window.snowCanvasInterval) clearInterval(window.snowCanvasInterval);
	window.snowCanvasInterval = setInterval(tick, parseInt(1000 / framerate));
}
