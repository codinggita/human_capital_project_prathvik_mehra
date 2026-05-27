const mongoose = require('mongoose');

const indicatorSchema = new mongoose.Schema({
  _id: {
    type: String, // Indicator code (e.g., "FAO_CP_23012") - this IS the indicatorCode
    required: true,
    uppercase: true,
    trim: true
  },
  label: {
    type: String, // this IS the indicatorLabel
    required: true,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual aliases for API-friendly field names
indicatorSchema.virtual('indicatorCode').get(function () { return this._id; });
indicatorSchema.virtual('indicatorLabel').get(function () { return this.label; });

// Text index to allow search by indicator label
indicatorSchema.index({ label: 'text' });

const Indicator = mongoose.model('Indicator', indicatorSchema);
module.exports = { Indicator };
