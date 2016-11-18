const GameElement = require('./element')
// const data = require('../data/obstacles.json')

module.exports = class GameObstacle extends GameElement {

	constructor (id, x, y) {
		super(id, x, y)
		this.sprite.x = 2 * id
	}

	jsonify () {
		return Object.assign(super.jsonify(), { type: 'obstacle' })
	}

}
