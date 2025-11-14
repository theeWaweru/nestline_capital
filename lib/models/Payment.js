// lib/models/Payment.js
import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    // References
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: [true, "Booking is required"],
      index: true,
    },
    investor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Investor is required"],
      index: true,
    },
    plot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plot",
      required: [true, "Plot is required"],
      index: true,
    },

    // Payment Details
    paymentNumber: {
      type: String,
      unique: true,
      index: true,
    },
    amount: {
      type: Number,
      required: [true, "Payment amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    paymentMethod: {
      type: String,
      enum: [
        "bank-transfer",
        "mpesa",
        "cash",
        "cheque",
        "card",
        "paypal",
        "other",
      ],
      required: [true, "Payment method is required"],
    },
    transactionReference: {
      type: String,
      trim: true,
      index: true,
    },

    // Payment Proof Screenshots
    screenshots: [
      {
        url: {
          type: String,
          required: true,
        },
        fileName: {
          type: String,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
        fileSize: {
          type: Number,
        },
      },
    ],

    // Payment Status & Verification
    paymentStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
      index: true,
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    verifiedAt: {
      type: Date,
    },
    rejectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rejectedAt: {
      type: Date,
    },
    rejectionReason: {
      type: String,
      trim: true,
    },

    // Payment Date Information
    paymentDate: {
      type: Date,
      required: [true, "Payment date is required"],
      default: Date.now,
    },
    depositedBy: {
      type: String,
      trim: true,
      required: [true, "Depositor name is required"],
    },
    depositedTo: {
      accountName: {
        type: String,
        trim: true,
      },
      accountNumber: {
        type: String,
        trim: true,
      },
      bankName: {
        type: String,
        trim: true,
      },
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
    verificationNotes: {
      type: String,
      trim: true,
    },

    // Installment Tracking (if part of installment plan)
    isInstallment: {
      type: Boolean,
      default: false,
    },
    installmentNumber: {
      type: Number,
      min: [1, "Installment number must be at least 1"],
    },
    totalInstallments: {
      type: Number,
      min: [1, "Total installments must be at least 1"],
    },

    // Receipt Information
    receiptGenerated: {
      type: Boolean,
      default: false,
    },
    receiptUrl: {
      type: String,
    },
    receiptNumber: {
      type: String,
    },

    // Metadata
    submittedBy: {
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

// Generate unique payment number before saving
PaymentSchema.pre("save", async function (next) {
  if (this.isNew && !this.paymentNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");

    // Get count of payments this month for sequential numbering
    const count = await mongoose.models.Payment.countDocuments({
      createdAt: {
        $gte: new Date(date.getFullYear(), date.getMonth(), 1),
        $lt: new Date(date.getFullYear(), date.getMonth() + 1, 1),
      },
    });

    const sequence = (count + 1).toString().padStart(4, "0");
    this.paymentNumber = `PAY${year}${month}${sequence}`;
  }

  next();
});

// Instance method to verify payment
PaymentSchema.methods.verifyPayment = function (adminId, notes = "") {
  this.paymentStatus = "verified";
  this.verifiedBy = adminId;
  this.verifiedAt = new Date();
  this.verificationNotes = notes;
  this.lastModifiedBy = adminId;
};

// Instance method to reject payment
PaymentSchema.methods.rejectPayment = function (adminId, reason, notes = "") {
  this.paymentStatus = "rejected";
  this.rejectedBy = adminId;
  this.rejectedAt = new Date();
  this.rejectionReason = reason;
  this.verificationNotes = notes;
  this.lastModifiedBy = adminId;
};

// Instance method to check if payment is verified
PaymentSchema.methods.isVerified = function () {
  return this.paymentStatus === "verified";
};

// Instance method to check if payment is pending
PaymentSchema.methods.isPending = function () {
  return this.paymentStatus === "pending";
};

// Virtual for days since submission
PaymentSchema.virtual("daysSinceSubmission").get(function () {
  const now = new Date();
  const diffTime = Math.abs(now - this.createdAt);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Virtual for verification status display
PaymentSchema.virtual("statusDisplay").get(function () {
  const statusMap = {
    pending: "Pending Verification",
    verified: "Verified",
    rejected: "Rejected",
  };
  return statusMap[this.paymentStatus] || this.paymentStatus;
});

// Compound indexes for efficient queries
PaymentSchema.index({ booking: 1, paymentStatus: 1 });
PaymentSchema.index({ investor: 1, paymentStatus: 1 });
PaymentSchema.index({ paymentDate: -1 });
PaymentSchema.index({ createdAt: -1 });
PaymentSchema.index({ paymentStatus: 1, createdAt: -1 });

// Ensure virtuals are included in JSON
PaymentSchema.set("toJSON", { virtuals: true });
PaymentSchema.set("toObject", { virtuals: true });

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
