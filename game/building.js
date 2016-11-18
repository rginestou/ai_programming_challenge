const GameElement = require('./element')
const data = require('../data/buildings.json')

// ====================================================
//  > GameBuilding
// ----------------------------------------------------
// 	Class for buildings
// ====================================================
module.exports = class GameBuilding extends GameElement {

	// > constructor (GameTeam team, id, x, y)
	constructor (team, id, x, y) {
		super(id, x, y)
		this.team = team
		// Read data
		this.name = data[id].name
		this.size = data[id].size
		// Add to team
		if (team) team.elements.push(this)
	}

	// > jsonify ()
	//		return an object that can be given
	// to the AI or the renderer
	jsonify () {
		return Object.assign(
			super.jsonify(),
			{ type: 'building' }
		)
	}
}
