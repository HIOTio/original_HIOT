var config = require('./config');
var mqtt = require('./MQTT');
var fs = require('fs');
var mqttStatus = false;

//set up the installled roles
var roles = [];
var handlers = [];
var subscriptions = [];
var isThing = false;
var isAggregator = false;
var isBroker = false;
var sensors = config.thing.sensors;
var controllers = config.thing.controllers;
var aggregators = config.aggregators;
var brokers = config.brokers;
var broker_from = config.broker_from;







