module.exports = {
	// > isWithin (r, pos, target)
	//	Return if the target is at a maximum distance of r
	//	of the given coordinates.
	//	Computed as a 'circle'
	isWithinRadius(r, pos, target) {
		return (abs(pos.x - target.x) + abs(pos.y - target.y) <= r)
	},

	// > isAreaClear ()
	// 	Return if the specified area has no elements inside,
	// 	or has no water
	isAreaClear(x, y, dx, dy, terrain, elements) {
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
	}
}
