var mongoose = require('mongoose')
var Schema = mongoose.Schema

var DeploymentSchema = new Schema({
  description: String,
  name: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },

<<<<<<< HEAD
	added: {
		type: Date,
		default: Date.now
	},
	active: {
		type: Boolean,
		default: true
	},
	deploymentType: {
		type: Schema.Types.ObjectId,
		ref: 'DeploymentType'
	},
	dtValues: String
});
=======
  added: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  }
})
>>>>>>> 6feee323f9b8b17ede5d34a875baabf70f5202c0

DeploymentSchema
	.virtual('url')
	.get(function () {
  return '/api/deployment/' + this._id
})

module.exports = mongoose.model('Deployment', DeploymentSchema)
