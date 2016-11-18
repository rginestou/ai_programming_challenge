const GameElement = require('./element')
const data = require('../data/buildings.json')

module.exports = class GameUnit extends GameElement {
	constructor (team, id, x, y) {
		super(id, x, y)
		this.team = team
		// Read data
		this.name = data[id].name
		this.size = data[id].size
		// Add to team
		if (team) team.elements.push(this)
	}

	jsonify () {
		return Object.assign(
			super.jsonify(),
			{ type: 'building' }
		)
	}
}
