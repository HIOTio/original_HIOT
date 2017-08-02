var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BrokerSchema = new Schema({
	deviceId: {
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

BrokerSchema
	.virtual('url')
	.get(function () {
		return '/api/broker/' + this._id;
	});

module.exports = mongoose.model('Broker', BrokerSchema);
