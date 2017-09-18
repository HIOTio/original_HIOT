var mqtt = require('mqtt')
var config = require('./config')
config.updateConfig()
var agg_id = config.aggregator_id
var readings = []

var sensors = config.sensors
var controllers = config.controllers

config.client.on('message', function (topic, _message) {
 // console.log("received message '" + _message + "' on topic '" + topic + "'")
})
