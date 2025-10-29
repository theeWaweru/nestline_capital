// File: app/api/auth/verify-email/route.js
// Email verification endpoint - validates token and activates user account
import { NextResponse } from "next/server";
import connectDB from "@/lib/database";
import User from "@/lib/models/User";
import crypto from "crypto";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    if (!token)
      return NextResponse.json({ error: "Token required" }, { status: 400 });

    await connectDB();
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      verificationToken: hashedToken,
      verificationTokenExpiry: { $gt: Date.now() },
    }).select("+verificationToken +verificationTokenExpiry");

    if (!user)
      return NextResponse.json(
        { error: "Invalid/expired token" },
        { status: 400 }
      );

    user.emailVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified! You can now login.",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
