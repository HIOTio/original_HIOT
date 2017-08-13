module.exports = {
    poll: function (sensor_id) {
        var reading = Math.random() * 100;
        return JSON.stringify({
            "reading": reading,
            "sensor_id": sensor_id,
            "Date": Date.now()
        });
    }
};
