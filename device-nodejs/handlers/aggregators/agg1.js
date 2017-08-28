var data = []
module.exports = {
  poll: function (args) {
    console.log('fired poll from agg1')
    // TODO: collate all the readings and retuen them on the aggregator channel
    // TODO: compute min, max, mean and count
    var readings = []
    var min = 0
    var max = 0
    var mean = 0
    var count = 0
    var sensorReadings = []
    console.log(JSON.stringify(data))
    for (var i = 0; i < args.topics.length; i++) {
      if (data[args.topics[i]]) {
        sensorReadings = data[args.topics[i]]
        readings.push(sensorReadings)
        for (var j = 0; j < sensorReadings.length; j++) {
          if (count === 0) {
            min = max = mean = sensorReadings[j].reading
          }
          min = Math.min(sensorReadings[j].reading, min)
          max = Math.max(sensorReadings[j].reading, max)
          mean = ((count * mean) + sensorReadings[j].reading) / (count + 1)
          count++
        }
      }
    }
    var resp = JSON.stringify({
      date: Date.now(),
      min: min,
      max: max,
      count: count,
      mean: mean,
      readings: readings
    })
    // clear data for this aggregator
    for (var i = 0; i < args.topics.length; i++) {
      data[args.topics[i]] = []
    }
    return resp
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
    // TODO: make sure that the message contains a "reading" element
    console.log(message.reading)
    if (!data[topic]) {
      console.log('creating data array for topic ' + topic)
      data[topic] = []
    }
    data[topic].push({
      reading: message.reading,
      sensor_id: message.sensor_id,
      date: message.Data

    })
    console.log('received reading on topic' + topic)
    console.log(data)
    // TODO: need to log the message to an associative array and wait until the aggregator is polled
  }

}

function getReadings (agg) {
  return 0
}
function getAggregate (agg) {
  return 0
}
