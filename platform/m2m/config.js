module.exports = {

    'mqttServer': 'mqtt://localhost',
    'mqttTopic': [{
            name: 'sensor readings',
            topic: 'sensor1',
            model: 'sensor_reading'
	}, {
            namee: 'health',
            model: 'health',
            topic: 'health'
		}, {
            name: 'coordinator group',
            topic: 'coorgroup',
            model: 'coordinator_groups'
		},
        {
            name: 'Temperature - First Floor',
            topic: 'agg_1',
            model: 'coordinator_groups'
		}
],
    'database': 'mongodb://localhost/hiot'
};
