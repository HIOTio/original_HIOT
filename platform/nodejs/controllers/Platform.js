'use strict';

var url = require('url');


var Platform = require('./PlatformService');


module.exports.getCommandCategories = function getCommandCategories (req, res, next) {
  Platform.getCommandCategories(req.swagger.params, res, next);
};

module.exports.getCommands = function getCommands (req, res, next) {
  Platform.getCommands(req.swagger.params, res, next);
};

module.exports.getDevicesByRole = function getDevicesByRole (req, res, next) {
  Platform.getDevicesByRole(req.swagger.params, res, next);
};

module.exports.getRoles = function getRoles (req, res, next) {
  Platform.getRoles(req.swagger.params, res, next);
};

module.exports.getStatus = function getStatus (req, res, next) {
  Platform.getStatus(req.swagger.params, res, next);
};
