var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Sensor_ReadingSchema = new Schema({
	date: Date,
	reading: Object

});


// Compile model from schema
module.exports = mongoose.model('Sensor_Reading', Sensor_ReadingSchema);
