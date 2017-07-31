var Schema = mongoose.Schema;

var Controller_CommandSchema = new Schema({
	description: String,
	name: String,
	id: String,
	params: [{
		type: Schema.Types.ObjectId,
		ref: 'Param'
	}]
});

module.exports = mongoose.model('Controller_Command', Controller_CommandSchema);
