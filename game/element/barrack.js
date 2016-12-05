const Building = require('../abstract/building')

// ====================================================
//  > Barracks
// ----------------------------------------------------
// 	Class for barracks
// ====================================================
module.exports = class Barrack extends Building {

	// > constructor (Team team, x, y)
	constructor (team, x, y) {
		super(team, x, y)
		this.size = 2
		this.sprite = { x: 2 * (1 + team.id), y: 1 }
		this.name = "barrack"
	}

}
