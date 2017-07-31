var Schema = mongoose.Schema;

var Sensor_TypesSchema = new Schema({
	description: String,
	name: String,
	active: Boolean,
	added: Date,
	defaultPshInterval: Number,
});
Sensor_TypesSchema
	.virtual('url')
	.get(function () {
		return '/api/sensor_types/' + this._id;
	});


// Compile model from schema
var Sensor_TypesModel = mongoose.model('Sensor_Types', Sensor_TypesSchema);
