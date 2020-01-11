const mongoose = require("mongoose");

const pacjentSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    surname: String,
    PESEL: Number
});

module.exports = mongoose.model("Pacjent", pacjentSchema);