var mqtt = require('mqtt')
var config = require('./config')
var handler = require('./handler')
var client = mqtt.connect(config.mqttServer, {
  keepalive: 0,
  debug: false
})

client.on('connect', function () {
  // TODO: set a flag for connection status and don't subscribe/publish unless connected
  config.updateConfig()
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
    // TODO: move this functionality to a handler, should be the same as controller messages (i.e. with message paths)
    // handle special channels to get and set config

    var resp=handler.getHandler(topic).handleMessage(topic, message)

    if(resp){
      if(resp.topic){
        //send a message
        client.publish(resp.topic,JSON.stringify(resp.message))
      }
    }
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

