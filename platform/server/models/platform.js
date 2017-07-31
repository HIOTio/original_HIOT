var Schema = mongoose.Schema;

var PlatformSchema = new Schema({
	description: String,
	added: Date
});
PlatformSchema
	.virtual('url')
	.get(function () {
		return '/api/platform/' + this._id;
	});


// Compile model from schema
varPlatformModel = mongoose.model('Platform', PlatformSchema);
