const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email: String,
    pass: String,
    location: String
}, {
    versionKey: false
})

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
