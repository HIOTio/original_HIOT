var Schema = mongoose.Schema;

var SensorSchema = new Schema({
	thing: {
		type: Schema.types.ObjectId,
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


// Compile model from schema
var SensorModel = mongoose.model('Sensor', SensorSchema);
