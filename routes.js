"use strict";

module.exports = function(app) {
    app.use("/api/v1", require("./api/v1/index"));
};
