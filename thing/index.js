var mqtt = require('mqtt');
var config = require('./config.json');
var demo_controller = require('./demo_controller');
var sensor_mods = {
    rand_sensor: require('./rand_sensor')
}

require('./admin');
var MQTT_ADDR = config.mqttServer;
var MQTT_PORT = config.mqttPort;
var agg_id = config.aggregator_id;
var readings = [];

var sensors = config.sensors;
var controllers = config.controllers;
var client = mqtt.connect(MQTT_ADDR, {
    keepalive: 0,
    debug: false
});

var subscribe = function (topic) {

    client.on('connect', function () {
        console.log("Subscribed to - " + topic);
        client.subscribe(topic);
    });
    client.on('message', function (topic, message) {
        console.log("received message on topic '" + topic.toString() + "'");

    });

    client.on('error', function (err) {
        console.log(err);
    });
}

function publish(sensor) {
    var channel = sensor.id;
    var value = sensor_mods[sensor.sensor_type].poll(sensor.sensor_id);
    console.log("Publishing message '" + value + "' on channel '" + channel + "'");
    client.publish(channel, value);
}

client.on("message", function (topic, _message) {
    console.log("received message '" + _message + "' on topic '" + topic + "'");

});
for (var i = 0; i < sensors.length; i++) {
    console.log("setting up Sensor " + sensors[i].id);
    setInterval(publish, sensors[i].poll, sensors[i]);


};
for (var i = 0; i < controllers.length; i++) {

}
