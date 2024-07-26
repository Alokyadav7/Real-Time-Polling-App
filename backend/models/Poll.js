const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    question: String,
    options: [{ text: String, votes: Number }],
    comments: [{
        user: String,
        text: String,
        replies: [{
            user: String,
            text: String,
        }],
    }],
});

module.exports = mongoose.model('Poll', pollSchema);
