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
  }
}

function getReadings (agg) {
  return 0
}

function getAggregate (agg) {
  return 0
}
