const Resource = require('../abstract/resource')
const config = require('../config')

// ====================================================
//  > Fountain
// ----------------------------------------------------
// 	Class for fountains
// ====================================================
module.exports = class Fountain extends Resource {

	// > constructor (x, y)
	constructor (x, y) {
		super(x, y)
		this.team = null
		this.sprite = { x: 3, y: 0 }
	}

	// > setTeam
	//	Change the current team controling the fountain
	//	and the color of the latter by the way
	setTeam (newTeam) {
		this.team = newTeam
		let shift = 0

		if (newTeam) {
			shift = newTeam.id
		}

		this.sprite = { x: 3 + shift, y: 0 }
	}

	// > addPoints
	//	if a team is in control, add its points
	addPoints () {
		this.team.resource.glory += config.gameConst.gloryPoints
	}
}
