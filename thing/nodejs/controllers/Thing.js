'use strict';

var url = require('url');


var Thing = require('./ThingService');


module.exports.thingPropertiesGET = function thingPropertiesGET (req, res, next) {
  Thing.thingPropertiesGET(req.swagger.params, res, next);
};

module.exports.thingStatusGET = function thingStatusGET (req, res, next) {
  Thing.thingStatusGET(req.swagger.params, res, next);
};

module.exports.thingSyncPOST = function thingSyncPOST (req, res, next) {
  Thing.thingSyncPOST(req.swagger.params, res, next);
};
