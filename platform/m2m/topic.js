
var db = require('./db')

module.exports = function( client, channel) {

    client.on('connect', function () {
      client.subscribe(channel.topic)
    })

    client.on('message', function (channel) {
      var topic=channel.topic
      var model=require('./models/'+channel.model)
      if(model){
      DBObject.create(JSON.parse(message.toString()), function (err, readings) {
    //   console.log("received message on topic '" + topic.toString() + "'")
        if (err) {
                  // need to raise an event on the platform
    //     console.log(err)
        } else {

        }
      })
    }
    })
    client.on('error', function (err) {
    //  console.log(err)
    })


}