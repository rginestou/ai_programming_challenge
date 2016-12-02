const FastSimplexNoise = require('fast-simplex-noise')
const Tree = require('../element/tree')
const Fountain = require('../element/fountain')
const Building = require('../abstract/building')
const config = require('../config')

const sq = x => x * x

function initMap (size, map, value) {
	for (let x = 0; x < size; x++) {
		map[x] = []
		for (let y = 0; y < size; y++) map[x][y] = value
	}
}

function fillMap (size, map, fn) {
	for (let x = 0; x < size; x++) {
		for (let y = 0; y < size; y++) {
			map[x][y] = fn(x, y, map[x][y]) || map[x][y]
		}
	}
}

function interpolate (A, B, C, t) {
	return {
		x: sq(1 - t) * A.x + 2 * t * (1 - t) * B.x + sq(t) * C.x,
		y: sq(1 - t) * A.y + 2 * t * (1 - t) * B.y + sq(t) * C.y
	}
}

function isWaterNearby (map, x, y, size, sandId) {
	if (x > 0 && map[x - 1][y] < sandId) return true
	if (y > 0 && map[x][y - 1] < sandId) return true
	if (y < size - 1 && map[x][y + 1] < sandId) return true
	if (x < size - 1 && map[x + 1][y] < sandId) return true
	return false
}

module.exports = function generate (options = {}) {
	let terrain = []
	let elements = []

	const opt = Object.assign(config.mapGen, options)
	const baseNoiseGen = new FastSimplexNoise({
		frequency: 2.0, octaves: 6,
		max: (1 - opt.detailWeight) * opt.tilesSpectrum,
		min: opt.detailWeight * opt.tilesSpectrum
	})
		const detailNoiseGen = new FastSimplexNoise({
		frequency: 2.0, octaves: 3,
		max: opt.detailWeight * opt.tilesSpectrum,
		min: -opt.detailWeight * opt.tilesSpectrum
	})
	const rainNoiseGen = new FastSimplexNoise({
		frequency: 2.0, octaves: 1,
		max: 1, min: 0
	})

	// Init empty map
	initMap(opt.mapSize, terrain, 0)
	initMap(opt.mapSize, elements, null)

	// Base landscape
	fillMap(opt.mapSize, terrain, (x, y) => {
		return Math.floor(baseNoiseGen.scaled2D(x / opt.baseZoomLevel, y / opt.baseZoomLevel)) +
			Math.floor(detailNoiseGen.scaled2D(x / opt.detailZoomLevel, y / opt.detailZoomLevel))
	})
	fillMap(opt.mapSize, elements, (x, y) => {
		if (
			terrain[x][y] < 14 && terrain[x][y] > 8 &&
			rainNoiseGen.scaled2D(x / opt.rainZoomLevel, y / opt.rainZoomLevel) > opt.treeRainLevel
		) {
			return new Tree(x, y, Math.floor(Math.random() * 3))
		}
	})

	// Refinements
	fillMap(opt.mapSize, terrain, (x, y, val) => {
		if (val >= opt.sandId && isWaterNearby(terrain, x, y, opt.mapSize, opt.sandId)) {
			return opt.sandId
		}
	})

	// The road
	let startingPoint = { x: Math.floor(opt.mapSize * (1 + 2 * Math.random()) * 0.25), y: 0 }
	let endPoint = { x: Math.floor(opt.mapSize * (1 + Math.random()) * 0.25), y: opt.mapSize - 1 }
	let p1 = { x: startingPoint.x + Math.floor((endPoint.x - startingPoint.x) * (2 * Math.random() - 0.5)), y: Math.floor(opt.mapSize * Math.random()) }
	let p2 = { x: startingPoint.x + Math.floor((endPoint.x - startingPoint.x) * (2 * Math.random() - 0.5)), y: Math.floor(opt.mapSize * Math.random()) }
	if (p1.y > p2.y) { let temp = p2; p2 = p1; p1 = temp }
	let p3 = { x: Math.floor((p1.x + p2.x) / 2), y: Math.floor((p1.y + p2.y) / 2) }

	let N = opt.mapSize * opt.mapSize
	for (let k = 0; k < N; k++) {
		let P = interpolate(startingPoint, p1, p3, k / N)
		let Q = interpolate(endPoint, p2, p3, k / N)
		let px = Math.floor(P.x); let py = Math.floor(P.y)
		let qx = Math.floor(Q.x); let qy = Math.floor(Q.y)
		terrain[px][py] = 15
		terrain[qx][qy] = 15
		elements[px][py] = null
		elements[qx][qy] = null
  }

	// The fountains
	function addFountain (x, y) {
		for (let dx = -opt.fountainRadius; dx <= opt.fountainRadius; dx++) {
			for (let dy = -opt.fountainRadius; dy <= opt.fountainRadius; dy++) {
				if (sq(dx) + sq(dy) > sq(opt.fountainRadius)) continue
				elements[x + dx][y + dy] = null
				terrain[x + dx][y + dy] = 16
			}
		}
		elements[x][y] = new Fountain(x, y)
	}

	let off = Math.max(Math.floor(opt.mapSize / 6), opt.fountainRadius)
	addFountain(off, off)
	addFountain(off, opt.mapSize - off - 1)
	addFountain(opt.mapSize - off - 1, off)
	addFountain(opt.mapSize - off - 1, opt.mapSize - off - 1)
	addFountain(Math.floor(opt.mapSize / 2), Math.floor(opt.mapSize / 2))

	return [ terrain, elements ]
}
