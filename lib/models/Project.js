// lib/models/Project.js
import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    totalLandSize: {
      type: String,
      required: [true, "Total land size is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["planning", "development", "ready"],
      default: "planning",
    },
    planningStartDate: {
      type: Date,
      default: null,
    },
    developmentStartDate: {
      type: Date,
      default: null,
    },
    completionDate: {
      type: Date,
      default: null,
    },
    totalPlots: {
      type: Number,
      required: [true, "Total number of plots is required"],
      min: [1, "Must have at least 1 plot"],
    },
    standardPlotSize: {
      type: String,
      required: [true, "Standard plot size is required"],
      trim: true,
    },
    priceRange: {
      min: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
        default: 0,
      },
    },
    paymentCompletionPeriod: {
      type: Number,
      default: 90,
      min: [1, "Payment period must be at least 1 day"],
    },
    investorNotes: {
      type: String,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug from name before saving
ProjectSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  next();
});

// Virtual field to count plots
ProjectSchema.virtual("plotCount", {
  ref: "Plot",
  localField: "_id",
  foreignField: "project",
  count: true,
});

// Ensure virtuals are included when converting to JSON
ProjectSchema.set("toJSON", { virtuals: true });
ProjectSchema.set("toObject", { virtuals: true });

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
