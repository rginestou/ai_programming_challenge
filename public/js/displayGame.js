/* global Graphics, Sprite */

const Isometric = {
  tiles: { dx: 64, dy: 32, dz: 16 },
  pos (wx, wy) {
    return [
      (wx - wy) * Isometric.tiles.dx / 2,
      (wy + wx) * Isometric.tiles.dy / 2,
      wy + wx
    ]
  },
  updateSize () {
    this.tiles.width = this.tiles.dx
    this.tiles.height = this.tiles.dy + this.tiles.dz
  }
}
Isometric.updateSize()

const spriteConfig = {
  obstacle: { height: 96, name: 'obstacle_tiles.png' },
  building: { height: 96, name: 'buildings.png' }
}

function displayGame (canvas, size, terrain, elements) {
  // Set origin
  canvas.ox = canvas.width / 2
  canvas.oy = canvas.height - size * Isometric.tiles.dy

  // Set scaling
  if (size * Isometric.tiles.dx > canvas.width * 0.9) {
    canvas.scale = (canvas.width * 0.9) / (size * Isometric.tiles.dx)
  }

  // Render
  const tileW = Isometric.tiles.width
  const tileH = Isometric.tiles.height
  for (let wx = 0; wx < size; wx++) {
    for (let wy = 0; wy < size; wy++) {
      // Terrain
      let terrainType = terrain[wx][wy]
      let tile = new Sprite('terrain_tiles.png', terrainType * tileW, 0, tileW, tileH)
      tile.setPosition(...Isometric.pos(wx, wy))
      tile.setOrigin(Isometric.tiles.dx / 2, Isometric.tiles.dy)
      canvas.add(tile)
      // Elements
      let element = elements[wx][wy]
      if (element && element.x === wx && element.y === wy) {
        let sprite = new Sprite(
          spriteConfig[element.type].name,
          element.sprite.x * 32, element.sprite.y * 32, tileW, spriteConfig[element.type].height
        )
        sprite.setPosition(...Isometric.pos(wx, wy))
        sprite.setOrigin(Isometric.tiles.dx / 2, spriteConfig[element.type].height)
        sprite.z += 1e3
        canvas.add(sprite)
      }
    }
  }

}
