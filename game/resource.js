const Element = require('./element')
// const data = require('../data/resource.json')

// ====================================================
//  > Resource
// ----------------------------------------------------
// 	Class for resources (fountains, threes, etc.)
// ====================================================
module.exports = class Resource extends Element {

	// > constructor (id, x, y)
	constructor (id, x, y) {
		super(id, x, y)
		this.sprite.x = 2 * id
	}

	// > jsonify ()
	//		return an object that can be given
	// to the AI or the renderer
	jsonify () {
		return Object.assign(super.jsonify(), { type: 'resource' })
	}

}
