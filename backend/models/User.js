const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: null
    },
    createdPolls: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poll'
    }],
    votedPolls: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poll'
    }]
});

module.exports = mongoose.model('User', userSchema);
