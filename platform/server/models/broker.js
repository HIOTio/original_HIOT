var Schema = mongoose.Schema;

var BrokerSchema = new Schema({
    deviceId: {
        type: Schema.Types.ObjectId,
        ref: 'Device',
        required: true
    },
    description: String,
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Device'
    },
    added: Date
});

// Compile model from schema
var BrokerModel = mongoose.model('Broker', BrokerSchema);
