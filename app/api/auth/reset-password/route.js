// File: app/api/auth/reset-password/route.js
// Password reset endpoint - validates token and updates user password
import { NextResponse } from "next/server";
import connectDB from "@/lib/database";
import User from "@/lib/models/User";
import { validatePassword } from "@/lib/utils/passwordValidator";
import crypto from "crypto";

export async function POST(request) {
  try {
    const { token, password } = await request.json();
    if (!token || !password)
      return NextResponse.json(
        { error: "Token and password required" },
        { status: 400 }
      );

    const passwordCheck = validatePassword(password);
    if (!passwordCheck.isValid) {
      return NextResponse.json(
        { error: passwordCheck.errors.join(", ") },
        { status: 400 }
      );
    }

    await connectDB();
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpiry: { $gt: Date.now() },
    }).select("+resetPasswordToken +resetPasswordExpiry");

    if (!user)
      return NextResponse.json(
        { error: "Invalid/expired token" },
        { status: 400 }
      );

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: "Password reset successful!" });
  } catch (error) {
    return NextResponse.json({ error: "Reset failed" }, { status: 500 });
  }
}
