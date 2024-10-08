const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users_registration', required: true },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
        quantity: { type: Number, default: 1 },
    }],
    // products: [{
    //     productId: { type: mongoose.Schema.Types.ObjectId, ref: 'led' },
    //     quantity: { type: Number, default: 1 },
    // }],
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
