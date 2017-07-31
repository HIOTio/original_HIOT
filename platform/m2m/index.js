var mqtt = require('mqtt');
var config = require('./config');
var MQTT_TOPIC = config.mqttTopic;
var MQTT_ADDR = config.mqttServer;
var MQTT_PORT = 1883;

var client = mqtt.connect(MQTT_ADDR, {
	clientId: 'node2',
	protocolId: 'MQIsdp',
	protocolVersion: 3,
	connectTimeout: 1000,
	debug: true
});
client.on('connect', function () {
	client.subscribe(MQTT_TOPIC);
	client.publish(MQTT_TOPIC, 'Hello mqtt');
});
client.on('message', function (topic, message) {
	// message is Buffer
	console.log(message.toString());
});
client.on('error', function (err) {
	console.log(err);
})
