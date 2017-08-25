module.exports = {
  poll: function (sensor) {
    var reading = sensor.config.minValue + (Math.random() * sensor.config.range)
    return JSON.stringify({
      'reading': reading,
      'sensor_id': sensor.sensor_id,
      'Date': Date.now()
    })
  }
}
