const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  _id: {
    type: String, // ISO alpha-3 code (e.g., "ABW")
    required: true,
    uppercase: true,
    trim: true,
    minlength: 3,
    maxlength: 3
  },
  name: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Text index to allow text search by country name
countrySchema.index({ name: 'text' });

module.exports = mongoose.model('Country', countrySchema);
