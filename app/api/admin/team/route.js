// app/api/admin/team/route.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import User from "@/lib/models/User";

export async function GET(request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Get all admin and editor users
    const teamMembers = await User.find({
      role: { $in: ["admin", "editor"] },
    })
      .select("name email role createdAt lastLogin emailVerified isActive")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      members: teamMembers,
      total: teamMembers.length,
    });
  } catch (error) {
    console.error("Get team members error:", error);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}
