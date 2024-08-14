const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users_registration' },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
        quantity: { type: Number, default: 1 },
    }],
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
    address: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Order', orderSchema);
