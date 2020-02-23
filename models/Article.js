const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    }, 
    link: {
        type: String, 
        required: true
    }, 
    saved: {
        type: Boolean,
        required: true,
        default: false
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
});

module.exports = mongoose.model("Article", ArticleSchema)

 