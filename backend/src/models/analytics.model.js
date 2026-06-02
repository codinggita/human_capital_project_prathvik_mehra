const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    metricName: {
      type: String,
      required: [true, "Metric name is required"],
      trim: true,
    },
    metricValue: {
      type: mongoose.Schema.Types.Mixed, // Flexible type (Number, String, or aggregate Object)
      required: [true, "Metric value is required"],
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed, // Flexible metadata schema attachment
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

// Index to quickly fetch specific operational metrics over time
analyticsSchema.index({ metricName: 1, generatedAt: -1 });

module.exports = mongoose.model("Analytics", analyticsSchema);
