module.exports = {
  poll: function (sensor) {
    console.log('poll was called in rand_sensor')
    var reading = sensor.config.minValue + (Math.random() * sensor.config.range)
    return JSON.stringify({
      'reading': reading,
      'sensor_id': sensor.sensor_id,
      'Date': Date.now()
    })
  }
}
