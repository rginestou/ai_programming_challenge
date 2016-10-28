/*
Responsible for drawing on the client's window
*/

// Load the textures
tileSize = { "x" : 64, "y" : 57, "dx" : 32, "dy" : 16 }
var terrainTiles = new Image();
terrainTiles.src = 'img/isometric_tile.png';
terrainTiles.imageSmoothingEnabled = false

// Load the canvas
var canvas = {
	"terrain" : document.getElementById("terrain"),
	"obstacles" : document.getElementById("obstacles"),
	"players" : document.getElementById("players")
}

var canvasWidth = canvas.terrain.width
	canvasHeight = canvas.terrain.height

// Load the contexts
var ctx = {
	"terrain" : canvas.terrain.getContext("2d"),
	"obstacles" : canvas.obstacles.getContext("2d"),
	"players" : canvas.players.getContext("2d")
}

ctx.terrain.mozImageSmoothingEnabled = false;
ctx.terrain.webkitImageSmoothingEnabled = false;
ctx.terrain.msImageSmoothingEnabled = false;
ctx.terrain.imageSmoothingEnabled = false;

var origin = { "x" : canvasWidth / 2 - tileSize.dx, "y" : tileSize.dy }

// Draw a specific tile to the context
function drawTile( context, sprite, f, tsx, tsy, tx, ty, wx, wy ) {
	// Isometric transformation
	context.drawImage(
		sprite,
		Math.floor(tx * tileSize.x), Math.floor(ty * tileSize.y),
		tileSize.x * tsx, tileSize.y * tsy,
		origin.x + Math.floor((wx - wy) * tileSize.dx) * f,
		origin.y + Math.floor((wy + wx) * tileSize.dy - (tsy - 1) * tileSize.y) * f,
		tileSize.x * tsx * f, tileSize.y * tsy * f
	);
}

function display() {
	// Draw the map
	var f = 1

	if (engine.mapSize * tileSize.x > canvasWidth * 0.9) {
		// Need to be zoomed out
		f = (canvasWidth * 0.9) / (engine.mapSize * tileSize.x)
	}

	var type;

	// For each cell, draw the corresponding tile
	for (var i = 0; i < engine.mapSize; i++) {
		for (var j = 0; j < engine.mapSize; j++) {
			type = engine.terrainMap[i][j]
			drawTile( ctx.terrain, terrainTiles, f, 1, 1, type, 0, i, j )

			obstacle = engine.obstacleMap[i][j]
			if (obstacle) {

				drawTile( ctx.obstacles, terrainTiles, f, 1, 2, obstacle - 1, 1, i, j )
			}
		}
	}
}
