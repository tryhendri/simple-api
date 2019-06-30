const userService = require("./user.service");

module.exports.add = function(req, res, next) {
    userService
        .create(req.body)
        .then(() =>
            res.json({ message: `added ${req.body.userName} successfully` })
        )
        .catch(err => next(err));
};

module.exports.getAll = function(req, res, next) {
    userService
        .getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
};

module.exports.getById = function(req, res, next) {
    userService
        .getById(req.params.id)
        .then(user => (user ? res.json(user) : res.sendStatus(404)))
        .catch(err => next(err));
};

module.exports.update = function(req, res, next) {
    userService
        .update(req.params.id, req.body)
        .then(() =>
            res.json({ message: `updated ${req.body.userName} successfully` })
        )
        .catch(err => next(err));
};

module.exports.remove = function(req, res, next) {
    userService
        .delete(req.params.id)
        .then(() => res.json({ message: "Deleted succesfully " }))
        .catch(err => next(err));
};

module.exports.findByKeyName = function(req, res, next) {
    const name = req.body.keyName;
    const value = req.body.keyValue;

    const obj = {};
    obj[name] = value;

    userService
        .findByKeyName(obj)
        .then(user => (user ? res.json(user) : res.sendStatus(404)))
        .catch(err => next(err));
};
