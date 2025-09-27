// app/api/analytics/dashboard/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/database";
import { calculateDashboardStats } from "@/lib/analytics";

export async function GET() {
  try {
    await connectDB();
    const stats = await calculateDashboardStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Dashboard analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard analytics" },
      { status: 500 }
    );
  }
}
