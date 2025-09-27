// lib/models/Plot.js - Plot Model
import mongoose from "mongoose";

const PlotSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    plotNumber: { type: Number, required: true },
    price: { type: Number, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    images: [{ type: String }],
    description: { type: String, default: "" },
    size: { type: String, default: "50x100 feet" },
    status: {
      type: String,
      enum: ["available", "requested", "confirmed", "sold"],
      default: "available",
    },
  },
  { timestamps: true }
);

// Compound index for unique plot numbers within projects
PlotSchema.index({ projectId: 1, plotNumber: 1 }, { unique: true });

export default mongoose.models.Plot || mongoose.model("Plot", PlotSchema);
