var mqtt = require('mqtt');
var config = require('./config.json');
require('./admin');
var MQTT_ADDR = config.mqttServer;
var MQTT_PORT = config.mqttPort;
var agg_id = config.aggregator_id;
var readings = [];
var channel_data = [

];
var sensors = [];
var coordinator_groups = [];
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
//sync timers on all client devices
var sync_clients = function () {
	client.publish("sync_" + agg_id, "sync now");
}

function publish(channel) {
	console.log("Publishing message '" + channel.message + "' on channel '" + channel.channel + "'");
	client.publish(channel.channel, channel.message);
}

function publish_cg(group_name) {
	console.log("Publishing message on coordination_group '" + group_name + "'");
	group = coordinator_groups[group_name];
	client.publish(group_name, JSON.stringify({
		"min": group.min,
		"max": group.max,
		"count": group.count,
		"mean": group.mean
	}));

	//reset min,max, mean and count
	group.min = 999999;
	group.max = -1;
	group.count = -1;
	group.mean = 0;

}
//load publications
for (var i = 0; i < config.publications.length; i++) {
	channel_data[config.publications[i].publication] = {
		channel: config.publications[i].name,
		message: config.publications[i].default
	};
	if (config.publications[i].interval > 0) {
		setInterval(publish, config.publications[i].interval, config.publications[i]);
	}
}
//load subscriptions
for (var i = 0; i < config.subscriptions.length; i++) {
	subscribe(config.subscriptions[i]);
}
//set up coordinator groups
for (var i = 0; i < config.coordinator_groups.length; i++) {
	coordinator_groups[config.coordinator_groups[i].group] = {
		timestamp: 0,
		interval: config.coordinator_groups[i].interval,
		sensors: config.coordinator_groups[i].sensors,
		get_min: config.coordinator_groups[i].operations.min,
		get_max: config.coordinator_groups[i].operations.max,
		get_count: config.coordinator_groups[i].operations.count,
		get_mean: config.coordinator_groups[i].operations.mean,
		min: 9999999,
		max: 0,
		count: 0,
		mean: 0
	}
	setInterval(publish_cg, config.coordinator_groups[i].interval, config.coordinator_groups[i].group, config.coordinator_groups[i])
	for (var j = 0; j < config.coordinator_groups[i].sensors.length; j++) {
		if (!sensors[config.coordinator_groups[i].sensors[j]]) {
			sensors[config.coordinator_groups[i].sensors[j]] = [];
		}
		sensors[config.coordinator_groups[i].sensors[j]].push(config.coordinator_groups[i].group);
	}
}
console.log(coordinator_groups);
console.log(sensors);
client.on("message", function (topic, _message) {
	console.log("received message '" + _message + "' on topic '" + topic + "'");
	var message = JSON.parse(_message);
	console.log(sensors);
	if (sensors[topic]) {
		console.log("received '" + message + "' for sensor '" + topic + "'");
		//manage coordinator groups
		console.log(message);
		for (var i = 0; i < sensors[topic].length; i++) {
			if (coordinator_groups[sensors[topic][i]].get_min) {
				coordinator_groups[sensors[topic][i]].min = Math.min(coordinator_groups[sensors[topic][i]].min, message.value);
				console.log(message.value);
			}
			if (coordinator_groups[sensors[topic][i]].get_max) {
				coordinator_groups[sensors[topic][i]].max = Math.max(coordinator_groups[sensors[topic][i]].max, message.value);
			}
			if (coordinator_groups[sensors[topic][i]].get_mean) {
				coordinator_groups[sensors[topic][i]].mean = (coordinator_groups[sensors[topic][i]].mean * coordinator_groups[sensors[topic][i]].count + message.value) / (coordinator_groups[sensors[topic][i]].count + 1);
			}
			if (coordinator_groups[sensors[topic][i]].get_count) {
				coordinator_groups[sensors[topic][i]].count++;
			}
			console.log(coordinator_groups[sensors[topic][i]]);
		}
	}
});
