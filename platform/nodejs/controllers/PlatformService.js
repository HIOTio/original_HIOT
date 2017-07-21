'use strict';

exports.getCommandCategories = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
    var examples = {};
  examples['application/json'] = {
  "categories" : [ {
    "level" : 123,
    "lastUpdate" : "2000-01-23T04:56:07.000+00:00",
    "name" : "aeiou",
    "id" : "aeiou"
  } ]
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.getCommands = function(args, res, next) {
  /**
   * parameters expected in the args:
  * commandCategories (List)
  * offset (Integer)
  * limit (Integer)
  **/
    var examples = {};
  examples['application/json'] = {
  "level" : 123,
  "lastUpdate" : "2000-01-23T04:56:07.000+00:00",
  "name" : "aeiou",
  "id" : "aeiou"
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.getDevicesByRole = function(args, res, next) {
  /**
   * parameters expected in the args:
  * roleId (String)
  * offset (Integer)
  * limit (Integer)
  **/
    var examples = {};
  examples['application/json'] = [ 123 ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.getRoles = function(args, res, next) {
  /**
   * parameters expected in the args:
  * deviceId (String)
  **/
    var examples = {};
  examples['application/json'] = [ 123 ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.getStatus = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
    var examples = {};
  examples['application/json'] = [ 123 ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

