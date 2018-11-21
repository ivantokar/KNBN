const errors = require('restify-errors')
    , User = require('../models/User')
    , Hash = require('password-hash');

exports.createUser = function(req, res, next) {
    if (!req.is('application/json')) {
        return next(
            new errors.InvalidContentError("Expects 'application/json'")
        );
    }

    let data = req.body || {};

    User.create(data)
        .then(user => {
            res.send(200, user);
            next()
        })
        .catch(err => {
            res.send(500, err)
        });
};

exports.loginUser = (email, password, done) => {

    User.findOne({ email: email })
        .then(user => {

            if (!Hash.verify(password, user.password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }

            return done(null, user);

        }).catch(() => {
            return done(null, false, {
                message: 'Incorrect email.'
            });
        });

};
