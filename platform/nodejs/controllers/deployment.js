var Deployment = require('../models/Deployment');

exports.deployment_list = function (req, res) {
    Deployment.find({}, function (err, list_deployments) {
        if (err) {
            return next(err);
        }
        //Successful, so render
        res.send(list_deployments);
    });
};
exports.deployment_detail = function (req, res) {
    Deployment.find({
        _id: req.params.id
    }, function (err, deployment) {
        if (err) {
            return next(err);
        }
        //Successful, so render
        res.send(deployment);
    });
};
exports.deployment_create = function (req, res) {
    req.checkBody('description', 'Each deployment needs a description').notEmpty();
    req.sanitize('description').escape();
    req.sanitize('description').trim();
    var errors = req.validationErrors();
    var deployment = new Deployment({
        description: req.body.description
    });
    deployment.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect(deployment.url);
    });

};
exports.deployment_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: Deployment delete GET');
};
exports.deployment_update = function (req, res) {
    res.send('NOT IMPLEMENTED: deployment update GET');
};
