var Location = require('../models/location');

exports.location_list = function (req, res, next) {
	Location.find({}, function (err, list_locations) {
		if (err) {
			return next(err);
		}
		//Successful, so render
		res.send(list_locations);
	});
};

exports.location_detail = function (req, res, next) {
	Location.find({
		_id: req.params.id
	}, function (err, location) {
		if (err) {
			return next(err);
		}
		//Successful, so render
		res.send(location);
	});
};
exports.location_create = function (req, res, next) {
	var location = new Location({
		description: req.body.description,
		parent: req.body.parent,
		added: req.body.added
	});
	res.redirect(303, location.url);

};
exports.location_delete = function (req, res, next) {
	Location.findOneAndUpdate({
		_id: req.body.id
	}, {
		active: false
	}, {
		upsert: false
	}, function (err, doc) {
		if (err) return res.send(500, {
			error: err
		});
		return res.send("Location Deleted");
	});
};
exports.location_update = function (req, res, next) {
	Location.findOneAndUpdate({
			_id: req.body.id
		}, {
			description: req.body.description,
			parent: req.body.parent,
			added: req.body.added
		}, {
			upsert: false
		},
		function (err, doc) {
			if (err) return res.send(500, {
				error: err
			});
			if (doc != null) {
				res.redirect(303, doc.url);
			} else {
				res.send(500, "Location not found");
			}
		});
};
