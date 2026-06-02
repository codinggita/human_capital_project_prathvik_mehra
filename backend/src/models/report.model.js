const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    reportName: {
      type: String,
      required: [true, "Report name is required"],
      trim: true,
    },
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    filters: {
      type: mongoose.Schema.Types.Mixed, // Supports dynamic JSON filter combinations
      default: {},
    },
  },
  {
    timestamps: true, // Automatically generates createdAt required by assignment
  },
);

// Optimize queries for a user's chronological report history
reportSchema.index({ generatedBy: 1, createdAt: -1 });

module.exports = mongoose.model("Report", reportSchema);
