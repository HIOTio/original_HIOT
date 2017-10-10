
var db = require('./db')
var _ch
module.exports = function( client, channels) {
  //list of all topics

    client.on('connect', function () {
      for(_ch in channels){
        client.subscribe(channels[_ch].topic)
        console.log("M2m subscribed to " + channels[_ch].topic)
      }
    })

    client.on('message', function (topic,message) {
      var _top=topic.slice(0,1)
      channel=channels[_top]
      console.log("m2m message received on topic :" + topic + " processing under " + channel.topic)
      if(channel.model){
        var model= new require('./models/'+channel.model)(JSON.parse(message.toString()))
        model.save(function(err,_model){

        })
        console.log("m2m saving to DB")
        }
        
      })

    client.on('error', function (err) {
    //  console.log(err)
    })


}