// lib/models/Plot.js
import mongoose from "mongoose";

const PlotSchema = new mongoose.Schema(
  {
    plotNumber: {
      type: String,
      required: [true, "Plot number is required"],
      trim: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Project is required"],
    },
    size: {
      type: String,
      required: [true, "Plot size is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        isThumbnail: {
          type: Boolean,
          default: false,
        },
        order: {
          type: Number,
          default: 0,
        },
      },
    ],
    titleDeed: {
      url: {
        type: String,
        default: null,
      },
      fileName: {
        type: String,
        default: null,
      },
      uploadedAt: {
        type: Date,
        default: null,
      },
    },
    coordinates: {
      corner1: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
      corner2: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
      corner3: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
      corner4: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    },
    // Basic features and amenities
    features: {
      type: String,
      default: "",
    },
    amenities: {
      type: String,
      default: "",
    },
    // Additional detailed fields
    infrastructure: {
      type: String,
      default: "",
    },
    topography: {
      type: String,
      enum: ["", "flat", "gently-sloped", "hilly", "elevated", "valley"],
      default: "",
    },
    soilType: {
      type: String,
      enum: ["", "sandy", "clay", "loamy", "rocky", "mixed"],
      default: "",
    },
    developmentStatus: {
      type: String,
      enum: [
        "",
        "surveyed-only",
        "pegged",
        "cleared",
        "fenced",
        "partially-developed",
        "ready-to-build",
      ],
      default: "",
    },
    viewOrientation: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["draft", "available", "processing", "booked"],
      default: "draft",
    },
    visibility: {
      type: Boolean,
      default: false,
    },
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    bookingDate: {
      type: Date,
      default: null,
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

// Compound index to ensure unique plot numbers within a project
PlotSchema.index({ plotNumber: 1, project: 1 }, { unique: true });

// Auto-set visibility based on title deed and status
PlotSchema.pre("save", function (next) {
  if (this.isModified("titleDeed") || this.isModified("status")) {
    // Plot is visible only if it has a title deed and status is available
    this.visibility = this.titleDeed?.url && this.status === "available";
  }
  next();
});

export default mongoose.models.Plot || mongoose.model("Plot", PlotSchema);
