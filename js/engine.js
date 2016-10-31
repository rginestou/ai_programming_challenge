/*
The Engine handles the game rules and update its state
*/

function Engine( gameConstants ) {
	// Initialize the map
	this.mapSize = gameConstants["map_size"]

	this.terrainMap = []
	this.obstacleMap = []
	this.unitMap = []
	this.buildingMap = []

	// Default values
	for ( var i = 0 ; i < this.mapSize ; i++) {
		this.terrainMap[i] = new Array( this.mapSize )
		this.obstacleMap[i] = new Array( this.mapSize )
		this.unitMap[i] = new Array( this.mapSize )
		this.buildingMap[i] = new Array( this.mapSize )
	}

	// Generate the terrain and what is on it
	generateMap( this.terrainMap,
					this.obstacleMap,
					this.unitMap,
					this.buildingMap,
					this.mapSize )

	console.log(this.addBuilding( 10, 5, 0, 0 ))
}

// Add a building to the map if possible
Engine.prototype.addBuilding = function ( x, y, id, side ) {
	var size;

	// Test if possible
	if ( id < 8 ) {
		// 2x2 square
		size = 2

		if ( !this.isNothing(x, y, 2) ) {
			return false
		}
	} else if ( id < 16 ) {
		// 1x1 square
		size = 1

		if ( !this.isNothing(x, y, 1) ) {
			return false
		}
	}

	// Footprint of  the building
	for (var i = x; i < x + size; i++) {

		for (var j = y; j < y + size; j++) {
			this.buildingMap[i][j] = 0
		}
	}

	// Mark the upper corner
	this.buildingMap[x][y] = new Building( id, side, { "x" : x, "y" : y}, size )

	return true
}

// Test if one can place something at a given coordinate
Engine.prototype.isNothing = function ( x, y, size ) {
	// Takes the upper square as origin
	for (var i = x; i < x + size; i++) {

		for (var j = y; j < y + size; j++) {

			// Nothing on this cell ?
			if ( this.obstacleMap[i][j] > 0 ||
					this.unitMap[i][j] ||
					this.buildingMap[i][j] ) {

				return false
			}
		}
	}

	return true
}
