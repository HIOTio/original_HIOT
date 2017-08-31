var mqtt = require('mqtt')
var config = require('./config')


var client = mqtt.connect(config.mqttServer, {
  keepalive: 0,
  debug: false
})

client.on('connect', function () {
    
})
client.on('disconnect', function () {
  //TODO: need to handle MQTT disconnect
})
client.on('error', function (err) {
  //TODO: need to handle MQTT errors
  console.log(err)
})

client.on('message', function (topic, _message) {
  try {
    var message = JSON.parse(_message.toString())

    
  } catch (err) {
    console.log(err)
  }
})

this.unsub = function (topic) {
  client.unsubscribe(topic, function (err) {
    if (err) {
      console.log(err)
    }
  })
}
module.exports = {
  subscribe: function (channel) {
    // TODO: make sure we're connected
    client.subscribe(channel)
  },
  publish_poll: function (channel) {
    // TODO: need to figure out why this is firing twice for each sensor
    var message = handler.getHandler(channel.handler).poll(channel)
    client.publish(channel.channel, message)
  },
    publish: function (channel,message) {
    client.publish(channel, message)
  },
  unsub: this.unsub

}

