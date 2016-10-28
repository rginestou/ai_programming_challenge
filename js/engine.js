/*
The Engine handles the game rules and update its state
*/

function Engine( gameConstants ) {
	// Initialize the map
	this.mapSize = gameConstants["map_size"]
	this.terrainMap = [];
	this.obstacleMap = [];

	// Default values
	for ( var i = 0 ; i < this.mapSize ; i++) {
		this.terrainMap[i] = new Array(this.mapSize)
		this.obstacleMap[i] = new Array(this.mapSize)
	}

	// Generate the terrain and what is on it
	generateMap( this.terrainMap, this.obstacleMap, this.mapSize )
}
//
// Engine.prototype.del = function (id) {
// 	delete this.game[id];
// };
