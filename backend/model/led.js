const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const productSchema = new mongoose.Schema({
    "Product Type": { type: String, required: true },
    Brand: { type: String, required: true },
    Price: { type: String, required: true },
    Rating: { type: String,required:true },
    Image: { type: String, required: true },
 });
const LED = mongoose.model('led', productSchema);

module.exports = LED;