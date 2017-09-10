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
  mqttServerIP: String,
  mqttServerPort:String,
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
    ref: 'Device_Make'
  },
  health: [{
    type: Schema.Types.ObjectId,
    ref: 'HealthModel'
  }],
  model: {
    type: Schema.Types.ObjectId,
    ref: 'Device_Model'
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
