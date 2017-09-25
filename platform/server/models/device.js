var mongoose = require('mongoose')
var Schema = mongoose.Schema

var DeviceSchema = new Schema({
  deviceId: {
    type: String,
    required: true,
    uppercase: true,
    minlength: 16,
    maxlength: 16
  },
  description: String,
  name: String,
  isBroker: Boolean,
  isAggregator: Boolean,
  hasSensors: Boolean,
  isController: Boolean,
  isCoordinator: Boolean,
  mqttBrokers:[{
    mqttServerIP: String,
    mqttServerPort:String,
    priority:Number
  }
  ],
  compatibility:{
    type:String,
    enum:['HIOT_Node','HIOT_Other','MQTT_Only'],
    default:'MQTT_Only'
  },
  active: Boolean,
  added: Date,
  aggregators: [{
    type: Schema.Types.ObjectId,
    ref: 'Aggregator'
  }],
  brokers: [{
    type: Schema.Types.ObjectId,
    ref: 'Broker'
  }],
  make: {
    type: Schema.Types.ObjectId,
    ref: 'DeviceMake'
  },
  health: [{
    type: Schema.Types.ObjectId,
    ref: 'HealthModel'
  }],
  model: {
    type: Schema.Types.ObjectId,
    ref: 'DeviceModel'
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  },
  deployment: {
    type: Schema.Types.ObjectId,
    ref: 'Deployment'
  },
  sensors:[{
    type:Schema.Types.ObjectId,
    ref:'Sensor'
  }],
  controllers:[{
    type:Schema.Types.ObjectId,
    ref:'Controller'
  }]
})

DeviceSchema
	.virtual('url')
	.get(function () {
  return '/api/device/' + this._id
})

// Compile model from schema
module.exports = mongoose.model('Device', DeviceSchema)
