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
var canvas = document.getElementById("map")

var canvasWidth = canvas.width
	canvasHeight = canvas.height

// Load the contexts
var ctx = canvas.getContext("2d")

// Extra operation
canvas.globalCompositeOperation = "lighter";
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

var origin = { "x" : canvasWidth / 2 - tileSizeTerrain.dx, "y" : tileSizeTerrain.dy }

// Draw a specific tile to the context
function drawTile( sprite, tileSize, f, tsx, tsy, tx, ty, wx, wy ) {
	// Isometric transformation
	ctx.drawImage(
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
	var k, i, j, m, M

	// For each cell, draw the corresponding tile
	// Loop from rear to close
	for (k = 0; k <= 2 * engine.mapSize - 2; k++) { //
		m = Math.min(k, engine.mapSize - 1)
		M = Math.max(0, k - engine.mapSize + 1)

		for (j = M; j <= m; j++) {
			i = m + M - j

			type = engine.terrainMap[i][j]
			drawTile( terrainTiles, tileSizeTerrain, f,
				1, 1, type, 0, i, j )

			obstacle = engine.obstacleMap[i][j]

			if (obstacle) {
				drawTile( obstaclesTiles, tileSizeObstacles, f,
					1, 3, obstacle - 1, 0, i, j )
			}

			unit = engine.unitMap[i][j]

			if (unit) {
				// TODO
				drawTile( unitsSprite, tileSizeObstacles, f,
					1, 1, unit.type, 1, i, j )
			}

			building = engine.buildingMap[i][j]

			if (building) {
				drawTile( buildingSprite, tileSizeObstacles, f,
					building.size, 1+building.size, building.id, 2-building.size,
					i-0.5, j+0.5 )
			}
		}
	}
}
