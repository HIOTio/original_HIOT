var Schema = mongoose.Schema;

var ThingSchema = new Schema({
    deviceId: {
        type: Schema.Types.ObjectId,
        ref: 'Device',
        required: true
    },
    description: String,
    name: String,
    active: Boolean,
    added: Date,
    pushInterval: Number,
    aggregator: {
        type: Schema.Types.ObjectId,
        ref: 'Device'
    },
    broker: {
        type: Schema.Types.ObjectId,
        ref: 'Device'
    }
});

// Compile model from schema
var ThingModel = mongoose.model('Thing', ThingSchema);
