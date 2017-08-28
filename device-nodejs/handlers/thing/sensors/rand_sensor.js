module.exports = {
  poll: function (sensor) {
    console.log('poll was called in rand_sensor for ' + sensor.channel)
    var reading = sensor.config.minValue + (Math.random() * sensor.config.range)
    return JSON.stringify({
      date: Date.now(),
      reading: reading,
      sensor_id: sensor.sensor_id
    })
  }
}
