// File: scripts/create-admin.js
// Run once to create the first admin user
// Usage: node scripts/create-admin.js

import connectDB from "../lib/database.js";
import User from "../lib/models/User.js";

async function createAdmin() {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({
      email: "davidngari47@gmail.com",
    });
    if (existingAdmin) {
      console.log("❌ Admin user already exists");
      process.exit(0);
    }

    const admin = new User({
      name: "Admin",
      email: "davidngari47@gmail.com",
      password: "Waweru@98", // CHANGE THIS PASSWORD!
      role: "admin",
      emailVerified: true,
      isActive: true,
    });

    await admin.save();
    console.log("✅ Admin user created successfully");
    console.log("📧 Email: davidngari47@gmail.com");
    console.log("🔐 Password: Waweru@98");
    console.log("⚠️  CHANGE PASSWORD AFTER FIRST LOGIN");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
}

createAdmin();
