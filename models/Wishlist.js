const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    products: [
        {
            product_id: { type: String },
            quantity: { type: Number, default: 1 }
        }
    ]
},{ timestamps: true });

module.exports = mongoose.model('Wishlist',WishlistSchema);