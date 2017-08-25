var mqtt = require('mqtt')
var config = require('./config')
var MQTT_ADDR = config.mqttServer
var MQTT_PORT = config.mqttPort
var thing_id = config.aggregator_id
