var mqtt = require('mqtt');
var config = require('./config.json');
var MQTT_ADDR = config.mqttServer;
var MQTT_PORT = config.mqttPort;
var agg_id = config.aggregator_id;
var fs = require('fs');

var admin_client = mqtt.connect(MQTT_ADDR, {
	keepalive: 0,
	debug: false
});

admin_client.on('connect', function () {
	console.log("Subscribed to admin channel");
	admin_client.subscribe("admin_" + config.aggregator_id);
});
admin_client.on('message', function (topic, message) {
	console.log("received admin message '" + message + "'");
	fs.writeFile('./config.json', message, function (err) {
		if (err) {
			console.log('There has been an error saving your configuration data.');
			console.log(err.message);
			return;
		}
		console.log('Configuration saved successfully.');
		//reload the configuration
		delete require.cache['./config.json'];
	});

});

admin_client.on('error', function (err) {
	console.log(err);
});
