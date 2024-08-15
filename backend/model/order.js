const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Cart' },
    quantity: { type: Number, required: true }
});

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users_registration', required: true },
    cart: [cartItemSchema],
    address: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Order', orderSchema);
