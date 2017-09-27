var mqtt = require('mqtt')
var config=require('./config')
var aggregator = require('./roles/aggregator')
var broker = require('./roles/broker')
var sensor = require('./roles/sensor')
var controller = require('./roles/controller')
var coordinator = require('./roles/coordinator')



// Load config
var _config=config.getConfig()
// configure mosca, if enabled
if(_config.moscaEnabled){
    var mosca  =require('mosca');
    localMqttServer= new mosca.Server({port:_config.moscaPort});
    //FUTURE: monitor status connections and traffic for local MQTT server
}
// set up device messaging - config etc

// Role: Aggregator( aggList, mqttServer) - pass a list of mqttServers so that the aggregator can choose/swith
aggregator.init(_config.roleChannels.aggregator,_config.mqttServers)
// Role: Broker (brokerList, mqttServer)
broker.init(_config.roleChannels.broker,_config.mqttServers)
// Role: Sensor (sensorList,mqttServer)
sensor.init(_config.roleChannels.sensor,_config.mqttServers)
// Role: Controller (controllerList, mqttServer)
controller.init(_config.roleChannels.controller,_config.mqttServers)
// Role: Coordinator (coordinatorConfig,mqttServer)
coordinator.init(_config.mqttServers)