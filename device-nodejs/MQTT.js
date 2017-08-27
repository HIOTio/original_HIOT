var mqtt = require('mqtt')
var config = require('./config')
var handler = require('./handler')
var client = mqtt.connect(config.mqttServer, {
  keepalive: 0,
  debug: false
})

client.on('connect', function () {
  console.log('connected')
  console.log(config)
  // reconfig
  config.updateConfig()
  console.log('configured')
})
client.on('disconnect', function () {
  // need to handle this issue somehow
})
client.on('error', function (err) {
  // need to handle this somehow...
  console.log(err)
})

client.on('message', function (topic, _message) {
  // get the JSON representation of the message
  console.log('got message on topic' + topic)
  try {
    var message = JSON.parse(_message.toString())
    // handle special channels to get and set config
    if (topic.startsWith('_CFG_')) {
      if (topic.startsWith('_CFG_Set')) {
        // need to set the config
        // TODO: need to tidy this up a LOT
     //   this.unsub(config.subscriptions)
        config.updateConfig(message.config)
      } else if (topic.startsWith('_CFG_Get')) {
        // TODO: add security (basic white/black listing) eventually...
        console.log('I was asked for my config')
        // need to return the config to the calling channel
        console.log(message.caller)
        console.log(config.getConfig())
        client.publish(message.caller, config.getConfig())
      } else {
        // add exception handling here...
      }
      return
    }
    handler.getHandler(config.subscriptions[topic]).handleMessage(topic, message)
  } catch (err) {
    console.log(err)
  }
})

this.unsub = function (topic) {
  client.unsubscribe(topic, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('unsubscribed from ' + topic)
    }
  })
}
module.exports = {
  subscribe: function (channel) {
    // TODO: make sur we're connected
    client.subscribe(channel)
  },
  publish: function (channel) {
    var message = handler.getHandler(channel.handler).poll(channel)
    console.log('Channel: ' + channel.channel + ' message ' + message)
    client.publish(channel.channel, message)
  },
  unsub: this.unsub

}
