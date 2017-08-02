var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HealthSchema = new Schema({
	dutyCycle: Number,
	memoryUsage: Number,
	storageUsage: Number,
	totalMemory: Number,
	totalStorage: Number,
	date: Date,
	device: {
		type: Schema.Types.ObjectId,
		ref: 'Device'
	}
});

module.exports = mongoose.model('Health', HealthSchema);
