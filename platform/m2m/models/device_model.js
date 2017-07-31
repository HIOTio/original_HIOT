var Schema = mongoose.Schema;

var Device_ModelSchema = new Schema({
	description: String,
	make: {
		type: Schema.Types.ObjectId,
		ref: 'Device_Make'
	},
	added: Date
});
Device_ModelSchema
	.virtual('url')
	.get(function () {
		return '/api/device_model/' + this._id;
	});


// Compile model from schema
var Device_ModelModel = mongoose.model('Device_Model', Device_ModelSchema);
