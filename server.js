const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const jwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");
const routes = require("./routes");

const app = express();

var redisClient = require("redis").createClient;
var redis = redisClient(6379, "localhost");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use("/api/v1", require("./api/v1/index"));

// global error handler
app.use(errorHandler);

// start server
const port =
    process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
const server = app.listen(port, function() {
    console.log("Server listening on port " + port);
});
