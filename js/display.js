/*
Responsible for drawing on the client's window
*/

// Load the textures
tileSizeTerrain = { "x" : 64, "y" : 48, "dx" : 32, "dy" : 16 }
tileSizeObstacles = { "x" : 64, "y" : 32, "dx" : 32, "dy" : 16 }
var terrainTiles = new Image()
terrainTiles.src = 'img/terrain_tiles.png'

var obstaclesTiles = new Image()
obstaclesTiles.src = 'img/obstacle_tiles.png'

var unitsSprite = new Image()
unitsSprite.src = 'img/sword64.png'

var buildingSprite = new Image()
buildingSprite.src = 'img/buildings.png'

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

// Good resizing
ctx.terrain.mozImageSmoothingEnabled = false;
ctx.terrain.webkitImageSmoothingEnabled = false;
ctx.terrain.msImageSmoothingEnabled = false;
ctx.terrain.imageSmoothingEnabled = false;
ctx.obstacles.mozImageSmoothingEnabled = false;
ctx.obstacles.webkitImageSmoothingEnabled = false;
ctx.obstacles.msImageSmoothingEnabled = false;
ctx.obstacles.imageSmoothingEnabled = false;

var origin = { "x" : canvasWidth / 2 - tileSizeTerrain.dx, "y" : tileSizeTerrain.dy }

// Draw a specific tile to the context
function drawTile( context, sprite, tileSize, f, tsx, tsy, tx, ty, wx, wy ) {
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

	if (engine.mapSize * tileSizeTerrain.x > canvasWidth * 0.9) {
		// Need to be zoomed out
		f = (canvasWidth * 0.9) / (engine.mapSize * tileSizeTerrain.x)
	}

	var type, obstacle, unit

	// For each cell, draw the corresponding tile
	for (var i = 0; i < engine.mapSize; i++) {

		for (var j = 0; j < engine.mapSize; j++) {
			type = engine.terrainMap[i][j]
			drawTile( ctx.terrain, terrainTiles, tileSizeTerrain, f,
				1, 1, type, 0, i, j )

			obstacle = engine.obstacleMap[i][j]

			if (obstacle) {
				drawTile( ctx.obstacles, obstaclesTiles, tileSizeObstacles, f,
					1, 3, obstacle, 0, i, j )
			}

			unit = engine.unitMap[i][j]

			if (unit) {
				// TODO
				drawTile( ctx.players, unitsSprite, tileSizeObstacles, f,
					1, 1, unit.type, 1, i, j )
			}

			building = engine.buildingMap[i][j]

			if (building) {
				drawTile( ctx.players, buildingSprite, tileSizeObstacles, f,
					building.size, 1+building.size, building.id, 2-building.size,
					i+0.5, j+1.5 )
			}
		}
	}
}
