// lib/models/Project.js - Project Model
import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    totalPlots: { type: Number, required: true },
    totalArea: { type: Number, required: true },
    developmentType: {
      type: String,
      enum: ["residential", "commercial", "mixed"],
      required: true,
    },
    restrictions: { type: String, required: true },
    status: {
      type: String,
      enum: ["planning", "development", "ready", "completed"],
      default: "planning",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
