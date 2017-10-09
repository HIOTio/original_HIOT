var mongoose = require('mongoose')
var Schema = mongoose.Schema

var BrokerSchema = new Schema({
  
  broker: String,
  description: String,
  myPaths: [
      {
          in:String,
          out:String
      }
     ],
  handler: String,
  active:true,
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
