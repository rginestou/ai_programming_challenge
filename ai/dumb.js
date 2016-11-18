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
        params: { value: Math.random() }
      }
    ]
  }

}
