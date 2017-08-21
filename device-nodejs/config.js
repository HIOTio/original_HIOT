var config_json = require('./config.json');
var fs = require('fs');
var mqtt = require('./MQTT');
this.roles = [];
this.device_id = config_json.device_id;
this.handlers = [];
this.subscriptions = [];
this.isThing = false;
this.isAggregator = false;
this.isBroker = false;
this.sensors = config_json.thing.sensors;
this.controllers = config_json.thing.controllers;
this.aggregators = config_json.aggregators;
this.brokers = config_json.brokers;
this.broker_from = config_json.broker_from;
this.thing = config_json.thing;
this.mqttServer = config_json.mqttServer;

function addHandler(index, file, poll, object) {
    //check if the file exists before creating the handler
    fs.stat(file + '.js', function (err, stat) {
        if (err == null) {
            console.log(this.handlers);
            handlers[index] = require(file);
            if (poll) {
                console.log("setting up polling interval");
                setInterval(mqtt.publish, object.poll, object);
            }
        } else {
            // need to broadcast a message to the coordinator/broker to send on complete config and files
            console.log(err);
        }
    })
}
this.updateConfig = function () {
    //file was updated, just re-read it
    this.sensors = config_json.thing.sensors;
    this.device_id = config_json.device_id;
    this.controllers = config_json.thing.controllers;
    this.aggregators = config_json.aggregators;
    this.brokers = config_json.brokers;
    this.broker_from = config_json.broker_from;
    console.log(this.subscriptions);
    for (var ind in this.subscriptions) {
        var index = ind;

        delete this.subscriptions[index];
        console.log("unsubscribing from " + index);
        unsub(index);
    }

    // add two special channels to get and set configuration
    console.log(this.subscriptions);
    this.subscriptions["_CFG_Set" + this.device_id] = '';
    this.subscriptions["_CFG_Get" + this.device_id] = '';

    this.subscriptions["admin_" + this.device_id] = "admin_" + this.device_id;

    //add handler for admin channel
    handlers = [];
    addHandler("admin_" + this.device_id, './handlers/device/admin', null, null);

    // clear any previously assigned roles
    this.roles = [];
    if (this.thing) {
        this.isThing = true;
        this.sensors = this.thing.sensors;
        this.controllers = this.thing.controllers;
        this.roles.push("THING");
    } else {
        this.isThing = false;
    }
    if (this.aggregators) {
        this.isAggregator = true;
        this.roles.push("AGGREGATOR");
    } else {
        this.isAggregator = false;
    }
    if (this.brokers) {
        this.isBroker = true;
        this.roles.push("BROKER");
    } else {
        this.isBroker = false;
    }


    //Set up publications for sensors
    for (var i = 0; i < this.sensors.length; i++) {
        console.log("setting up Sensor " + this.sensors[i].id);
        addHandler(this.sensors[i].handler, './handlers/' + this.sensors[i].handler, this.sensors[i].poll, this.sensors[i]);
        //moved this into the addHandler function to ensure it executes in sequence
        //setInterval(publish, sensors[i].poll, sensors[i]);
    };
    // set up subscriptions for controllers
    for (var i = 0; i < this.controllers.length; i++) {
        addHandler(this.controllers[i].handler, './handlers/' + this.controllers[i].handler, null, null);
        this.subscriptions["ctrl_" + this.controllers[i].controller_channel] = this.controllers[i].handler;


    }
    //add handlers etc. for aggregators & brokers
    for (var i = 0; i < this.aggregators.length; i++) {
        console.log("setting up Aggregator " + this.aggregators[i].agg_id);
        addHandler(this.aggregators[i].handler, './handlers/' + this.aggregators[i].handler, this.aggregators[i].poll, this.aggregators[i]);
        //bit more work to be done here - need to subscribe to and collate all the relevant sensor messages

        //moved this into the addHandler function to ensure it executes in sequence
        //setInterval(publish, aggregators[i].poll, aggregators[i]);
    }
    for (var i = 0; i < this.brokers.length; i++) {
        console.log("setting up Broker " + this.brokers[i].broker);
        addHandler(this.brokers[i].handler, './handlers/' + this.brokers[i].handler, null, null);
        //bit more work to be done here - need to subscribe to commands and forward to relevant device


        this.subscriptions["broker_" + this.brokers[i].channel] = this.brokers[i].handler;

    }

    //add all of the subscribed channels/topics
    for (var index in this.subscriptions) {
        console.log("subscribing to '" + index + "'");
        mqtt.subscribe(index);
    }

}
this.getConfig = function () {
    return JSON.stringify(this);
}
this.getHandler = function (channel) {
    return handlers[channel];
}
module.exports = {
    getHandler: this.getHandler,
    mqttServer: this.mqttServer,
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
    brokers: this.brokers = config_json.brokers,
    broker_from: this.broker_from,

    updateConfig: this.updateConfig
};
