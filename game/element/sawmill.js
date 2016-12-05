const Building = require('../abstract/building')

// ====================================================
//  > LumberMill
// ----------------------------------------------------
// 	Class for sawmills
// ====================================================
module.exports = class Sawmill extends Building {

	// > constructor (Team team, x, y)
	constructor (team, x, y) {
		super(team, x, y)
		this.size = 2
		this.sprite = { x: 0, y: 1 }
		this.name = "sawmill"
	}

}
