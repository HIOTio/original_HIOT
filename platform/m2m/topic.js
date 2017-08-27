var mqtt = require('mqtt')
var db = require('./db')

module.exports = function (address, port, topic, M_object) {
  var DBObject = M_object
  var MQTT_TOPIC = topic
  var MQTT_ADDR = address
  var MQTT_PORT = port

  var client = mqtt.connect(MQTT_ADDR, {
    keepalive: 0,
    debug: false
  })
  client.on('connect', function () {
    console.log('Subscribed to - ' + MQTT_TOPIC)
    client.subscribe(MQTT_TOPIC)
  })
  client.on('message', function (topic, message) {
    DBObject.create(JSON.parse(message.toString()), function (err, readings) {
      console.log("received message on topic '" + topic.toString() + "'")
      if (err) {
                // need to raise an event on the platform
        console.log(err)
      } else {

      }
    })
  })
  client.on('error', function (err) {
    console.log(err)
  })
}
