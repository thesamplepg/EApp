const mongoose = require("mongoose");
const Event = require("./Event");

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    events: {
        type: Array,
        default: []
    },
    avatar: {
        url: {
            type: String,
            default: "https://atnpolis.kg/image/default_user.png"
        },
        id: {
            type: String,
            default: ""
        }
    }
});

module.exports = mongoose.model("user", UserSchema);
