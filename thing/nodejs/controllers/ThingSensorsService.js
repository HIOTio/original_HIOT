'use strict';

exports.thingSensorSensorIdGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  * sensorId (String)
  **/
    var examples = {};
  examples['application/json'] = [ {
  "reading" : "aeiou",
  "value" : "aeiou"
} ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}
