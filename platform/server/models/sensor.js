var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SensorSchema = new Schema({
    thing: {
        type: Schema.Types.ObjectId,
        ref: 'Thing',
        required: true
    },
    description: String,
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    },
    name: String,
    active: Boolean,
    added: Date,
    pushInterval: Number,
    sensortype: {
        type: Schema.Types.ObjectId,
        ref: 'Sensor_Types'
    },
    coordinatorGroups: [{
        type: Schema.Types.ObjectId,
        ref: 'Coordinator_Groups'
	}],
    sensor_readings: [{
        type: Schema.Types.ObjectId,
        ref: 'Sensor_Reading'
	}]
});
SensorSchema
    .virtual('url')
    .get(function () {
        return '/api/sensor/' + this._id;
    });


// Compile model from schema
module.exports = mongoose.model('Sensor', SensorSchema);
