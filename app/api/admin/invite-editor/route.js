// File: app/api/admin/invite-editor/route.js
// Admin endpoint - creates editor account and sends invitation email with temp password
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import User from "@/lib/models/User";
import { generateStrongPassword } from "@/lib/utils/passwordValidator";
import { sendEditorInvitationEmail } from "@/lib/email";

export async function POST(request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const { name, email } = await request.json();
    if (!name || !email)
      return NextResponse.json(
        { error: "Name and email required" },
        { status: 400 }
      );

    await connectDB();
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing)
      return NextResponse.json({ error: "User exists" }, { status: 400 });

    const tempPassword = generateStrongPassword();
    const editor = new User({
      name,
      email: email.toLowerCase(),
      password: tempPassword,
      role: "editor",
      emailVerified: false,
      invitedBy: session.user.id,
      invitedAt: new Date(),
    });

    const token = editor.generateVerificationToken();
    await editor.save();
    await sendEditorInvitationEmail(
      editor.email,
      editor.name,
      token,
      tempPassword
    );

    return NextResponse.json(
      { message: `Invitation sent to ${email}` },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Invite failed" }, { status: 500 });
  }
}
