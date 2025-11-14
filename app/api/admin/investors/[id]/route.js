// app/api/admin/investors/[id]/route.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import User from "@/lib/models/User";
import Booking from "@/lib/models/Booking";

export async function GET(request, { params }) {
  try {
    const session = await auth();
    if (
      !session ||
      (session.user.role !== "admin" && session.user.role !== "editor")
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { id } = params;

    // Get investor details
    const investor = await User.findById(id)
      .select("name email phone createdAt lastLogin emailVerified isActive")
      .lean();

    if (!investor) {
      return NextResponse.json(
        { error: "Investor not found" },
        { status: 404 }
      );
    }

    // Get booking statistics
    const bookingCount = await Booking.countDocuments({
      investor: id,
    });

    const activeBookings = await Booking.countDocuments({
      investor: id,
      bookingStatus: { $in: ["pending", "confirmed"] },
    });

    return NextResponse.json({
      success: true,
      investor: {
        ...investor,
        stats: {
          totalBookings: bookingCount,
          activeBookings,
        },
      },
    });
  } catch (error) {
    console.error("Get investor error:", error);
    return NextResponse.json(
      { error: "Failed to fetch investor" },
      { status: 500 }
    );
  }
}
