module.exports = {
  handleMessage: function (topic, message) {
    var command = message
    try {
    } catch (e) {
      // not valid command -> just ignore it for now
      console.log(e)
    }
  }
}
