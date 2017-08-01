var mqtt = require('mqtt');
var config = require('./config');
var db = require('./db');
var MQTT_ADDR = config.mqttServer;
var MQTT_PORT = 1883;
var sensor_reading = require('./models/sensor_reading');
var messaging = require('./topic');

for (var i = 0; i < config.mqttTopic.length; i = i + 1) {
	messaging(MQTT_ADDR, MQTT_PORT, config.mqttTopic[i].topic, require('./models/' + config.mqttTopic[i].model));
}
