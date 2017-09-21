var Device = require('../models/device')

exports.device_list = function (req, res, next) {
  Device.find({}, function (err, list_devices) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(list_devices)
  })
}
exports.device_count = function (req, res, next) {
  Device.count({
    deployment: req.params.deployment
  }, function (err, dev_count) {
    res.send({
      'device_count': dev_count
    })
  })
}
exports.device_list_for_deployment = function (req, res, next) {
      //use query params to filter
      var query={}
      if(req.params.deployment){
        query.deployment=req.params.deployment;
      }
      if(req.params.location){
        //TODO: need to include any child locations, including nested ones
        query.location=req.params.location
      }
      if(req.query.handler){
        //TODO: need to include make/model/
        query.handler=req.params.handler
      }
  Device.find(query)
  .populate("make")
  .populate("model")
  .exec( function (err, list_devices) {
    if (err) {
      
      return next(err)
    }
    res.send(list_devices)
  })
}
exports.device_detail = function (req, res, next) {
  Device.find({
    _id: req.params.id
  }, function (err, device) {
    if (err) {
      return next(err)
    }
		// Successful, so render
    res.send(device)
  })
}
exports.device_create = function (req, res, next) {
  req.checkBody('deviceid', 'Each device needs a device id').notEmpty()
  req.sanitize('deviceid').escape()
  req.sanitize('deviceid').trim()
  var errors = req.validationErrors()
  var device = new Device({
    deviceId: req.body.deviceId,
    deployment: req.body.deployment,
    name: req.body.name,
    description: req.body.description,
    location:req.body.location,
    make: req.body.make,
    model: req.body.model,
    mqttBrokers:req.body.mqttBrokers,
    added: req.body.added,
    active: req.body.active,
    isBroker: Boolean,
    isAggregator: Boolean,
    hasSensors: Boolean,
    isController: Boolean,
    isCoordinator: Boolean,
    aggregators: req.body.aggregators,
    controllers: req.body.controllers,
    sensors: req.body.sensors,
    brokers: req.body.brokers
  })
  device.save(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect(device.url)
  })
}
exports.device_delete = function (req, res, next) {
  Device.findOneAndUpdate({
    _id: req.body.id
  }, {
    active: false
  }, {
    upsert: false
  }, function (err, doc) {
    if (err) {
      next(err)
    }
    return res.send('Device Deleted')
  })
}
exports.device_update = function (req, res, next) {
  Device.findOneAndUpdate({
    _id: req.body._id
  }, {
    deviceId: req.body.deviceId,
    deployment: req.body.deployment,
    name: req.body.name,
    description: req.body.description,
    location:req.body.location,
    make: req.body.make,
    model: req.body.model,
    mqttBrokers:req.body.mqttBrokers,
    added: req.body.added,
    active: req.body.active,
    isBroker: Boolean,
    isAggregator: Boolean,
    hasSensors: Boolean,
    isController: Boolean,
    isCoordinator: Boolean,
    aggregators: req.body.aggregators,
    controllers: req.body.controllers,
    sensors: req.body.sensors,
    brokers: req.body.brokers
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
