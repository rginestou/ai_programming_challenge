const Unit = require('../abstract/unit')

// ====================================================
//  > Archer
// ----------------------------------------------------
// 	Class for archers
// ====================================================
module.exports = class Archer extends Unit {

	// > constructor (Team team, x, y)
	constructor (team, x, y) {
		super(team, x, y)
		this.sprite = { x: 0 + 4 * team.id, y: 1 }
		this.name = "archer"
	}

}
