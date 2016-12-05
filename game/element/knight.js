const Unit = require('../abstract/unit')

// ====================================================
//  > Knight
// ----------------------------------------------------
// 	Class for knights
// ====================================================
module.exports = class Knight extends Unit {

	// > constructor (Team team, x, y)
	constructor (team, x, y) {
		super(team, x, y)
		this.sprite = { x: 1 + 4 * team.id, y: 0 }
		this.name = "knight"
	}

}
