const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    author: String,
    date: Date,
    content: String,
    likes: Number,
    dislikes: Number,
    comments: Array,
    id: String
});

module.exports = model('Post', postSchema);