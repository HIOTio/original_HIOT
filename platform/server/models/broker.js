var mongoose = require('mongoose')
var Schema = mongoose.Schema

var BrokerSchema = new Schema({
  topic:String, //wildcard on this topic
  description: String,
  deployment: {
    type: Schema.Types.ObjectId,
    ref:'deployment'
  },
  added: Date,
  active: Boolean
})

BrokerSchema
	.virtual('url')
	.get(function () {
  return '/api/broker/' + this._id
})

module.exports = mongoose.model('Broker', BrokerSchema)
