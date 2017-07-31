'use strict';
var fs = require('fs');
exports.thingPropertiesGET = function (args, res, next) {
	/**
	 * parameters expected in the args:
	 **/
	var examples = {};
	var config = JSON.parse(fs.readFileSync('./config.js'));

	if (Object.keys(config).length > 0) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(config, null, 2));
	} else {
		res.end();
	}

}

exports.thingStatusGET = function (args, res, next) {
	/**
	 * parameters expected in the args:
	 **/
	var examples = {};
	examples['application/json'] = {
		"memory": {
			"total": 1.3579000000000001069366817318950779736042022705078125,
			"available": 1.3579000000000001069366817318950779736042022705078125
		},
		"name": "aeiou",
		"dutyCycle": 1.3579000000000001069366817318950779736042022705078125,
		"lastUpload": 1.3579000000000001069366817318950779736042022705078125,
		"uptime": 1.3579000000000001069366817318950779736042022705078125,
		"frequency": 1.3579000000000001069366817318950779736042022705078125
	};
	if (Object.keys(examples).length > 0) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
	} else {
		res.end();
	}

}

exports.thingSyncPOST = function (args, res, next) {
	/**
	 * parameters expected in the args:
	 **/
	// no response value expected for this operation
	res.end();
}
