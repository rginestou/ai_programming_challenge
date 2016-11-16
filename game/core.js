module.exports = class GameCore {
  constructor () {
    this.winner = null
    this.done = false
    this.state = {
      scores: [0, 0],
      values: [0, 0],
      turn: 0
    }
  }

  getState () {
    return this.state
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
    if (this.state.turn > 10) {
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
