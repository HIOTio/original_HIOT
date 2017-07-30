var Schema = mongoose.Schema;

var SensorSchema = new Schema({
    thing: {
        type: Schema.types.ObjectId,
        ref: 'Thing'
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
        ref: 'Thing'
    }
});

// Compile model from schema
var SensorModel = mongoose.model('Sensor', SensorSchema);
