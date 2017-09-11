var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ControllerSchema = new Schema({
  description: String,
  name: String,
  channel: String,
  handler: {
    type: Schema.Types.ObjectId,
    ref: 'Handler'
  },
  broker: String,
  added: Date
})
ControllerSchema
	.virtual('url')
	.get(function () {
  return '/api/controller/' + this._id
})

// Compile model from schema
module.exports = mongoose.model('Controller', ControllerSchema)
