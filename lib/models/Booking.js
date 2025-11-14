// lib/models/Booking.js
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    // References
    plot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plot",
      required: [true, "Plot is required"],
      index: true,
    },
    investor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Investor is required"],
      index: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Project is required"],
      index: true,
    },

    // Booking Details
    bookingNumber: {
      type: String,
      unique: true,
      index: true,
    },
    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
      index: true,
    },

    // Payment Plan
    paymentPlan: {
      type: String,
      enum: ["full", "installment"],
      required: [true, "Payment plan is required"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount cannot be negative"],
    },
    amountPaid: {
      type: Number,
      default: 0,
      min: [0, "Amount paid cannot be negative"],
    },
    amountRemaining: {
      type: Number,
      default: 0,
      min: [0, "Amount remaining cannot be negative"],
    },

    // Installment Details (if applicable)
    installmentPlan: {
      numberOfInstallments: {
        type: Number,
        min: [1, "Must have at least 1 installment"],
      },
      installmentAmount: {
        type: Number,
        min: [0, "Installment amount cannot be negative"],
      },
      frequency: {
        type: String,
        enum: ["weekly", "bi-weekly", "monthly", "quarterly"],
      },
      startDate: {
        type: Date,
      },
      nextPaymentDue: {
        type: Date,
      },
    },

    // Status Management
    confirmedAt: {
      type: Date,
    },
    confirmedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    cancelledAt: {
      type: Date,
    },
    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    cancellationReason: {
      type: String,
      trim: true,
    },
    completedAt: {
      type: Date,
    },

    // Notes and Communication
    investorNotes: {
      type: String,
      trim: true,
    },
    adminNotes: {
      type: String,
      trim: true,
    },

    // Metadata
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lastModifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Generate unique booking number before saving
BookingSchema.pre("save", async function (next) {
  if (this.isNew && !this.bookingNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");

    // Get count of bookings this month for sequential numbering
    const count = await mongoose.models.Booking.countDocuments({
      createdAt: {
        $gte: new Date(date.getFullYear(), date.getMonth(), 1),
        $lt: new Date(date.getFullYear(), date.getMonth() + 1, 1),
      },
    });

    const sequence = (count + 1).toString().padStart(4, "0");
    this.bookingNumber = `BK${year}${month}${sequence}`;
  }

  // Calculate amount remaining
  if (this.isModified("amountPaid") || this.isModified("totalAmount")) {
    this.amountRemaining = this.totalAmount - this.amountPaid;
  }

  next();
});

// Virtual for checking if booking is fully paid
BookingSchema.virtual("isFullyPaid").get(function () {
  return this.amountPaid >= this.totalAmount;
});

// Virtual for payment progress percentage
BookingSchema.virtual("paymentProgress").get(function () {
  return this.totalAmount > 0
    ? Math.round((this.amountPaid / this.totalAmount) * 100)
    : 0;
});

// Instance method to confirm booking
BookingSchema.methods.confirmBooking = function (adminId) {
  this.bookingStatus = "confirmed";
  this.confirmedAt = new Date();
  this.confirmedBy = adminId;
  this.lastModifiedBy = adminId;
};

// Instance method to cancel booking
BookingSchema.methods.cancelBooking = function (adminId, reason) {
  this.bookingStatus = "cancelled";
  this.cancelledAt = new Date();
  this.cancelledBy = adminId;
  this.cancellationReason = reason;
  this.lastModifiedBy = adminId;
};

// Instance method to complete booking
BookingSchema.methods.completeBooking = function () {
  this.bookingStatus = "completed";
  this.completedAt = new Date();
};

// Compound indexes for efficient queries
BookingSchema.index({ investor: 1, bookingStatus: 1 });
BookingSchema.index({ plot: 1, bookingStatus: 1 });
BookingSchema.index({ project: 1, bookingStatus: 1 });
BookingSchema.index({ createdAt: -1 });

// Ensure virtuals are included in JSON
BookingSchema.set("toJSON", { virtuals: true });
BookingSchema.set("toObject", { virtuals: true });

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
