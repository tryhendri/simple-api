const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    userName: { type: String, unique: true, required: true },
    accountNumber: { type: String, required: true },
    emailAddress: { type: String, unique: true, required: true },
    identityNumber: { type: String, required: true }
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", schema);
