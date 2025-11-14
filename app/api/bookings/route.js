// app/api/bookings/route.js - User booking endpoints
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import Booking from "@/lib/models/Booking";
import Plot from "@/lib/models/Plot";
import Project from "@/lib/models/Project";

// GET - Get user's bookings
export async function GET(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const bookings = await Booking.find({ investor: session.user.id })
      .populate("plot", "plotNumber size price images")
      .populate("project", "name location paymentCompletionPeriod")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Get user bookings error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

// POST - Create new booking
export async function POST(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized - Please log in" }, { status: 401 });
    }

    await connectDB();

    const data = await request.json();
    const { plotId, paymentPlan, installmentPlan } = data;

    // Validate required fields
    if (!plotId || !paymentPlan) {
      return NextResponse.json(
        { error: "Plot and payment plan are required" },
        { status: 400 }
      );
    }

    // Check if plot exists and is available
    const plot = await Plot.findById(plotId).populate("project");
    if (!plot) {
      return NextResponse.json({ error: "Plot not found" }, { status: 404 });
    }

    if (plot.status !== "available") {
      return NextResponse.json(
        { error: "This plot is not available for booking" },
        { status: 400 }
      );
    }

    // Check if user already has an active booking for this plot
    const existingBooking = await Booking.findOne({
      plot: plotId,
      investor: session.user.id,
      bookingStatus: { $in: ["pending", "confirmed"] },
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: "You already have an active booking for this plot" },
        { status: 400 }
      );
    }

    // Validate installment plan if selected
    if (paymentPlan === "installment") {
      if (
        !installmentPlan ||
        !installmentPlan.numberOfInstallments ||
        !installmentPlan.frequency
      ) {
        return NextResponse.json(
          { error: "Installment plan details are required" },
          { status: 400 }
        );
      }

      // Calculate installment amount
      installmentPlan.installmentAmount =
        Math.ceil(plot.price / installmentPlan.numberOfInstallments);
      installmentPlan.startDate = new Date();

      // Calculate next payment due based on frequency
      const daysToAdd = {
        weekly: 7,
        "bi-weekly": 14,
        monthly: 30,
        quarterly: 90,
      }[installmentPlan.frequency] || 30;

      const nextDue = new Date();
      nextDue.setDate(nextDue.getDate() + daysToAdd);
      installmentPlan.nextPaymentDue = nextDue;
    }

    // Create booking
    const booking = new Booking({
      plot: plotId,
      investor: session.user.id,
      project: plot.project._id,
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
    await booking.populate("plot", "plotNumber size price images");
    await booking.populate("project", "name location paymentCompletionPeriod");

    return NextResponse.json({
      success: true,
      message: "Booking created successfully! Please submit your initial payment (minimum 30% deposit required).",
      booking,
      minimumDeposit: Math.ceil(plot.price * 0.3),
      depositPercentage: 30,
      note: "Your plot will be reserved once you submit proof of payment. The admin will verify your payment and confirm your booking.",
    });
  } catch (error) {
    console.error("Create booking error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create booking" },
      { status: 500 }
    );
  }
}
