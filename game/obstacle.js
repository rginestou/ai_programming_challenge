const GameElement = require('./element')
// const data = require('../data/obstacles.json')

// ====================================================
//  > GameObstacle
// ----------------------------------------------------
// 	Class for neutral props (rocks, threes, etc.)
// ====================================================
module.exports = class GameObstacle extends GameElement {

	// > constructor (id, x, y)
	constructor (id, x, y) {
		super(id, x, y)
		this.sprite.x = 2 * id
	}

	// > jsonify ()
	//		return an object that can be given
	// to the AI or the renderer
	jsonify () {
		return Object.assign(super.jsonify(), { type: 'obstacle' })
	}

}
