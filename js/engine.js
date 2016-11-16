/*
The Engine handles the game rules and update its state
*/

function Engine (gameConstants) {
  // Initialize the map
  this.mapSize = Math.floor(gameConstants['map_size'] / 2.0) * 2 + 1

  this.terrainMap = []
  // this.obstacleMap = []
  // this.unitMap = []
  // this.buildingMap = []

  this.gameObjects = []

  // Default values
  for (let i = 0; i < this.mapSize; i++) {
    this.terrainMap[i] = new Array(this.mapSize)
    // this.obstacleMap[i] = new Array(this.mapSize)
    // this.unitMap[i] = new Array(this.mapSize)
    // this.buildingMap[i] = new Array(this.mapSize)
  }

  // Generate the terrain and what is on it
  /* global generateMap */
  generateMap(this.terrainMap, this.gameObjects, gameConstants)

  // this.addBuilding(1, 1, 9, 0)
  // this.addBuilding(10, 10, 8, 0)
}

// Get the input, check the rules and list the changes to be handled
Engine.prototype.update = function () {
  // TODO
  // Get the inputs
  // Check against the rules
}

// Add a building to the map if possible
/* global Building */
Engine.prototype.addBuilding = function (x, y, id, side) {
  // TODO: Test if possible

  let size
  if (id < 8) {
    size = 1 // 2x2 square
    if (!this.isNothing(x, y, 2, this.mapSize)) return false
  } else if (id < 16) {
    size = 2 // 1x1 square
    if (!this.isNothing(x, y, 1, this.mapSize)) return false
  }

  // Footprint of  the building
  for (let i = x - size + 1; i <= x; i++) {
    for (let j = y - size + 1; j <= y; j++) {
      this.buildingMap[i][j] = 0
    }
  }

  // Mark the lower corner
  this.buildingMap[x][y] = new Building(id, side, { x, y }, size)
  return true
}

// Test if one can place something at a given coordinate
Engine.prototype.isNothing = function (x, y, size, mapSize) {
  // Verify if possible
  if (x - size + 1 < 0 || y - size + 1 < 0 || x > mapSize || y > mapSize) {
    return false
  }

  // Takes the lower square as origin
  for (let i = x - size + 1; i <= x; i++) {
    for (let j = y - size + 1; j <= y; j++) {
      // Nothing on this cell ?
      if (this.obstacleMap[i][j] > 0 || this.unitMap[i][j] || this.buildingMap[i][j]) {
        return false
      }
    }
  }

  return true
}
