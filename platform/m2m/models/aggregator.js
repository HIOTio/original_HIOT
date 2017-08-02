var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AggregatorSchema = new Schema({
	device: {
		type: Schema.Types.ObjectId,
		ref: 'Device',
		required: true
	},
	description: String,
	parent: {
		type: Schema.Types.ObjectId,
		ref: 'Device'
	},
	added: Date,
	active: Boolean
});
AggregatorSchema
	.virtual('url')
	.get(function () {
		return '/api/aggregator/' + this._id;
	});

// Compile model from schema
module.exports = mongoose.model('Aggregator', AggregatorSchema);
