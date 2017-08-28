var fs = require('fs')
var mqtt = require('./MQTT')
var handlers = []
var timers = []
this.addHandler = function (index, file, poll, object) {
  fs.stat(file + '.js', function (err, stat) {
    if (err == null) {
      handlers[index] = require(file)
      if (poll) {
        timers.push(setInterval(function () {
          mqtt.publish(object)
        }, object.poll))
      } else {
        // TODO: [x] handle messages to aggregators
        //TODO: receiving a broker message
      }
    } else {
      // TODO: need to broadcast a message to the coordinator/broker to send on complete config and files
      console.log(err)
    }
  })
}

this.clearHandlers = function () {
  while (timers.length) {
    // TODO: need some error handling in here
    clearInterval(timers.pop())
  }
}
this.getHandler = function (handle) {
  // TODO: error handling if handler cannot be found
  return handlers[handle]
}
module.exports = {
  addHandler: this.addHandler,
  clearHandlers: this.clearHandlers,
  getHandler: this.getHandler
}
