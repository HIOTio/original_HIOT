var mqtt = require('mqtt')
var ConfigJson = require('./config.json')
var fs = require('fs')

var MQTT_ADDR = ConfigJson.mqttServer
var controllerMods = {}
var sensorMods = {}
var sensors = ConfigJson.sensors
var controllers = ConfigJson.controllers
require('./admin')
var client = mqtt.connect(MQTT_ADDR, {
  keepalive: 0,
  debug: false
})

function subscribe (topic) {
  this.client.on('connect', function () {
  //  console.log('Subscribed to - ' + topic)
    client.subscribe(topic)
  })
  this.client.on('message', function (topic, message) {
 //   console.log('received message on topic \'' + topic.toString() + '\'')
  })

  this.client.on('error', function (err) {
   // console.log(err)
  })
}

function publish (sensor) {
  var channel = sensor.id

  var value = sensorMods[sensor.sensor_type].poll(sensor)
//  console.log('Publishing on channel \'' + channel + '\'')
//  console.log(value)
  client.publish(channel, value)
}

module.exports = {
  updateConfig: function () {
    // need to unsubscribe from any existing topics first
    // also back up existing config and rollback if there are errors

    this.sensors = ConfigJson.sensors
    this.controllers = ConfigJson.controllers
    this.client = mqtt.connect(MQTT_ADDR, {
      keepalive: 0,
      debug: false
    })

    this.client.subscribe('admin_' + ConfigJson.thing_id)
    this.client.subscribe(ConfigJson.broker_id)
    console.log('Subscribed to admin channel admin_' + ConfigJson.thing_id)
    this.client.on('message', function (topic, message) {
    //  console.log('topic = \'' + topic + '\'')
      if (topic == 'admin_' + ConfigJson.thing_id) {
    //    console.log('received admin message \'' + message + '\'')
        fs.writeFile('./config.json', message, function (err) {
          if (err) {
     //       console.log('There has been an error saving your configuration data.')
     //       console.log(err.message)
            return
          }
      //    console.log('Configuration saved successfully.')
          // reload the configuration
          this.updateConfig()
        })
      } else if (topic == ConfigJson.broker_id) {
      //  console.log('got a message from the broker')
      }
    })

    this.client.on('error', function (err) {
    //  console.log(err)
    })

    for (var i = 0; i < sensors.length; i++) {
     // console.log('setting up Sensor ' + sensors[i].id)
      sensorMods[sensors[i].sensor_type] = require('./sensors/' + sensors[i].sensor_type)
      setInterval(publish, sensors[i].poll, sensors[i])
    }
   // console.log(controllers)
    for (var i = 0; i < controllers.length; i++) {
      controllerMods[controllers[i].controller_type] = require('./controllers/' + controllers[i].controller_type)
      this.client.subscribe('ctrl_' + controllers[i].controller_channel)
    }
    return {
      sensors: this.sensors,
      controllers: this.controllers,
      sensorMods: this.sensorMods,
      controllerMods: this.controllerMods,
      client: this.client,
      aggId: this.aggregator_id
    }
  }
}
