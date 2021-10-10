const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
  reduction: { type: Number, required: true, default: 0 },
  active: { type: Boolean, required: true, default: true },
});

module.exports = mongoose.model('Product', productSchema);
