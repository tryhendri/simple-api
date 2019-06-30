const config = require("../config.json");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || config.connectionString, {
    useCreateIndex: true,
    useNewUrlParser: true
});
mongoose.connection.on("error", function(err) {
    console.log("MongoDB Connection Error");
    process.exit(-1);
});

mongoose.Promise = global.Promise;

module.exports = {
    User: require("../api/v1/user/user.model"),
    Admin: require("../api/v1/auth/auth.model")
};
