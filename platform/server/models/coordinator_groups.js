var Schema = mongoose.Schema;

var Coordinator_GroupSchema = new Schema({
	description: String,
	name: String,
	active: Boolean,
	added: Date,
	calculation: String,
	sensortype: {
		type: Schema.Types.ObjectId,
		ref: 'Sensor_Types'
	},
	sensors: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Sensor'
		}
	]
});
Coordinator_GroupSchema
	.virtual('url')
	.get(function () {
		return '/api/coordinator_group/' + this._id;
	});


// Compile model from schema
var Coordinator_GroupModel = mongoose.model('Coordinator_Group', Coordinator_GroupSchema);
