var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DeploymentSchema = new Schema({
    description: String,
    added: Date
});

DeploymentSchema
    .virtual('url')
    .get(function () {
        return '/deployment/' + this._id;
    });


module.exports = mongoose.model('Deployment', DeploymentSchema);
