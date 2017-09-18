var mqtt = require('mqtt')
var config = require('./config.json')
var MQTT_ADDR = config.mqttServer
var MQTT_PORT = config.mqttPort
var agg_id = config.aggregator_id
var messaging = []
var msg_handlers = []
var agg_mods = []
var sensors = []
var coordinator_groups = []
var client = mqtt.connect(MQTT_ADDR, {
  keepalive: 0,
  debug: false
})

// refactor this to a list of topics and handlers - on.connect -> subscribe all

// use config.js to create topic list
// use specific classes as handlers - like Thing

for (var i = 0; i < config.publications.length; i++) {}

client.on('connect', function () {
  for (var i = 0; i < config.subscriptions.length; i++) {
    client.subscribe(config.subscriptions[i].channel)
 //   console.log("Subscribed to channel '" + config.subscriptions[i].channel + "' using handler '" + config.subscriptions[i].handler)
    msg_handlers[config.subscriptions[i].handler] = require('./handlers/' + config.subscriptions[i].handler)
    messaging[config.subscriptions[i].channel] = config.subscriptions[i]
  }
//  console.log(msg_handlers)
})

function publish (channel) {
//  console.log("Publishing message on channel '" + channel.channel + "'")
//  console.log(agg_mods)
  client.publish(channel.channel, agg_mods[channel.handler].message(channel))
}

// set up publications
for (var i = 0; i < config.publications.length; i++) {
//  console.log('setting up Sensor ' + config.publications[i].channel)
  agg_mods[config.publications[i].handler] = require('./handlers/' + config.publications[i].handler)
  setInterval(publish, config.publications[i].interval, config.publications[i])
}
client.on('message', function (topic, _message) {
  var message = JSON.parse(_message)
    // refactor this to redirect to the relvat handler for this topic
  if (messaging[topic]) {
    msg_handlers[messaging[topic].handler].parse(_message, messaging[topic])
  }
  if (sensors[topic]) {
    for (var i = 0; i < sensors[topic].length; i++) {
      if (coordinator_groups[sensors[topic][i]].get_min) {
        coordinator_groups[sensors[topic][i]].min = Math.min(coordinator_groups[sensors[topic][i]].min, message.reading)
      }
      if (coordinator_groups[sensors[topic][i]].get_max) {
        coordinator_groups[sensors[topic][i]].max = Math.max(coordinator_groups[sensors[topic][i]].max, message.reading)
      }
      if (coordinator_groups[sensors[topic][i]].get_mean) {
        coordinator_groups[sensors[topic][i]].mean = (coordinator_groups[sensors[topic][i]].mean * coordinator_groups[sensors[topic][i]].count + message.reading) / (coordinator_groups[sensors[topic][i]].count + 1)
      }
      if (coordinator_groups[sensors[topic][i]].get_count) {
        coordinator_groups[sensors[topic][i]].count++
      }
    }
  }
})
