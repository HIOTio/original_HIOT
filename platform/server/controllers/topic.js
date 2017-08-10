var Topic = require('../models/topic');

exports.topic_list = function (req, res, next) {
	Topic.find({}, function (err, list_topics) {
		if (err) {
			return next(err);
		}
		//Successful, so render
		res.send(list_topics);
	});
};

exports.topic_detail = function (req, res, next) {
	Topic.find({
		_id: req.Topics.id
	}, function (err, Topic) {
		if (err) {
			return next(err);
		}
		//Successful, so render
		res.send(Topic);
	});
};
exports.topic_create = function (req, res, next) {
	var topic = new Topic({
		description: req.body.description,
		added: req.body.added,
		name: req.body.name,
		fields: req.body.fields
	});
	res.redirect(303, topic.url);

};
exports.topic_delete = function (req, res, next) {
	Topic.findOneAndUpdate({
		_id: req.body.id
	}, {
		active: false
	}, {
		upsert: false
	}, function (err, doc) {
		if (err) return res.send(500, {
			error: err
		});
		return res.send("Topic Deleted");
	});
};
exports.topic_update = function (req, res, next) {
	Topic.findOneAndUpdate({
			_id: req.body.id
		}, {
			description: req.body.description,
			added: req.body.added,
			name: req.body.name,
			fields: req.body.fields
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
				res.send(500, "Topic not found");
			}
		});
};
