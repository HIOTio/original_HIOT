var mongoose = require('mongoose');
var Schema = mongoose.Schema;

RoleSchema = new Schema({
	deployment: {
		type: Schema.Types.ObjectId,
		ref: 'Deployment'
	},
	profile: {
		type: Schema.Types.ObjectId,
		ref: 'Profile'
	},
	role: {
		type: Schema.Types.ObjectId,
		ref: 'Role'
	},
	active: Boolean,
	added: {
		type: Date,
		default.Date.now
	}
});
RoleSchema
	.virtual('url')
	.get(function () {
		return '/api/role/' + this._id;
	});
module.exports = mongoose.Model('Role', RoleSchema);
