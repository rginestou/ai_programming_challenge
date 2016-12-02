const Building = require('../abstract/building')

// ====================================================
//  > LumberMill
// ----------------------------------------------------
// 	Class for lumber-mills
// ====================================================
module.exports = class LumberMill extends Building {

	// > constructor (Team team, x, y)
	constructor (team, x, y) {
		super(team, x, y)
		this.sprite = { x: 0, y: 1 }
	}

}
