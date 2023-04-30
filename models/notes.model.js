const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
    title: String,
    message: Number,
    author: String,
    userId: String
}, {
    versionKey: false
})

const NoteModel = mongoose.model("note", NoteSchema);

module.exports = NoteModel;
