var Schema = mongoose.Schema;

var AggregatorSchema = new Schema({
    deviceId: {
        type: Schema.Types.ObjectId,
        ref: 'Device',
        required:true
    },
    description: String,
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Device'
    },
    added: Date
});

// Compile model from schema
var AggregatorModel = mongoose.model('Aggregator', AggregatorSchema);
