/* global Isometric, Sprite */

class gameObjects {
  constructor (id, x, y) {
    this.id = id
    this.x = x
    this.y = y
    this.size = 1
    this.sprite = null
    this.owner = 0 // neutral
  }

  setupSprite (src, x, y, w, h, ox, oy) {
    this.sprite = new Sprite(src, x, y, w, h)
    this.sprite.setPosition(...Isometric.position(this.x, this.y))
    this.sprite.setOrigin(ox, oy)
    this.sprite.z += 1e3
  }
}

class Obstacle extends gameObjects {
  constructor (id, x, y) {
    super(id, x, y)
  }

  setupSprite () {
    let h = 96
    let w = Isometric.tiles.width
    super.setupSprite('obstacle_tiles.png', this.id * w, 0, w, h, w / 2, h)
  }
}

class Building extends gameObjects {
  constructor (id, x, y) {
    super(id, x, y)
    if (id > 8) this.size = 2 // 2x2 square
  }

  setupSprite () {
    let h = 96
    let w = this.size * Isometric.tiles.width
    super.setupSprite('buildings.png', (this.id - 1) * w, (this.size - 1) * h, w, h, w / 2, h)
  }
}
