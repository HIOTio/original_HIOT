var Device = require('../models/device');

exports.device_list = function (req, res, next) {
	Device.find({}, function (err, list_devices) {
		if (err) {
			return next(err);
		}
		//Successful, so render
		res.send(list_devices);
	});
};
exports.device_count = function (req, res, next) {
	Device.count({
		deployment: req.params.deployment
	}, function (err, dev_count) {
		res.send({
			'device_count': dev_count
		});
	})
}
exports.device_list_for_deployment = function (req, res, next) {

	Device.find({
		deployment: req.params.deployment
	}, function (err, list_devices) {
		if (err) {
			return next(err);
		}
		res.send(list_devices);
	});
};
exports.device_detail = function (req, res, next) {
	Device.find({
		_id: req.params.id
	}, function (err, device) {
		if (err) {
			return next(err);
		}
		//Successful, so render
		res.send(device);
	});
};
exports.device_create = function (req, res, next) {
	req.checkBody('deviceid', 'Each device needs a device id').notEmpty();
	req.sanitize('deviceid').escape();
	req.sanitize('deviceid').trim();
	var errors = req.validationErrors();
	var device = new Device({
		deviceId: req.body.deviceId,
		make: req.body.make,
		model: req.body.model,
		added: req.body.added,
		active: req.body.active,
		subscriptions: req.body.subscriptions,
		publications: req.body.publications
	});
	device.save(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect(device.url);
	});

};
exports.device_delete = function (req, res, next) {
	Device.findOneAndUpdate({
		_id: req.body.id
	}, {
		active: false
	}, {
		upsert: false
	}, function (err, doc) {
		if (err) {
			next(err);
		}
		return res.send("Device Deleted");
	});

};
exports.device_update = function (req, res, next) {
	Device.findOneAndUpdate({
			_id: req.body.id
		}, {
			deviceId: req.body.deviceId,
			make: req.body.make,
			model: req.body.model,
			added: req.body.added,
			active: req.body.active,
			subscriptions: req.body.subscriptions,
			publications: req.body.publications
		}, {
			upsert: false
		},
		function (err, doc) {
			if (err) return res.send(500, {
				error: err
			});
			res.redirect(303, doc.url);
		});
};
