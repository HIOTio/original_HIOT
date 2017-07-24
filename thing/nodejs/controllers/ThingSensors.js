'use strict';

var url = require('url');


var ThingSensors = require('./ThingSensorsService');


module.exports.thingSensorSensorIdGET = function thingSensorSensorIdGET (req, res, next) {
  ThingSensors.thingSensorSensorIdGET(req.swagger.params, res, next);
};
