const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    image: String,
}, { timestamps: true })

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;