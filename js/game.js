/*
The main loop of the game, calls for updates
*/

gameConstants = { "map_size" : 20 }

var engine = new Engine( gameConstants )

function draw() {
	// engine.update(drawDisplayClallback);
	display();

	requestAnimationFrame(draw);
}

draw();
