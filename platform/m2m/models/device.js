var mongoose = require('mongoose');
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
	health: [{
		type: Schema.Types.ObjectId,
		ref: 'HealthModel'
	}],
	model: {
		type: Schema.Types.ObjectId,
		ref: 'Device_Model'
	},
	location: {
		type: Schema.Types.ObjectId,
		ref: 'Location'
	},
	deployment: {
		type: Schema.Types.ObjectId,
		ref: 'Deployment'
	}
	added: Date,
	Active: Boolean
});

DeviceSchema
	.virtual('url')
	.get(function () {
		return '/api/device/' + this._id;
	});

// Compile model from schema
module.exports = mongoose.model('Device', DeviceSchema);
