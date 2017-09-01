var base64 = require('file-base64')
var handler = require('./handler')
var fs = require('fs')
//NOTE: need this up here to set some config details (e.g. device id and mqtt address)
var config = require('./config.json')
var mqtt = require('./MQTT')
this.roles = []
this.subscriptions = []
this.isThing = false
this.isAggregator = false
this.isBroker = false

this.updateConfig = function (configOut) {
this.controllerCommands = []
  //TODO: [x]need to include a mechanism to pass handler files to the device
  //TODO: [x]need to double-check the logic- _CFG_Set has to run twice before the device_id will change
  if (!configOut) {
    config = require('./config.json')
  } else {
    console.log("got new config")
    config = configOut
    fs.writeFile('./config.json', JSON.stringify(config), function (err) {
      if (err) {
        return
      }
      //TODO: do some validation etc. here - significant security risk as anyone can push any file to any device as it currently stands
      //NOTE: passing files from config, structure config.files=[{location:'',file:''}]
      for (var a = 0; a < config.files.length; a++) {
        var location ='./handlers/' + config.files[a].location;
        base64.decode(config.files[a].file,  location, function (err, output) {
          if(err){
            console.log(err)
          }
          console.log('file written to ' + location);
        });
      }
    })
  }
  console.log(config.device_id)
  this.device_id = config.device_id
  this.sensors = config.thing.sensors
  this.device_id = config.device_id
  this.controllers = config.thing.controllers
  this.aggregators = config.aggregators
  this.brokers = config.brokers
  this.brokerFrom = config.brokerFrom
  // unsubscribe from MQTT topics
  for (var ind in this.subscriptions) {
    var index = ind
    delete this.subscriptions[index]
    mqtt.unsub(index)
  }
  // clear timers for polling
  handler.clearHandlers()
  // add two special channels to get and set configuration
  this.subscriptions['_CFG_Set' + this.device_id] = './handlers/config'
  handler.addHandler('_CFG_Set' + this.device_id, './handlers/config', null, null)
  this.subscriptions['_CFG_Get' + this.device_id] = './handlersr/config'
  handler.addHandler('_CFG_Get' + this.device_id, './handlers/config', null, null)
  this.subscriptions['admin_' + this.device_id] = 'admin_' + this.device_id
  handler.addHandler('admin_' + this.device_id, './handlers/device/admin', null, null)
  // clear any previously assigned roles
  this.roles = []
  if (config.thing) {
    this.thing = config.thing
    this.isThing = true
    this.sensors = this.thing.sensors
    this.controllers = this.thing.controllers
    this.roles.push('THING')
    for (var i = 0; i < this.thing.sensors.length; i++) {
      handler.addHandler(this.sensors[i].handler, './handlers/' + this.sensors[i].handler, this.sensors[i].poll, this.sensors[i])
      // moved this into the addHandler function to ensure it executes in sequence
      // setInterval(publish, sensors[i].poll, sensors[i]);
    }
    // set up subscriptions for controllers
    for (i = 0; i < this.controllers.length; i++) {
      handler.addHandler(this.controllers[i].controller_channel, './handlers/' + this.controllers[i].handler, null, null)
      //FUTURE: need to tidy this up and combine the handler and the config
      this.controllerCommands[this.controllers[i].controller_channel] = this.controllers[i].commands
      this.subscriptions[this.controllers[i].controller_channel] = this.controllers[i].handler
    }
  } else {
    this.isThing = false
  }
  if (config.aggregators) {
    this.aggregators = config.aggregators
    this.isAggregator = true
    this.roles['AGGREGATOR'] = true
    for (i = 0; i < this.aggregators.length; i++) {
      handler.addHandler(this.aggregators[i].handler, './handlers/' + this.aggregators[i].handler, this.aggregators[i].poll, this.aggregators[i])
      // TODO: [x]bit more work to be done here - need to subscribe to and collate all the relevant sensor messages
      for (var j = 0; j < this.aggregators[i].topics.length; j++) {
        // subscribe to the topic
        handler.addHandler(this.aggregators[i].topics[j], './handlers/' + this.aggregators[i].handler, null, {
          isAggTopic: true
        })
        this.subscriptions[this.aggregators[i].topics[j]] = this.aggregators[i].handler
      }
    }
  } else {
    this.isAggregator = false
  }
  if (config.brokers) {
    this.brokers = config.brokers
    this.isBroker = true
    this.roles['BROKER'] = true
    for (i = 0; i < this.brokers.length; i++) {
      handler.addHandler(this.brokers[i].channel, './handlers/' + this.brokers[i].handler, null, null)
      this.subscriptions[this.brokers[i].channel] = this.brokers[i].handler
    }
  } else {
    this.isBroker = false
  }
  // add all of the subscribed channels/topics
  for (index in this.subscriptions) {
    mqtt.subscribe(index)
  }
}
this.getConfig = function () {
  return JSON.stringify(this)
}
var empty = function () {

}
module.exports = {
  getConfig: this.getConfig,
  roles: this.roles,
  handlers: this.handlers,
  subscriptions: this.subscriptions,
  isTing: this.isThing,
  isAggregator: this.isAggregator,
  isBroker: this.isBroker,
  sensors: this.sensors,
  controllers: this.controllers,
  aggregators: this.aggregators,
  thing: this.thing,
  brokers: this.brokers,
  brokerFrom: this.brokerFrom,

  updateConfig: this.updateConfig
}
