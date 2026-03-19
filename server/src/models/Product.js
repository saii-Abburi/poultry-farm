const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    video: { type: String },
    category: { type: String, enum: ['hen', 'cock', 'chick', 'egg'], required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
