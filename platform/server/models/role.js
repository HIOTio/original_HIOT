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
module.exports = mongoose.Model('Role', RoleSchema);
