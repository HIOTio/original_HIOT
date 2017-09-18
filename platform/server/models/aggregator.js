var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AggregatorSchema = new Schema({
  name: String,
  deployment: {
    type:Schema.Types.ObjectId,
    ref:'Deployment'
  },
  description: String,
  topic: String,
  handler: {
    type: Schema.Types.ObjectId,
    ref: 'Handler'
  },
  added: Date,
  active: Boolean,
  poll:Number
})
AggregatorSchema
	.virtual('url')
	.get(function () {
  return '/api/aggregator/' + this._id
})

// Compile model from schema
module.exports = mongoose.model('Aggregator', AggregatorSchema)
