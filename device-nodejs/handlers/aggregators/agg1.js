module.exports = {
  poll: function (args) {
    console.log('fired poll from agg1')
    return JSON.stringify({
      'id': 'test'
    })
  },
  message: function (args) {
    console.log(args.channel)
    return JSON.stringify({
      'aggregates': getAggregate(args),
      'readings': getReadings(args)
    })
  },
  parse: function (message, sensor) {
    console.log(sensor)
    console.log(message.toString())
  },
  handleMessage: function (topic, message) {
    console.log('received reading on topic' + topic)
    // TODO: need to log the message to an associative array and wait until the aggregator is polled
  }

}

function getReadings (agg) {
  return 0
}

function getAggregate (agg) {
  return 0
}
