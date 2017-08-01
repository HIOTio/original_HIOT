var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Sensor_ReadingSchema = new Schema({
	sensor_id: {
		type: Schema.Types.ObjectId,
		ref: 'Sensor'
	},
	date: {
		type: Date,
		default: Date.now
	},
	reading: Number

});
module.exports = mongoose.model('Sensor_Reading', Sensor_ReadingSchema);
