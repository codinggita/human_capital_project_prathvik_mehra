const mongoose = require("mongoose");

const indicatorSchema = new mongoose.Schema(
  {
    indicatorCode: {
      type: String,
      required: [true, "Indicator code is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    indicatorName: {
      type: String,
      required: [true, "Indicator name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Index for faster aggregation by category or specific name lookup
indicatorSchema.index({ category: 1 });
indicatorSchema.index({ indicatorName: 1 });

module.exports = mongoose.model("Indicator", indicatorSchema);
