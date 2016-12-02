const Building = require('../abstract/building')

// ====================================================
//  > Barracks
// ----------------------------------------------------
// 	Class for barracks
// ====================================================
module.exports = class Barracks extends Building {

	// > constructor (Team team, x, y)
	constructor (team, x, y) {
		super(team, x, y)
		this.sprite = { x: 1, y: 0 }
	}

}
