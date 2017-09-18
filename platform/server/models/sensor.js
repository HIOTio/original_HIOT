var mongoose = require('mongoose')
var Schema = mongoose.Schema

var SensorSchema = new Schema({
  channel: String,
  sensorId: String,
  description: String,
  handler: String,
  config:String,
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  },
  name: String,
  active: Boolean,
  added: Date,
  poll: Number,
  sensortype: {
    type: Schema.Types.ObjectId,
    ref: 'Sensor_Types'
  },
  sensor_readings: [{
    type: Schema.Types.ObjectId,
    ref: 'Sensor_Reading'
  }]
})
SensorSchema
	.virtual('url')
	.get(function () {
  return '/api/sensor/' + this._id
})
module.exports = mongoose.model('Sensor', SensorSchema)
