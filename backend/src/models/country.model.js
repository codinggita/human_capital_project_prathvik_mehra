const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema(
  {
    countryCode: {
      type: String,
      required: [true, "Country code is required"],
      unique: true,
      trim: true,
      uppercase: true,
      maxLength: 3,
    },
    countryName: {
      type: String,
      required: [true, "Country name is required"],
      trim: true,
    },
    region: {
      type: String,
      trim: true,
    },
    currency: {
      type: String,
      trim: true,
      uppercase: true,
      maxLength: 3,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

// Index for faster country lookups by name or region categorization
countrySchema.index({ countryName: 1 });
countrySchema.index({ region: 1 });

module.exports = mongoose.model("Country", countrySchema);
