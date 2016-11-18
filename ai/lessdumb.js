module.exports = {
  playerId: -1,

  init (playerId, state) {
    this.playerId = playerId
  },

  // gameState -> actions array
  getActions (state) {
    return [
      {
        type: 'play',
        params: { value: 2 * state.values[1 - this.playerId] }
      }
    ]
  }

}
