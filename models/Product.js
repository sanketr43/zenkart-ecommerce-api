const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String, required: true },
    category_id: {type: String, required: true},
    size: {type: String},
    color: { type: String },
    price: {type: Number, required: true},
    rating: { type: Number, default: 0 }
},{timestamps: true});

module.exports = mongoose.model('Product',ProductSchema);