var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SensorSchema = new Schema({
	thing: {
		type: Schema.Types.ObjectId,
		ref: 'Thing'
	},
	description: String,
	location: {
		type: Schema.Types.ObjectId,
		ref: 'Location'
	},
	name: String,
	active: Boolean,
	added: Date,
	pushInterval: Number,
	sensortype: {
		type: Schema.Types.ObjectId,
		ref: 'Sensor_Types'
	},
	coordinator_groups: [{
		type: Schema.Types.ObjectId,
		ref: 'Coordinator_Groups'
	}],
	sensor_readings: [{
		type: Schema.Types.ObjectId,
		ref: 'Sensor_Reading'
	}]
});
SensorSchema
	.virtual('url')
	.get(function () {
		return '/api/sensor/' + this._id;
	});
module.exports = mongoose.model('Sensor', SensorSchema);
