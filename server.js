const config = require('./config')

const express = require('express')
const app = express()

app.use(express.static('public'))
app.listen(config.port, () => console.log('App running on port ' + config.port))
