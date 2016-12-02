module.exports = {
	// > isWithin(r, pos, target)
	//	Return if the target is at a maximum distance of r
	//	of the given coordinates.
	//	Computed as a 'circle'
	isWithin(r, pos, target) {
		return (abs(pos.x - target.x) + abs(pos.y - target.y) <= r)
	}
}
