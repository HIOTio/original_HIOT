module.exports = {

	'mqttServer': 'mqtt://localhost',
	'mqttTopic': [{
			name: 'sensor readings',
			topic: 'sensor',
			model: 'sensor_reading'
	}, {
			namee: 'health',
			model: 'health',
			topic: 'health'
		}, {
			name: 'coordinator group',
			topic: 'coorgroup',
			model: 'coordinator_groups'
		}
],
	'database': 'mongodb://localhost/hiot'
};
