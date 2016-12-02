const Element = require('./element')

// ====================================================
//  > Resource
// ----------------------------------------------------
// 	Class for resources (fountains, threes, etc.)
// ====================================================
module.exports = class Resource extends Element {

	// > constructor (id, x, y)
	constructor (x, y) {
		super(x, y)
	}

	// > jsonify ()
	//		return an object that can be given
	// to the AI or the renderer
	jsonify () {
		return Object.assign(
			super.jsonify(),
			{ type: 'resource' }
		)
	}

}
