const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IntentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
            required: true,
            unique: true,
        },
        patterns: {
            type: [String],
        },
        response: {
            type: [String],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("intent", IntentSchema);
