var Schema = mongoose.Schema;

var LocationSchema = new Schema({
    description: String,
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    },
    added: Date
});

// Compile model from schema
var LocationModel = mongoose.model('Location', LocationSchema);
