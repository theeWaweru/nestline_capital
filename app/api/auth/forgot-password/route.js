// File: app/api/auth/forgot-password/route.js
// Password reset request endpoint - generates reset token and sends email
import { NextResponse } from "next/server";
import connectDB from "@/lib/database";
import User from "@/lib/models/User";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email)
      return NextResponse.json({ error: "Email required" }, { status: 400 });

    await connectDB();
    const user = await User.findOne({
      email: email.toLowerCase(),
      isActive: true,
    });

    if (user) {
      const token = user.generatePasswordResetToken();
      await user.save();
      await sendPasswordResetEmail(user.email, user.name, token);
    }

    return NextResponse.json({
      message: "If account exists, reset email sent",
    });
  } catch (error) {
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
