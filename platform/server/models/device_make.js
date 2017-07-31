var Schema = mongoose.Schema;

var Device_MakeSchema = new Schema({
	description: String,
	added: Date
});
Device_MakeSchema
	.virtual('url')
	.get(function () {
		return '/api/device_make/' + this._id;
	});


// Compile model from schema
var Device_MakeModel = mongoose.model('Device_Make', Device_MakeSchema);