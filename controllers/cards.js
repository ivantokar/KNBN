/**
 * Module Dependencies
 */
const errors = require('restify-errors')
    , Card = require('../models/Card');

/**
 * POST
 */
exports.createCard = function(req, res, next) {
    if (!req.is('application/json')) {
        return next(
            new errors.InvalidContentError("Expects 'application/json'")
        );
    }

    let data = req.body || {};
    let cardModel = new Card(data);

    cardModel.save(function(err, data) {
        if (err) {
            console.error(err);
            return next(new errors.InternalError(err.message));
        }

        res.send(201, data);
        next();
    });
};

/**
 * UPDATE
 */
exports.updateCard = function(req, res, next) {
    if (!req.is('application/json')) {
        return next(
            new errors.InvalidContentError("Expects 'application/json'")
        );
    }

    let data = req.body || {};

    if (!data._id) {
        data = Object.assign({}, data, { _id: req.params.card_id });
    }

    Card.findOne({ _id: data._id }, function(err, doc) {
        if (err) {
            console.error(err);
            return next(
                new errors.InvalidContentError(err.errors.name.message)
            );
        } else if (!doc) {
            return next(
                new errors.ResourceNotFoundError(
                    'The resource you requested could not be found.'
                )
            );
        }

        Card.update({ _id: data._id }, data, function(err) {
            if (err) {
                console.error(err);
                return next(
                    new errors.InvalidContentError(err.errors.name.message)
                );
            }

            res.send(200, data);
            next();
        });
    });
};

/**
 * DELETE
 */
exports.deleteCard = function(req, res, next) {
    Card.remove({ _id: req.params.card_id }, function(err) {

        if (err) {
            console.error(err);
            return next(
                new errors.InvalidContentError(err.errors.name.message)
            );
        }

        res.send(204);
        next();
    });
};

/**
 * LIST
 */
exports.viewCard = function(req, res, next) {
    Card.apiQuery(req.params, function(err, docs) {
        if (err) {
            console.error(err);
            return next(
                new errors.InvalidContentError(err.errors.name.message)
            );
        }

        res.send(docs);
        next();
    });
};
