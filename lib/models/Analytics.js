// lib/models/Analytics.js - For dashboard metrics
import mongoose from "mongoose";

const AnalyticsSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    type: {
      type: String,
      enum: ["daily", "weekly", "monthly", "quarterly"],
      required: true,
    },

    // Portfolio metrics
    portfolio: {
      totalValue: { type: Number, default: 0 },
      monthlyRevenue: { type: Number, default: 0 },
      conversionRate: { type: Number, default: 0 },
      averageDaysToSale: { type: Number, default: 0 },
    },

    // Plot metrics
    plots: {
      total: { type: Number, default: 0 },
      available: { type: Number, default: 0 },
      onHold: { type: Number, default: 0 },
      sold: { type: Number, default: 0 },
    },

    // Project metrics
    projects: {
      total: { type: Number, default: 0 },
      active: { type: Number, default: 0 },
      completed: { type: Number, default: 0 },
      planning: { type: Number, default: 0 },
    },

    // Quote requests
    quotes: {
      total: { type: Number, default: 0 },
      verified: { type: Number, default: 0 },
      pending: { type: Number, default: 0 },
      confirmed: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

AnalyticsSchema.index({ date: 1, type: 1 }, { unique: true });

export default mongoose.models.Analytics ||
  mongoose.model("Analytics", AnalyticsSchema);
