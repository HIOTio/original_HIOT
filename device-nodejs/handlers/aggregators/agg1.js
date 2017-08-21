var aggregates = [];
var readings = [];
module.exports = {
	poll: function (args) {
		console.log("fired poll from agg1");
		return JSON.stringify({
			"id": "test"
		})
	},
	message: function (args) {
		console.log(args.channel);
		return JSON.stringify({
			"aggregates": getAggregate(args),
			"readings": getReadings(args)
		});
		//clear the aggregates and readings as soon as they are sent
		aggregates[args.channel] = [];
		readings[args.channel] = [];
	},
	parse: function (message, sensor) {
		console.log(sensor);
		console.log(message.toString());

	}
}

function getReadings(agg) {
	return 0;
}

function getAggregate(agg) {
	return 0;
}

function resetAggregate(agg) {

}

function resetReadings(agg) {

}

function temp() {
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
	for (var j = 0; j < config.coordinator_groups[i].sensors.length; j++) {
		if (!sensors[config.coordinator_groups[i].sensors[j]]) {
			sensors[config.coordinator_groups[i].sensors[j]] = [];
		}
		sensors[config.coordinator_groups[i].sensors[j]].push(config.coordinator_groups[i].group);
	}
}
