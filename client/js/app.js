/* global Vue, io, Canvas, displayGame */
/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    hasParty: false,
    aiList: [],
    ai1: '', ai2: ''
  },
  mounted () {
    this.socket = io.connect()
    this.socket.on('ai-list', list => (this.aiList = list))
    this.socket.on('start-game', state => {
      this.hasParty = true
      this.$nextTick(() => {
        this.screen = new Canvas('screen')
        displayGame(this.screen, state.mapSize, state.terrain, state.elements)
      })
    })
    this.socket.on('update-game', state => {
      if (!this.screen) return
      this.screen.removeAll()
      displayGame(this.screen, state.mapSize, state.terrain, state.elements)
    })
    this.socket.on('end-game', data => {
      if (!this.screen) return
      console.log(data.winner)
      this.screen.removeAll()
      this.screen = null
      this.hasParty = false
    })
  },
  methods: {
    onSubmit () {
      if (this.ai1 === '' || this.ai2 === '') return
      this.socket.emit('start-game', [this.ai1, this.ai2])
    }
  }
})
