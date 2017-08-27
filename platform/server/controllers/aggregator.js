var Aggregator = require('../models/aggregator')

exports.aggregator_list = function (req, res) {
  Aggregator.find({}, function (err, list_aggregators) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(list_aggregators)
  })
}

// TODO: get this to work by assiging devices to deployments, and querying the "device" element
exports.aggergator_list_for_deployment = function (req, res) {
  Aggregator.find({
    deployment: req.params.deployment
  }, function (err, list_aggregators) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(list_aggregators)
  })
}
exports.aggregator_detail = function (req, res) {
  Aggregator.find({
    _id: req.params.id
  }, function (err, aggregator) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(aggregator)
  })
}
exports.aggregator_create = function (req, res, next) {
  req.checkBody('description', 'Each aggregator needs a description').notEmpty()
  req.sanitize('description').escape()
  req.sanitize('description').trim()
  req.checkBody('device', 'Each aggregator needs a description').notEmpty()
  req.sanitize('device').escape()
  req.sanitize('device').trim()
  req.checkBody('parent', 'Each aggregator needs a description').notEmpty()
  req.sanitize('parent').escape()
  req.sanitize('parent').trim()
  var errors = req.validationErrors()
  var aggregator = new Aggregator({
    description: req.body.description,
    device: req.body.device,
    parent: req.body.parent
  })
  aggregator.save(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect(aggregator.url)
  })
}
exports.aggregator_delete = function (req, res) {
  Aggregator.findOneAndUpdate({
    _id: req.body.id
  }, {
    active: false
  }, {
    upsert: false
  }, function (err, doc) {
    if (err) {
      return res.send(500, {
        error: err
      })
    }
    return res.send('Aggregator Deleted')
  })
}
exports.aggregator_update = function (req, res) {
  console.log(req.body)
  Aggregator.findOneAndUpdate({
    _id: req.body.id
  }, {
    'description': req.body.description,
    'parent': req.body.parent,
    'active': req.body.active,
    'added': req.body.added
  }, {
    upsert: false
  },
    function (err, doc) {
      if (err) {
        return res.send(500, {
          error: err
        })
      }
      res.redirect(303, doc.url)
    })
}
