const errors = require('restify-errors')
    , List = require('../models/List')
    , Card = require('../models/Card');

/**
 * POST
 */
exports.createList = function(req, res, next) {
    if (!req.is('application/json')) {
        return next(
            new errors.InvalidContentError("Expects 'application/json'")
        );
    }

    let data = req.body || {};
    let listModel = new List(data);

    listModel.save(function(err, data) {
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
exports.updateList = function(req, res, next) {
    if (!req.is('application/json')) {
        return next(
            new errors.InvalidContentError("Expects 'application/json'")
        );
    }

    let data = req.body || {};

    if (!data._id) {
        data = Object.assign({}, data, { _id: req.params.list_id });
    }

    List.findOne({ _id: data._id }, function(err, doc) {
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

        List.update({ _id: data._id }, data, function(err) {
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
exports.deleteList = function(req, res, next) {

    const listId = req.params.list_id;

    List.findOneAndRemove({ _id: listId })
        .then(() => {

            Card.deleteMany({ list_id: listId })
                .then(() => {
                    res.send(204);
                    next()
                })
                .catch(err => {
                    console.error(err);
                    return next(new errors.InvalidContentError(err.errors.name.message));
                })
        })
        .catch(err => {
            console.error(err);
            return next(new errors.InvalidContentError(err.errors.name.message));
        })
};

/**
 * LIST
 */
exports.viewList = function(req, res, next) {
    List.apiQuery(req.params, function(err, docs) {
        if (err) {
            console.error(err);
            return next(
                new errors.InvalidContentError(err.errors.name.message)
            );
        }

        res.send(docs);
        next();
    })
};
