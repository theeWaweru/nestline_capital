// lib/models/QuoteRequest.js - Quote Request Model
import mongoose from "mongoose";

const QuoteRequestSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true, minlength: 20 },
    plotIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plot",
        required: true,
      },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        "pending_verification",
        "verified",
        "expired",
        "confirmed",
        "cancelled",
      ],
      default: "pending_verification",
    },
    verificationToken: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.QuoteRequest ||
  mongoose.model("QuoteRequest", QuoteRequestSchema);
