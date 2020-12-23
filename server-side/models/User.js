const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    login: String,
    password: String,
    email: String,
    registrationDate: Date,
    friendsList: Array,
    notifications: Array
});

module.exports = model('User', userSchema);
