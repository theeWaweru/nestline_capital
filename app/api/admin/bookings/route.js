// app/api/admin/bookings/route.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import Booking from "@/lib/models/Booking";
import Payment from "@/lib/models/Payment";
import Plot from "@/lib/models/Plot";

// GET - Get all bookings (with filtering)
export async function GET(request) {
  try {
    const session = await auth();
    if (!session || (session.user.role !== "admin" && session.user.role !== "editor")) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const investorId = searchParams.get("investor");
    const projectId = searchParams.get("project");

    await connectDB();

    // Build query
    const query = {};
    if (status) query.bookingStatus = status;
    if (investorId) query.investor = investorId;
    if (projectId) query.project = projectId;

    const bookings = await Booking.find(query)
      .populate("investor", "name email phone")
      .populate("plot", "plotNumber size price images")
      .populate("project", "name location")
      .sort({ createdAt: -1 })
      .lean();

    // Get payment counts for each booking
    const bookingsWithPayments = await Promise.all(
      bookings.map(async (booking) => {
        const paymentCount = await Payment.countDocuments({ booking: booking._id });
        const pendingPayments = await Payment.countDocuments({
          booking: booking._id,
          paymentStatus: "pending",
        });

        return {
          ...booking,
          paymentCount,
          pendingPayments,
        };
      })
    );

    return NextResponse.json({
      success: true,
      bookings: bookingsWithPayments,
      total: bookingsWithPayments.length,
    });
  } catch (error) {
    console.error("Get bookings error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

// POST - Create new booking (Admin creating on behalf of user)
export async function POST(request) {
  try {
    const session = await auth();
    if (!session || (session.user.role !== "admin" && session.user.role !== "editor")) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    await connectDB();

    const data = await request.json();
    const { plotId, investorId, projectId, paymentPlan, installmentPlan } = data;

    // Validate required fields
    if (!plotId || !investorId || !projectId || !paymentPlan) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if plot exists and is available
    const plot = await Plot.findById(plotId);
    if (!plot) {
      return NextResponse.json({ error: "Plot not found" }, { status: 404 });
    }

    if (plot.status === "booked") {
      return NextResponse.json(
        { error: "Plot is already booked" },
        { status: 400 }
      );
    }

    // Check if investor already has an active booking for this plot
    const existingBooking = await Booking.findOne({
      plot: plotId,
      investor: investorId,
      bookingStatus: { $in: ["pending", "confirmed"] },
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: "Investor already has an active booking for this plot" },
        { status: 400 }
      );
    }

    // Create booking
    const booking = new Booking({
      plot: plotId,
      investor: investorId,
      project: projectId,
      paymentPlan,
      totalAmount: plot.price,
      installmentPlan: paymentPlan === "installment" ? installmentPlan : undefined,
      createdBy: session.user.id,
    });

    await booking.save();

    // Update plot status to processing
    plot.status = "processing";
    await plot.save();

    // Populate booking for response
    await booking.populate("investor", "name email phone");
    await booking.populate("plot", "plotNumber size price");
    await booking.populate("project", "name location");

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("Create booking error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create booking" },
      { status: 500 }
    );
  }
}
