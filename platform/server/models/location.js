var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
	description: String,
	parent: {
		type: Schema.Types.ObjectId,
		ref: 'Location'
	},
	added: Date
});
LocationSchema
	.virtual('url')
	.get(function () {
		return '/api/location/' + this._id;
	});


// Compile model from schema
var LocationModel = mongoose.model('Location', LocationSchema);
