const mongoose = require('mongoose');
const sushiSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0.01 },
  category: { type: String, default: 'Classic' },
  image: { type: String, default: '' },
  description: { type: String, default: '' }
}, { timestamps: true });
module.exports = mongoose.model('Sushi', sushiSchema);
