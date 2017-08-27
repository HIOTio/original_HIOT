var Deployment = require('../models/deployment');

exports.deployment_list = function (req, res, next) {
	Deployment.find({}, function (err, list_deployments) {
		console.log(req);
		if (err) {
			return next(err);
		}
		//Successful, so render
		res.send(list_deployments);
	});
};
exports.deployment_detail = function (req, res, next) {
	Deployment.find({
		_id: req.params.id
	}).populate('deploymentType').exec(function (err, deployment) {
		if (err) {
			return next(err);
		}
		//Successful, so render
		res.send(deployment);
	});
};

exports.deployment_create = function (req, res, next) {
	req.checkBody('description', 'Each deployment needs a description').notEmpty();
	req.sanitize('description').escape();
	req.sanitize('description').trim();
	var errors = req.validationErrors();
	var deployment = new Deployment({
		description: req.body.description,
		name: req.body.name,
		deploymentType: req.body.deploymentType,
		owner: req.body.owner
	});
	deployment.save(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect(deployment.url);
	});

};
exports.deployment_delete = function (req, res, next) {
	Deployment.findOneAndUpdate({
		_id: req.body.id
	}, {
		active: false
	}, {
		upsert: false
	}, function (err, doc) {
		if (err) return res.send(500, {
			error: err
		});
		return res.send("Deployment Deleted");
	});
};
exports.deployment_update = function (req, res) {
	console.log(req.body);
	Deployment.findOneAndUpdate({
			_id: req.body.id
		}, {
			description: req.body.description,
			name: req.body.name,
			owner: req.body.owner,
			added: req.body.added,
			active: req.body.active
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
