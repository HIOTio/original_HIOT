var Profile = require('../models/Profile');

var jwt = require('jsonwebtoken');
exports.profile_auth = function (req, res, next) {
    console.log(req.body);
    Profile.findOne({
        username: req.body.username
    }, function (err, profile) {
        if (err) {
            return next(err);
        }
        if (profile == null) {
            console.log("profile doesn't exist");
            res.setHeader('WWW-Authenticate', 'Basic realm="need login"');
            res.send(401);
        } else {
            profile.comparePassword(req.body.password, function (err, isMatch) {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                if (isMatch) {
                    var token = jwt.sign(profile, 'needToSetUpAProperSecret', {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                    });

                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
                        profile: profile
                    });
                } else {
                    res.setHeader('WWW-Authenticate', 'Basic realm="need login"');
                    res.send(401);
                }
            });
        }
    });
};
exports.profile_detail = function (req, res) {
    Profile.find({
        _id: req.params.id
    }, function (err, profile) {
        if (err) {
            return next(err);
        }
        //Successful, so render
        res.send(profile);
    });
};
exports.profile_create = function (req, res, next) {
    req.checkBody('username', 'Each profile needs a username').notEmpty();
    req.sanitize('username').escape();
    req.sanitize('username').trim();
    req.checkBody('password', 'Each profile needs a pasword').notEmpty();
    req.sanitize('password').escape();
    req.sanitize('password').trim();
    req.checkBody('firstname', 'Each profile needs a first name').notEmpty();
    req.sanitize('firstname').escape();
    req.sanitize('firstname').trim();
    req.checkBody('lastname', 'Each profile needs a last name').notEmpty();
    req.sanitize('lastname').escape();
    req.sanitize('lastname').trim();
    var errors = req.validationErrors();
    var profile = new Profile({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });
    profile.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send("Congrats, your profile has been created");
    });

};

exports.profile_delete = function (req, res) {
    Profile.findOneAndUpdate({
        _id: req.body.id
    }, {
        active: false
    }, {
        upsert: false
    }, function (err, doc) {
        if (err) return res.send(500, {
            error: err
        });
        return res.send("Profile Deleted");
    });

};
exports.profile_update = function (req, res) {
    Profile.findOneAndUpdate({
            _id: req.body.id
        }, {
            "username": req.body.username,
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
            "password": req.body.username
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
