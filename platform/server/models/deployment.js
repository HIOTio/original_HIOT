var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DeploymentSchema = new Schema({
    description: String,
    added: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    }
});

DeploymentSchema
    .virtual('url')
    .get(function () {
        return '/api/deployment/' + this._id;
    });


module.exports = mongoose.model('Deployment', DeploymentSchema);
