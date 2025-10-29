// File: app/api/auth/register/route.js
// User registration endpoint - creates new user account and sends verification email
import { NextResponse } from "next/server";
import connectDB from "@/lib/database";
import User from "@/lib/models/User";
import { validatePassword } from "@/lib/utils/passwordValidator";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    const passwordCheck = validatePassword(password);
    if (!passwordCheck.isValid) {
      return NextResponse.json(
        { error: passwordCheck.errors.join(", ") },
        { status: 400 }
      );
    }

    await connectDB();
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const user = new User({
      name,
      email: email.toLowerCase(),
      password,
      role: "user",
      emailVerified: false,
    });
    const token = user.generateVerificationToken();
    await user.save();
    await sendVerificationEmail(user.email, user.name, token);

    return NextResponse.json(
      { message: "Check your email to verify" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
