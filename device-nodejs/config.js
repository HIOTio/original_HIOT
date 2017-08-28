
var handler = require('./handler')
var fs = require('fs')
var mqtt = require('./MQTT')
this.roles = []
this.subscriptions = []
this.isThing = false
this.isAggregator = false
this.isBroker = false
var config
this.updateConfig = function (configOut) {
  console.log('Updating device config')
  if (!configOut) {
    config = require('./config.json')
    console.log('reading config')
  } else {
    fs.writeFile('./config.json', JSON.stringify(configOut), function (err) {
      if (err) {
        return
      }
      config = configOut
    })
  }

  this.device_id = config.device_id
  this.sensors = config.thing.sensors
  this.device_id = config.device_id
  this.controllers = config.thing.controllers
  this.aggregators = config.aggregators
  this.brokers = config.brokers
  this.brokerFrom = config.brokerFrom
  console.log(this.subscriptions)
  // unsubscribe from MQTT topics
  for (var ind in this.subscriptions) {
    var index = ind
    delete this.subscriptions[index]
    console.log('unsubscribing from ' + index)
    mqtt.unsub(index)
  }
  // clear timers for polling
  handler.clearHandlers()
  // add two special channels to get and set configuration
  console.log(this.subscriptions)
  this.subscriptions['_CFG_Set' + this.device_id] = ''
  this.subscriptions['_CFG_Get' + this.device_id] = ''
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
      console.log('setting up Sensor ' + this.sensors[i].id)
      handler.addHandler(this.sensors[i].handler, './handlers/' + this.sensors[i].handler, this.sensors[i].poll, this.sensors[i])
      // moved this into the addHandler function to ensure it executes in sequence
      // setInterval(publish, sensors[i].poll, sensors[i]);
    }
    // set up subscriptions for controllers
    for (i = 0; i < this.controllers.length; i++) {
      handler.addHandler(this.controllers[i].handler, './handlers/' + this.controllers[i].handler, null, null)
      this.subscriptions['ctrl_' + this.controllers[i].controller_channel] = this.controllers[i].handler
    }
  } else {
    this.isThing = false
  }
  if (config.aggregators) {
    this.aggregators = config.aggregators
    this.isAggregator = true
    this.roles['AGGREGATOR'] = true
    for (i = 0; i < this.aggregators.length; i++) {
      console.log('setting up Aggregator ' + this.aggregators[i].agg_id)
      handler.addHandler(this.aggregators[i].handler, './handlers/' + this.aggregators[i].handler, this.aggregators[i].poll, this.aggregators[i])
      // TODO: bit more work to be done here - need to subscribe to and collate all the relevant sensor messages
      for (var j = 0; j < this.aggregators[i].topics.length; j++) {
        // subscribe to the topic
        handler.addHandler(this.aggregators[i].topics[j], './handlers/' + this.aggregators[i].handler, null, {
          isAggTopic: true
        })
        this.subscriptions[this.aggregators[i].topics[j]] = this.aggregators[i].handler
        console.log('subscribed to ' + this.aggregators[i].topics[j])
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
      console.log('setting up Broker ' + this.brokers[i].broker)
      handler.addHandler(this.brokers[i].handler, './handlers/' + this.brokers[i].handler, null, null)
      // bit more work to be done here - need to subscribe to commands and forward to relevant device
      this.subscriptions['broker_' + this.brokers[i].channel] = this.brokers[i].handler
    }
  } else {
    this.isBroker = false
  }
  // add all of the subscribed channels/topics
  for (index in this.subscriptions) {
    console.log("subscribing to '" + index + "'")
    mqtt.subscribe(index)
  }
}
this.getConfig = function () {
  return JSON.stringify(this)
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
