const mongoose = require("mongoose");
const User = require("../models/User")
const toDoSchema = new mongoose.Schema(
    {
        userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        toDo:{
            type: String,
            required: true
        },
        completed: { type: Boolean, default: false }
    }
);

module.exports = mongoose.model("ToDo", toDoSchema);