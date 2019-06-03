const mongoose = require("mongoose");

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

MarkSchema.methods.deleteIfThereIsNoEvent = () => {
    if (!this.events.length) {
        this.model("Mark").deleteOne({ id: this._id });
    }
};

module.exports = mongoose.model("mark", MarkSchema);
