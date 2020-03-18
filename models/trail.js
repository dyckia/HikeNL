const mongoose = require("mongoose");

const trailSchema = new mongoose.Schema({
    name: String,
    location: String,
    image: String,
    distance: Number,
    elvagain: Number,
    type: String,
    difficulty: String,
    ratings: Number,
    description: String,
    
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("trail", trailSchema);