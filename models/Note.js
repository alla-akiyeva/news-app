const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    articleId: Number,
    title: String,
    date: String,
    body: String
});

module.exports = mongoose.model("Note", NoteSchema);