var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ControllerSchema = new Schema({
	description: String,
	thing: {
		type: Schema.Types.ObjectId,
		ref: 'Thing'
	},
	added: Date,
	commands: [{
		type: Schema.Types.ObjectId,
		ref: 'Controller_Command'
	}]
});
ControllerSchema
	.virtual('url')
	.get(function () {
		return '/api/controller/' + this._id;
	});


// Compile model from schema
var ControllerModel = mongoose.model('Controller', ControllerSchema);
