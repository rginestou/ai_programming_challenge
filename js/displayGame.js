/* global Graphics, Sprite, engine */

const Isometric = {
  tiles: { dx: 64, dy: 32, dz: 16 },
  position (wx, wy) {
    return [
      (wx - wy) * this.tiles.dx / 2,
      -(wy + wx) * this.tiles.dy / 2,
      -(wy + wx)
    ]
  }
}

Isometric.tiles.width = Isometric.tiles.dx
Isometric.tiles.height = Isometric.tiles.dy + Isometric.tiles.dz

function displayGame () {
  // Set origin
  Graphics.ox = Graphics.width / 2
  Graphics.oy = Graphics.height - Isometric.tiles.dz * 2

  // Set scaling
  if (engine.mapSize * Isometric.tiles.dx > Graphics.width * 0.9) {
    Graphics.scale = (Graphics.width * 0.9) / (engine.mapSize * Isometric.tiles.dx)
  }

  // Render terrain
  for (let wx = 0; wx < engine.mapSize; wx++) {
    for (let wy = 0; wy < engine.mapSize; wy++) {
      let terrainType = engine.terrainMap[wx][wy]
      let tile = new Sprite('terrain_tiles.png', terrainType * Isometric.tiles.width, 0, Isometric.tiles.width, Isometric.tiles.height)
      tile.setPosition(...Isometric.position(wx, wy))
      tile.setOrigin(Isometric.tiles.dx / 2, Isometric.tiles.dy)
      Graphics.add(tile)
    }
  }

  // Render objects
  for (let gameObject of engine.gameObjects) {
    gameObject.setupSprite()
    Graphics.add(gameObject.sprite)
  }
}
