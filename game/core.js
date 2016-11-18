const generateMap = require('../utils/mapGenerator')
const config = require('../config')
const GameTeam = require('./team')

module.exports = class GameCore {
  constructor () {
    // Game init
    this.winner = null
    this.done = false

    // Create teams
    this.teams = [ new GameTeam(0), new GameTeam(1) ]

    let [terrain, elements] = generateMap()
    this.terrain = terrain
    this.elements = elements
  }

  getState () {
    return {
      mapSize: config.mapGen.mapSize,
      terrain: this.terrain,
      elements: this.elements.map(a => a.map(b => b ? b.jsonify() : null))
    }
  }

  doAction (playerId, action) {
    switch (action.type) {
      case 'play':
        this.state.values[playerId] = action.params.value
        break
      default:
        console.log('Unknown action:', action)
    }
  }

  update () {
    this.state.turn += 1
    if (this.state.turn > 1e3) {
      this.done = true
      this.winner = (this.state.scores[0] > this.state.scores[1] ? 0 : 1)
    } else {
      if (this.state.values[0] > this.state.values[1]) {
        this.state.scores[0] += 1
      } else {
        this.state.scores[1] += 1
      }
    }
  }

}
