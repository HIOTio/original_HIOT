var Schema = mongoose.Schema;

var ParamSchema = new Schema({
	name: String,
	value: Object,
	description: String,
	required: Boolean,
	min: Number,
	max: Number,
	default: Object

})

module.exports = mongoose.Model('ParamModel', ParamSchema);
