const mongoose = require('mongoose');

const UsersDataSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    books: [
        {
            id: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            cover: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            read: {
                type: Boolean,
                required: true,
            },
            favorite: {
                type: Boolean,
                required: true,
            },
            planning: {
                type: Boolean,
                required: true,
            }
        }
    ]
});

module.exports = mongoose.model('Users', UsersDataSchema);