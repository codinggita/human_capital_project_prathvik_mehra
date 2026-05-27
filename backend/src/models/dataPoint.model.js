const mongoose = require('mongoose');

const dataPointSchema = new mongoose.Schema({
  country: {
    type: String,
    ref: 'Country',
    required: true,
    uppercase: true
  },
  indicator: {
    type: String,
    ref: 'Indicator',
    required: true,
    uppercase: true
  },
  value: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true,
    min: 1800,
    max: 2100,
    index: true
  },
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  frequency: {
    type: String,
    required: true,
    enum: ['monthly'],
    default: 'monthly'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// --- INDEXES ---

// 1. Primary Compound Unique Index: Prevents duplicate monthly records per country & indicator
// and directly optimizes time-series historical query patterns.
dataPointSchema.index(
  { country: 1, indicator: 1, year: -1, month: -1 },
  { unique: true }
);

// 2. Cross-Sectional Index: Allows comparing all countries for a specific indicator and date
// sorted by value descending (for fast ranking and pagination of leaders/laggards).
dataPointSchema.index(
  { indicator: 1, year: -1, month: -1, value: -1, country: 1 }
);

const DataPoint = mongoose.model('DataPoint', dataPointSchema);
module.exports = { DataPoint };
