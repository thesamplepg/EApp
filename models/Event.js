const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    creater: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    image: {
        img: { type: String, default: "imagesr" },
        imgId: { type: String, default: "" }
    },
    mambers: {
        type: Array,
        default: []
    },
    mark: {
        longitude: {
            type: Number,
            require: true
        },
        latitude: {
            type: Number,
            require: true
        }
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("event", EventSchema);
