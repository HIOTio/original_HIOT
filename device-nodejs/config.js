var config_json = require('./config.json');
var mqtt = require('mqtt');
var fs = require('fs');
var mqttStatus = false;

//set up the installled roles
var roles = [];
var handlers = [];
var subscriptions = [];
var isThing = false;
var isAggregator = false;
var isBroker = false;
var sensors = config_json.thing.sensors;
var controllers = config_json.thing.controllers;
var aggregators = config_json.aggregators;
var brokers = config_json.brokers;
var broker_from = config_json.broker_from;


// set up mqtt
var client = mqtt.connect(config_json.MQTT_ADDR, {
	keepalive: 0,
	debug: false
});

client.on('connect', function () {
	this.mqttStatus = true;
	console.log("connected");
	//reconfig
	updateConfig();
	console.log("configured");
});
client.on('disconnect', function () {
	this.mqttStatus = false;
	//need to handle this issue somehow
})
client.on('error', function (err) {
	//need to handle this somehow...
	console.log(err);
});

function publish(channel) {
	console.log(channel);
	var message = handlers[channel.handler].poll(channel);
	client.publish(channel.channel, message);
}
client.on('message', function (topic, _message) {
	//get the JSON representation of the message
	try {
		var message = JSON.parse(_message.toString());
		//handle special channels to get and set config
		if (topic.startsWith("_CFG_")) {
			if (topic.startsWith("_CFG_Set")) {
				//need to set the config
				//need to tidy this up a LOT
				fs.writeFile('./config.json', JSON.stringify(message.config), function (err) {
					if (err == null) {
						config_json = message.config;
						updateConfig();
						console.log("config updated");
					} else {
						console.log(err);
					}
				})
			} else if (topic.startsWith("_CFG_Get")) {
				// add security (basic white/black listing) eventually...

				//need to return the config to the calling channel
				client.publish(message.caller, JSON.stringify(getConfig()));
			} else {
				//add exception handling here...
			}
			return;
		}
		handlers[subscriptions[topic]].handleMessage(topic, message);
	} catch (err) {
		console.log(err);
	}
})

function addHandler(index, file, poll, object) {
	//check if the file exists before creating the handler
	fs.stat(file + '.js', function (err, stat) {
		if (err == null) {
			handlers[index] = require(file);
			if (poll) {
				console.log("setting up polling interval");
				setInterval(publish, object.poll, object);
			}
		} else {
			// need to broadcast a message to the coordinator/broker to send on complete config and files
			console.log(err);

		}
	})
}

function getConfig() {
	return config_json;
}

function unsub(topic) {
	client.unsubscribe(topic, function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log("unsubscribed from " + topic);
		}

	});
}

function updateConfig() {
	var sensors = config_json.thing.sensors;
	var controllers = config_json.thing.controllers;
	var aggregators = config_json.aggregators;
	var brokers = config_json.brokers;
	var broker_from = config_json.broker_from;
	console.log(subscriptions);
	for (var ind in subscriptions) {
		var index = ind;

		delete subscriptions[index];
		console.log("unsubscribing from " + index);
		unsub(index);
	}

	// add two special channels to get and set configuration
	console.log(subscriptions);
	subscriptions["_CFG_Set" + config_json.device_id] = '';
	subscriptions["_CFG_Get" + config_json.device_id] = '';

	subscriptions["admin_" + config_json.device_id] = "admin_" + config_json.device_id;

	//add handler for admin channel
	handlers = [];
	addHandler("admin_" + config_json.device_id, './handlers/device/admin', null, null);

	// clear any previously assigned roles
	roles = [];
	if (config_json.thing) {
		this.isThing = true;
		this.sensors = config_json.thing.sensors;
		this.controllers = config_json.thing.controllers;
		roles.push("THING");
	} else {
		this.isThing = false;
	}
	if (config_json.aggregators) {
		this.isAggregator = true;
		roles.push("AGGREGATOR");
	} else {
		this.isAggregator = false;
	}
	if (config_json.brokers) {
		this.isBroker = true;
		roles.push("BROKER");
	} else {
		this.isBroker = false;
	}


	//Set up publications for sensors
	for (var i = 0; i < sensors.length; i++) {
		console.log("setting up Sensor " + sensors[i].id);
		addHandler(sensors[i].handler, './handlers/' + sensors[i].handler, sensors[i].poll, sensors[i]);
		//moved this into the addHandler function to ensure it executes in sequence
		//setInterval(publish, sensors[i].poll, sensors[i]);
	};
	// set up subscriptions for controllers
	for (var i = 0; i < controllers.length; i++) {
		addHandler(controllers[i].handler, './handlers/' + controllers[i].handler, null, null);
		subscriptions["ctrl_" + controllers[i].controller_channel] = controllers[i].handler;


	}
	//add handlers etc. for aggregators & brokers
	for (var i = 0; i < aggregators.length; i++) {
		console.log("setting up Aggregator " + aggregators[i].agg_id);
		addHandler(aggregators[i].handler, './handlers/' + aggregators[i].handler, aggregators[i].poll, aggregators[i]);
		//bit more work to be done here - need to subscribe to and collate all the relevant sensor messages

		//moved this into the addHandler function to ensure it executes in sequence
		//setInterval(publish, aggregators[i].poll, aggregators[i]);
	}
	for (var i = 0; i < brokers.length; i++) {
		console.log("setting up Broker " + brokers[i].broker);
		addHandler(brokers[i].handler, './handlers/' + brokers[i].handler, null, null);
		//bit more work to be done here - need to subscribe to commands and forward to relevant device


		subscriptions["broker_" + brokers[i].channel] = brokers[i].handler;

	}

	//add all of the subscribed channels/topics
	for (var index in subscriptions) {
		console.log("subscribing to '" + index + "'");
		client.subscribe(index);
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
