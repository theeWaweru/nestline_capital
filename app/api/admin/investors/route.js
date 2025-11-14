// app/api/admin/investors/route.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import User from "@/lib/models/User";
import Booking from "@/lib/models/Booking";

export async function GET(request) {
  try {
    const session = await auth();
    if (
      !session ||
      (session.user.role !== "admin" && session.user.role !== "editor")
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Get all users with role 'user' (investors)
    const investors = await User.find({ role: "user" })
      .select("name email phone createdAt lastLogin emailVerified isActive")
      .sort({ createdAt: -1 })
      .lean();

    // Get booking count for each investor
    const investorsWithStats = await Promise.all(
      investors.map(async (investor) => {
        const bookingCount = await Booking.countDocuments({
          investor: investor._id,
        });

        const activeBookings = await Booking.countDocuments({
          investor: investor._id,
          bookingStatus: { $in: ["pending", "confirmed"] },
        });

        return {
          ...investor,
          stats: {
            totalBookings: bookingCount,
            activeBookings,
          },
        };
      })
    );

    return NextResponse.json({
      success: true,
      investors: investorsWithStats,
      total: investorsWithStats.length,
    });
  } catch (error) {
    console.error("Get investors error:", error);
    return NextResponse.json(
      { error: "Failed to fetch investors" },
      { status: 500 }
    );
  }
}
