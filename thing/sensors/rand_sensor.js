module.exports = {
    poll: function (sensor) {
        var reading = Math.random() * 100;
        return JSON.stringify({
            "reading": reading,
            "sensor_id": sensor.sensor_id,
            "Date": Date.now()
        });
    }
};
