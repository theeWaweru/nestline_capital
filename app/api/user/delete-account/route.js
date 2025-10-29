// File: app/api/user/delete-account/route.js
// User endpoint - soft deletes user account (requires password confirmation)
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import User from "@/lib/models/User";

export async function DELETE(request) {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (session.user.role !== "user") {
      return NextResponse.json(
        { error: "Only users can self-delete" },
        { status: 403 }
      );
    }

    const { password } = await request.json();
    if (!password)
      return NextResponse.json({ error: "Password required" }, { status: 400 });

    await connectDB();
    const user = await User.findById(session.user.id).select("+password");
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const isValid = await user.comparePassword(password);
    if (!isValid)
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });

    user.isActive = false;
    user.email = `deleted_${user._id}@nestlinecapital.com`;
    await user.save();

    return NextResponse.json({ message: "Account deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
