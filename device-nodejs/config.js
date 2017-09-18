var base64 = require('file-base64')
var handler = require('./handler')
var fs = require('fs')
//NOTE: need this up here to set some config details (e.g. device id and mqtt address)

/*
Start-up:
 1 - read config file
 2 - set device ID
 3 - check if I'm a broker
 4.a - if I am, create a list of brokers with just localhost in it
 4.b - if I'm not, create list of MQTT brokers
 5 - create list of subscriptions and handlers (need to tidy up current stuff)
 6 - Do I have sensors?
 7 - Do I have controllers?
 8 - Am I an aggregator?
 9 - Am I a coordinator


Re-load config:
1 - validate new configuration
  -- Make sure the required data is included
2 - remove subscriptions, handlers etc.
3 - run start-up 

*/
this.myConfig={};
var mqtt = require('./MQTT')
this.roles = []
this.subscriptions = []
this.isThing = false
this.isAggregator = false
this.isBroker = false

function validateConfig(conf){
  //Validate the supplied config and return true if it's OK
  return true;
}
function saveConfig(conf){
  if(validateConfig(conf)){
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
        //    console.log(err)
          }
     //     console.log('file written to ' + location);
          this.setConfig(conf);
        });
      }
    })
  }
}

this.loadConfig=function(){
  //load the config from file and assign to config
  var confTemp=require('./config.json');
  if(validateConfig(confTemp)){
    this.setConfig(confTemp);
  }
}
this.setConfig=function(conf){
  this.myConfig=conf;
  this.updateConfig(conf);
}

this.updateConfig = function (conf) {
 // console.log(this.myConfig);
this.controllerCommands = []
  //TODO: [x]need to include a mechanism to pass handler files to the device
  //TODO: [x]need to double-check the logic- _CFG_Set has to run twice before the device_id will change
  if (conf) {
  //  console.log("got new config")
    //TODO: sanity check the config before writing to disk
    //TODO: look at importin npm packages if needed, also look to remove unused packages 
    this.myConfig = conf
  }
 // console.log(this.myConfig.device_id)
  this.device_id = this.myConfig.device_id
  this.sensors = this.myConfig.thing.sensors
  this.device_id = this.myConfig.device_id
  this.controllers = this.myConfig.thing.controllers
  this.aggregators = this.myConfig.aggregators
  this.brokers = this.myConfig.brokers
  this.brokerFrom = this.myConfig.brokerFrom
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
  if (this.myConfig.thing) {
    this.thing = this.myConfig.thing
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
  if (this.myConfig.aggregators) {
    this.aggregators = this.myConfig.aggregators
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
  if (this.myConfig.brokers) {
    this.brokers = this.myConfig.brokers
    this.isBroker = true
    this.roles['BROKER'] = true
    //TODO: set up local mosca server
    var mosca  =require('mosca');
    var server = new mosca.Server({port:1883});
    server.on('clientConnected',function(client){
    });
    server.on('published',function(packet,client){
    });
    server.on('ready',setup);
    function setup(){
    //  console.log("running local MQTT broker");
    }
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
  fs.writeFile('./curConfig.json',JSON.stringify(this.getConfig()));
}
this.getConfig = function () {
  return JSON.stringify(this.myConfig)
}
var empty = function () {

}
module.exports = {
  loadConfig: this.loadConfig, // read the config from file
  getConfig: this.getConfig, //return the current config
  setConfig: this.setConfig,
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
  brokerFrom: this.brokerFrom, // shouldn't need this
  updateConfig: this.updateConfig
}
