const Barrack = require('../element/barrack')

module.exports = {
	// > isWithin (...)
	//		Return if the target is at a maximum distance of r
	//		of the given coordinates.
	//		Computed as a 'circle'
	isWithinRadius (r, pos, target) {
		return (abs(pos.x - target.x) + abs(pos.y - target.y) <= r)
	},

	// > isAreaClear (...)
	// 		Return if the specified area has no elements inside,
	// 		or has no water
	isAreaClear (x, y, dx, dy, terrain, elements) {
		for (var i = x; i < x + dx; i++) {
			for (var j = y; j < y + dy; j++) {
				// Is there water ?
				if (terrain[i][j] < 5) {
					return false
				}
				// Is there something ?
				if (elements[i][j]) {
					return false
				}
			}
		}
		return true
	},

	// > isNearBarracks (...)
	// 		Return if the given position is right next to a barrack
	isNearBarracks (team, x, y) {
		let pos, size

		for (let i = 0; i < team.elements.size(); i++) {
			if (team.elements[i] instanceof Barrack) {
				// Look around
				pos = team.elements[i].pos
				size = team.elements[i].size
				if (((x == pos.x - 1 || x == pos.x + size) &&
						(y >= pos.y && y < pos.y + size)) ||
					((y == pos.y - 1 || y == pos.y + size) &&
						(x >= pos.x && x < pos.x + size))) {
					return true
				}
			}
		}
		return false
	}
}
