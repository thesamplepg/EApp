const mongoose = require('mongoose');
const Event = require('./Event');

const MarkSchema = new mongoose.Schema({
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    events: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('mark', MarkSchema);