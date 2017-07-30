var Schema = mongoose.Schema;

var DeviceSchema = new Schema({
    deviceId: {
        type: String,
        required: true,
        uppercase: true,
        minlength: 16,
        maxlength: 16
    },
    make: {
        type: Schema.Types.ObjectId,
        ref: 'Device_make'
    },
    model: {
        type: Schema.Types.ObjectId,
        ref: 'Device_model'
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    }
});

// Compile model from schema
var DeviceModel = mongoose.model('Device', DeviceSchema);
