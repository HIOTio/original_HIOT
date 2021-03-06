const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')
const app = express()

const config = require('./config')
const api = require('./api')


app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(express.static(path.join(__dirname, 'dist')))

app.use('/api', api)

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
})

const port = process.env.PORT || '3000'

const server = http.createServer(app)

server.listen(port, function (){
//    console.log("Standalone running")
})
