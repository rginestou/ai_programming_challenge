/* global Graphics, Sprite, engine */

const Isometric = {
  tiles: { dx: 64, dy: 32, dz: 16 },
  pos (wx, wy) {
    return [
      (wx - wy) * Isometric.tiles.dx / 2,
      -(wy + wx) * Isometric.tiles.dy / 2,
      -(wy + wx)
    ]
  },
  updateSize () {
    this.tiles.width = this.tiles.dx
    this.tiles.height = this.tiles.dy + this.tiles.dz
  }
}
Isometric.updateSize()

const obstacleHeight = 96

function isometricPos (wx, wy) {
  return [
    (wx - wy) * Isometric.tiles.dx / 2,
    -(wy + wx) * Isometric.tiles.dy / 2,
    -(wy + wx)
  ]
}

function displayGame () {
  // Set origin
  Graphics.ox = Graphics.width / 2
  Graphics.oy = Graphics.height - Isometric.tiles.dz * 2

  // Set scaling
  if (engine.mapSize * Isometric.tiles.dx > Graphics.width * 0.9) {
    Graphics.scale = (Graphics.width * 0.9) / (engine.mapSize * Isometric.tiles.dx)
  }

  // Render
  const tileW = Isometric.tiles.width
  const tileH = Isometric.tiles.height
  for (let wx = 0; wx < engine.mapSize; wx++) {
    for (let wy = 0; wy < engine.mapSize; wy++) {
      // Terrain
      let terrainType = engine.terrainMap[wx][wy]
      let tile = new Sprite('terrain_tiles.png', terrainType * tileW, 0, tileW, tileH)
      tile.setPosition(...isometricPos(wx, wy))
      tile.setOrigin(Isometric.tiles.dx / 2, Isometric.tiles.dy)
      Graphics.add(tile)

      // Obstacles
      let obstacleType = engine.obstacleMap[wx][wy]
      if (obstacleType) {
        let obstacle = new Sprite('obstacle_tiles.png', obstacleType * tileW, 0, tileW, obstacleHeight)
        obstacle.setPosition(...isometricPos(wx, wy))
        obstacle.setOrigin(Isometric.tiles.dx / 2, obstacleHeight)
        obstacle.z += 1e3
        Graphics.add(obstacle)
      }

      // TODO: Units & Buildings
    }
  }
}
