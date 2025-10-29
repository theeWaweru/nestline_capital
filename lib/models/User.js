// File: lib/models/User.js
// User database model with authentication, roles, and email verification
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    role: {
      type: String,
      enum: ["admin", "editor", "user"],
      default: "user",
      index: true,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      select: false,
    },
    verificationTokenExpiry: {
      type: Date,
      select: false,
    },

    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpiry: {
      type: Date,
      select: false,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    invitedAt: {
      type: Date,
    },

    lastLogin: {
      type: Date,
    },

    phone: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcryptjs.genSalt(12);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcryptjs.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

// Generate verification token
UserSchema.methods.generateVerificationToken = function () {
  const crypto = require("crypto");
  const token = crypto.randomBytes(32).toString("hex");

  this.verificationToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.verificationTokenExpiry = Date.now() + 7 * 24 * 60 * 60 * 1000;

  return token;
};

// Generate password reset token
UserSchema.methods.generatePasswordResetToken = function () {
  const crypto = require("crypto");
  const token = crypto.randomBytes(32).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.resetPasswordExpiry = Date.now() + 60 * 60 * 1000;

  return token;
};

// Static method to find by credentials
UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email, isActive: true }).select(
    "+password"
  );

  if (!user) {
    throw new Error("Invalid credentials");
  }

  if (!user.emailVerified) {
    throw new Error("Please verify your email before logging in");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  user.lastLogin = new Date();
  await user.save();

  return user;
};

// Export with proper model check
const User = mongoose.models?.User || mongoose.model("User", UserSchema);
export default User;
