/* global Image, requestAnimationFrame */

const imageCache = {}
for (let src of [
	'terrain_tiles.png',
	'resources_tiles.png',
	'buildings.png'
]) {
	imageCache[src] = new Image()
	imageCache[src].src = 'img/' + src
}

class Sprite {
	constructor (src, x, y, w, h) {
		this.src = src
		this.x = 0
		this.y = 0
		this.z = 0
		this.ox = 0
		this.oy = 0
		this.rect = { x, y, w, h }
	}

	draw (context, Ox, Oy, s = 1) {
		context.drawImage(
			imageCache[this.src],
			this.rect.x, this.rect.y, this.rect.w, this.rect.h,
			Ox + s * (this.x - this.ox), Oy + s * (this.y - this.oy), s * this.rect.w, s * this.rect.h
		)
	}

	setPosition (x, y, z) {
		this.x = x
		this.y = y
		this.z = z
	}

	setOrigin (ox, oy) {
		this.ox = ox
		this.oy = oy
	}
}

class Canvas {
	constructor (canvasId) {
		this.canvas = document.querySelector('canvas#' + canvasId)
		this.context = this.canvas.getContext('2d')
		// Good resizing
		this.context.webkitImageSmoothingEnabled = false
		this.context.mozImageSmoothingEnabled = false
		this.context.msImageSmoothingEnabled = false
		this.context.imageSmoothingEnabled = false
		this.width = this.canvas.width
		this.height = this.canvas.height
		this.sprites = []
		this.scale = 1
		this.ox = 0
		this.oy = 0

		this.update()
	}

	add (sprite, sort = false) {
		this.sprites.push(sprite)
		if (sort) this.sortSprites()
	}

	removeAll () {
		this.sprites = []
	}

	clearCanvas () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}

	draw (sprite) {
		sprite.draw(this.context, this.ox, this.oy, this.scale)
	}

	sortSprites () {
		this.sprites.sort((a, b) => {
			if (a.z > b.z) return 1
			if (a.z < b.z) return -1
			return 0
		})
	}

	drawSprites () {
		for (let sprite of this.sprites) this.draw(sprite)
	}

	refresh () {
		if (!this.context) return
		this.clearCanvas()
		this.drawSprites()
	}

	update () {
		this.refresh()
		requestAnimationFrame(() => this.update())
	}
}
