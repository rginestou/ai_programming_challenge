/* global Graphics, Sprite, engine */

const isometricTiles = { dx: 64, dy: 32, dz: 16 }
const tileW = isometricTiles.dx
const tileH = isometricTiles.dy + isometricTiles.dz

function isometricPos (wx, wy) {
  return [
    (wx - wy) * isometricTiles.dx / 2,
    -(wy + wx) * isometricTiles.dy / 2,
    -(wy + wx)
  ]
}

function displayGame () {
  // Set origin
  Graphics.ox = Graphics.width / 2
  Graphics.oy = Graphics.height - isometricTiles.dz * 2

  // Set scaling
  if (engine.mapSize * isometricTiles.dx > Graphics.width * 0.9) {
    Graphics.scale = (Graphics.width * 0.9) / (engine.mapSize * isometricTiles.dx)
  }

  // Render terrain
  for (let wx = 0; wx < engine.mapSize; wx++) {
    for (let wy = 0; wy < engine.mapSize; wy++) {
      let terrainType = engine.terrainMap[wx][wy]
      let tile = new Sprite('terrain_tiles.png', terrainType * tileW, 0, tileW, tileH)
      tile.setPosition(...isometricPos(wx, wy))
      tile.setOrigin(isometricTiles.dx / 2, isometricTiles.dy)
      Graphics.add(tile)
    }
  }

  // Render objects
  for (let gameObject of engine.gameObjects) {
    gameObject.setupSprite()
    Graphics.add(gameObject.sprite)
  }
}
