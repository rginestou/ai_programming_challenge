const GameElement = require('./element')
// const data = require('../data/obstacles.json')

module.exports = class GameObstacle extends GameElement {

  constructor (team, id, x, y) {
    super(id, x, y)
  }

  jsonify () {
    return Object.assign(super.jsonify(), { type: 'obstacle' })
  }

}
