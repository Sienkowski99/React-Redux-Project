const { Schema, model } = require('mongoose');

const yearSchema = new Schema({
    year: Number,
    months: Array
});

module.exports = model('Year', yearSchema);