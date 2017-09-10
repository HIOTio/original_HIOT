var mongoose = require('mongoose')
var Schema= mongoose.Schema


var HandlerSchema = new Schema({
    name:String,
    aggregator:Boolean,
    controller:Boolean,
    description: String,
    path: String,
    commands: [{
        type:Schema.Types.ObjectId,
        ref:'Controller_command'
    }]
})

  HandlerSchema
      .virtual('url')
      .get(function () {
    return '/api/handler/' + this._id
  })
  
  // Compile model from schema
  module.exports = mongoose.model('Handler', HandlerSchema)
  