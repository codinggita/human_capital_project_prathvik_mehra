const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema(
  {
    frequency: {
      type: String,
      required: [true, "Frequency is required"],
      trim: true,
      uppercase: true, // e.g., 'M', 'A'
      maxLength: 1,
    },
    countryCode: {
      type: String,
      required: [true, "Country code is required"],
      trim: true,
      uppercase: true,
      maxLength: 3,
    },
    countryName: {
      type: String,
      required: [true, "Country name is required"],
      trim: true,
    },
    indicatorCode: {
      type: String,
      required: [true, "Indicator code is required"],
      trim: true,
      uppercase: true,
    },
    indicatorName: {
      type: String,
      trim: true,
    },
    value: {
      type: Number,
      required: [true, "Price value is required"],
      default: null, // Handle empty dataset values gracefully without crashing
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: 1900,
      max: new Date().getFullYear() + 1,
    },
    month: {
      type: Number,
      min: 1,
      max: 12,
      default: null, // Yearly frequencies won't have a month
    },
  },
  {
    timestamps: true,
  },
);

// Compound and single indexes to optimize large dataset querying (190k+ records)
priceSchema.index({ countryCode: 1, year: 1, month: 1 });
priceSchema.index({ indicatorCode: 1 });
priceSchema.index({ year: -1 });
priceSchema.index({ value: 1 });

module.exports = mongoose.model("Price", priceSchema);
