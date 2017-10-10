var config = require('./config')
var mqtt = require('mqtt')
var MQTT_ADDR = config.mqttServer
var MQTT_PORT = 1883
var messaging = require('./topic')
var handlers={}

// connect to MQTT server
var client = mqtt.connect(MQTT_ADDR, {
  keepalive: 0,
  debug: false
})
for (var i = 0; i < config.mqttTopic.length; i = i + 1) {
  messaging(client,config.mqttTopic[i])
}