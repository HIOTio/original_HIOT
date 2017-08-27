var express = require('express')
var router = express.Router(); var fs = require('fs')

var fileName = '../config/config.json'
var setFileName = '../nodejs/config/config.json'
var myConfig = require(fileName)

module.exports.get = function (req, res) {
  res.status(200).json({ myConfig })
}
module.exports.set = function (req, res) {
  var file = req.body.myConfig
  fs.writeFile(setFileName, JSON.stringify(file, null, 2), function (err) {
    if (err) return console.log(err)
    console.log(JSON.stringify(file))
    console.log('writing to ' + fileName)
    res.status(200).send('updated')
  })
}
