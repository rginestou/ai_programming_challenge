/*
Responsible for drawing on the client's window
*/

// Load the textures
var tileSizeTerrain = { "x" : 64, "y" : 48, "dx" : 32, "dy" : 16 }
var tileSizeObstacles = { "x" : 64, "y" : 32, "dx" : 32, "dy" : 16 }
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

canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight

// Load the contexts
var ctx = canvas.getContext("2d")

// Extra operation
canvas.globalCompositeOperation = "lighter";
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

var origin = { "x" : canvas.width / 2 - tileSizeTerrain.dx, "y" : tileSizeTerrain.dy }

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
	var type, obstacle, unit
	var k, i, j, m, M

	// Determine the factor
	var f = 1

	if (engine.mapSize * tileSizeTerrain.x > canvas.width * 0.9) {
		f = (canvas.width * 0.9) / (engine.mapSize * tileSizeTerrain.x)
	}

	// For each cell, draw the corresponding tile
	// Loop from rear to close
	for (k = 0; k <= 2 * engine.mapSize - 2; k++) { //
		m = Math.min(k, engine.mapSize - 1)
		M = Math.max(0, k - engine.mapSize + 1)

		for (j = M; j <= m; j++) {
			i = m + M - j

			// lastChanges

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
				drawTile( unitsSprite, tileSizeObstacles, f,
					1, 1, unit.type, 1, i, j )
			}

			building = engine.buildingMap[i][j]

			if (building) {
				offset = (building.size - 1) * 0.5
				drawTile( buildingSprite, tileSizeObstacles, f,
					building.size, 3,
					(building.id % 8) * building.size, 3 * Math.floor(building.id / 8),
					i-offset, j+offset )
			}
		}
	}
}
