/* global Graphics, Sprite, engine */

const isometricTiles = { dx: 64, dy: 32, dz: 16 }
const obstacleHeight = 96

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

  let tileW = isometricTiles.dx
  let tileH = isometricTiles.dy + isometricTiles.dz
  for (let wx = 0; wx < engine.mapSize; wx++) {
    for (let wy = 0; wy < engine.mapSize; wy++) {
      // Terrain
      let terrainType = engine.terrainMap[wx][wy]
      let tile = new Sprite('terrain_tiles.png', terrainType * tileW, 0, tileW, tileH)
      tile.setPosition(...isometricPos(wx, wy))
      tile.setOrigin(isometricTiles.dx / 2, isometricTiles.dy)
      Graphics.add(tile)

      // Obstacles
      let obstacleType = engine.obstacleMap[wx][wy]
      if (obstacleType) {
        let obstacle = new Sprite('obstacle_tiles.png', obstacleType * tileW, 0, tileW, obstacleHeight)
        obstacle.setPosition(...isometricPos(wx, wy))
        obstacle.setOrigin(isometricTiles.dx / 2, obstacleHeight)
        obstacle.z += 1e3
        Graphics.add(obstacle)
      }
    }
  }
}
