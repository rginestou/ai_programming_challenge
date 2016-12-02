const Resource = require('../abstract/resource')

// ====================================================
//  > Tree
// ----------------------------------------------------
// 	Class for trees
// ====================================================
module.exports = class Tree extends Resource {

	// > constructor (x, y)
	constructor (x, y, version) {
		super(x, y)
		this.sprite = { x: version, y: 0 }
	}

}
