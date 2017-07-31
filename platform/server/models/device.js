var Schema = mongoose.Schema;

var DeviceSchema = new Schema({
	deviceId: {
		type: String,
		required: true,
		uppercase: true,
		minlength: 16,
		maxlength: 16
	},
	make: {
		type: Schema.Types.ObjectId,
		ref: 'Device_Make'
	},
	model: {
		type: Schema.Types.ObjectId,
		ref: 'Device_Model'
	},
	location: {
		type: Schema.Types.ObjectId,
		ref: 'Location'
	},
	added: Date,
	Active: Boolean
});

DeviceSchema
	.virtual('url')
	.get(function () {
		return '/api/location/' + this._id;
	});

// Compile model from schema
var DeviceModel = mongoose.model('Device', DeviceSchema);