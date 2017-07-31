var Schema = mongoose.Schema;

var Sensor_ReadingSchema = new Schema({
	date: Date,
	reading: Object

});


// Compile model from schema
var Sensor_ReadingModel = mongoose.model('Sensor_Reading', Sensor_ReadingSchema);
