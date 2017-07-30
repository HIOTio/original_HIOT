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
    Deployment.findOneAndUpdate({
        _id: req.body.id
    }, {
        active: false
    }, {
        upsert: false
    }, function (err, doc) {
        if (err) return res.send(500, {
            error: err
        });
        return res.send("Deployment Deleted");
    });

};
exports.deployment_update = function (req, res) {
    console.log(req.body);
    Deployment.findOneAndUpdate({
            _id: req.body.id
        }, {
            "description": req.body.description,
            "active": req.body.active,
            "added": req.body.added
        }, {
            upsert: false
        },
        function (err, doc) {
            if (err) return res.send(500, {
                error: err
            });
            res.redirect(303, doc.url);
        });
};
