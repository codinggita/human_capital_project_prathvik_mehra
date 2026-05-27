const mongoose = require('mongoose');

const indicatorSchema = new mongoose.Schema({
  _id: {
    type: String, // Indicator code (e.g., "FAO_CP_23012")
    required: true,
    uppercase: true,
    trim: true
  },
  label: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Text index to allow search by indicator label
indicatorSchema.index({ label: 'text' });

module.exports = mongoose.model('Indicator', indicatorSchema);
