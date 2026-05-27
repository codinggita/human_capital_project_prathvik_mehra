const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  _id: {
    type: String, // ISO alpha-3 code (e.g., "ABW") - this IS the countryCode
    required: true,
    uppercase: true,
    trim: true,
    minlength: 3,
    maxlength: 3
  },
  name: {
    type: String, // this IS the countryName
    required: true,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual aliases for API-friendly field names
countrySchema.virtual('countryCode').get(function () { return this._id; });
countrySchema.virtual('countryName').get(function () { return this.name; });

// Text index to allow text search by country name
countrySchema.index({ name: 'text' });

const Country = mongoose.model('Country', countrySchema);
module.exports = { Country };
