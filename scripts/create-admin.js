// File: scripts/create-admin.js
// Run: node scripts/create-admin.js
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local from project root
dotenv.config({ path: join(__dirname, "..", ".env.local") });

import connectDB from "../lib/database.js";
import User from "../lib/models/User.js";

async function createAdmin() {
  try {
    await connectDB();

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
      password: "Waweru@98",
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
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

createAdmin();
