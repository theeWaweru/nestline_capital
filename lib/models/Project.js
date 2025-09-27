// lib/models/Project.js - Project Model
import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    location: {
      county: { type: String, required: true },
      address: { type: String, required: true },
      coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    },
    totalPlots: { type: Number, required: true },
    totalArea: { type: Number, required: true }, // in acres
    developmentType: {
      type: String,
      enum: ["residential", "commercial", "mixed"],
      required: true,
    },
    developmentPhase: {
      type: String,
      enum: ["Phase 1", "Phase 2", "Phase 3", "Phase 4"],
      required: true,
    },
    restrictions: { type: String, required: true },
    status: {
      type: String,
      enum: ["planning", "development", "ready", "completed"],
      default: "planning",
    },
    // Financial tracking
    totalValue: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
    budgetUsed: { type: Number, default: 0 },
    completionPercentage: { type: Number, default: 0 },
    // Timeline
    startDate: { type: Date },
    expectedCompletion: { type: Date },
    // Health metrics
    riskLevel: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    plotsSold: { type: Number, default: 0 },
    plotsAvailable: { type: Number, default: 0 },
    plotsOnHold: { type: Number, default: 0 },
    averageDaysToSale: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Virtual for completion rate
ProjectSchema.virtual("salesCompletionRate").get(function () {
  return this.totalPlots > 0 ? (this.plotsSold / this.totalPlots) * 100 : 0;
});

// Update project metrics when plots change
ProjectSchema.methods.updateMetrics = async function () {
  const Plot = mongoose.model("Plot");
  const plots = await Plot.find({ projectId: this._id });

  this.plotsAvailable = plots.filter((p) => p.status === "available").length;
  this.plotsOnHold = plots.filter((p) => p.status === "requested").length;
  this.plotsSold = plots.filter((p) => p.status === "sold").length;
  this.totalValue = plots.reduce((sum, plot) => sum + plot.price, 0);

  await this.save();
};

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
