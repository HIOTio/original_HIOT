'use strict';

var url = require('url');


var ThingController = require('./ThingControllerService');


module.exports.thingControllerGET = function thingControllerGET (req, res, next) {
  ThingController.thingControllerGET(req.swagger.params, res, next);
};

module.exports.thingControllerPOST = function thingControllerPOST (req, res, next) {
  ThingController.thingControllerPOST(req.swagger.params, res, next);
};
