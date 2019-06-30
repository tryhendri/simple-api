const authService = require("./auth.service");

module.exports.authenticate = (req, res, next) => {
    authService
        .authenticate(req.body)
        .then(admin =>
            admin
                ? res.json(admin)
                : res
                      .status(400)
                      .json({ message: "Username or password is incorrect" })
        )
        .catch(err => next(err));
};

module.exports.register = (req, res, next) => {
    authService
        .create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
};
