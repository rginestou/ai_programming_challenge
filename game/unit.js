const GameElement = require('./element')
const data = require('../data/units.json')

module.exports = class GameUnit extends GameElement {

	constructor (team, id, x, y) {
		super(id, x, y)
		this.team = team
		// Read data
		this.name = data[id].name
		this.life = data[id].life
		this.move = data[id].move
		// Add to team
		if (team) team.elements.push(this)
	}

	jsonify () {
		return Object.assign(
		super.jsonify(),
		{
			type: 'unit',
			life: this.life
		}
	)
	}

}
