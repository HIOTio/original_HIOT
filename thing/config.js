var mqtt = require('mqtt');
var config_json = require('./config.json');
var fs = require('fs');

var MQTT_ADDR = config_json.mqttServer;
var MQTT_PORT = config_json.mqttPort;
var agg_id = config_json.aggregator_id;
var controller_mods = {};
var sensor_mods = {};
var sensors = config_json.sensors;
var controllers = config_json.controllers;
require('./admin');
var client = mqtt.connect(MQTT_ADDR, {
    keepalive: 0,
    debug: false
});



var subscribe = function (topic) {

    this.client.on('connect', function () {
        console.log("Subscribed to - " + topic);
        client.subscribe(topic);
    });
    this.client.on('message', function (topic, message) {
        console.log("received message on topic '" + topic.toString() + "'");

    });

    this.client.on('error', function (err) {
        console.log(err);
    });
}

function publish(sensor) {
    var channel = sensor.id;
    var value = sensor_mods[sensor.sensor_type].poll(sensor.sensor_id);
    console.log("Publishing on channel '" + channel + "'");
    client.publish(channel, value);
}




module.exports = {
    updateConfig: function () {

        // need to unsubscribe from any existing topics first
        //also back up existing config and rollback if there are errors


        this.sensors = config_json.sensors;
        this.controllers = config_json.controllers;
        this.client = mqtt.connect(MQTT_ADDR, {
            keepalive: 0,
            debug: false
        });

        this.client.subscribe("admin_" + config_json.thing_id);
        this.client.subscribe(config_json.broker_id);
        console.log("Subscribed to admin channel admin_" + config_json.thing_id);
        this.client.on('message', function (topic, message) {
            console.log("topic = '" + topic + "'");
            if (topic == "admin_" + config_json.thing_id) {
                console.log("received admin message '" + message + "'");
                fs.writeFile('./config.json', message, function (err) {
                    if (err) {
                        console.log('There has been an error saving your configuration data.');
                        console.log(err.message);
                        return;
                    }
                    console.log('Configuration saved successfully.');
                    //reload the configuration
                    this.updateConfig();

                });
            } else if (topic == config_json.broker_id) {
                console.log("got a message from the broker");
            }
        });

        this.client.on('error', function (err) {
            console.log(err);
        });

        for (var i = 0; i < sensors.length; i++) {
            console.log("setting up Sensor " + sensors[i].id);
            sensor_mods[sensors[i].sensor_type] = require('./sensors/' + sensors[i].sensor_type);
            setInterval(publish, sensors[i].poll, sensors[i]);
        };
        console.log(controllers);
        for (var i = 0; i < controllers.length; i++) {
            controller_mods[controllers[i].controller_type] = require('./controllers/' + controllers[i].controller_type);
            this.client.subscribe("ctrl_" + controllers[i].controller_channel);
        }
        return {
            sensors: this.sensors,
            controllers: this.controllers,
            sensor_mods: this.sensor_mods,
            controller_mods: this.controller_mods,
            client: this.client,
            agg_id: this.aggregator_id
        }
    }
}
