// app/api/admin/bookings/[id]/route.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import Booking from "@/lib/models/Booking";
import Payment from "@/lib/models/Payment";
import Plot from "@/lib/models/Plot";

// GET - Get single booking
export async function GET(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const booking = await Booking.findById(params.id)
      .populate("investor", "name email phone")
      .populate("plot", "plotNumber size price images")
      .populate("project", "name location paymentCompletionPeriod")
      .populate("confirmedBy", "name")
      .populate("cancelledBy", "name")
      .lean();

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Check authorization - investors can only see their own bookings
    if (
      session.user.role === "user" &&
      booking.investor._id.toString() !== session.user.id
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Get all payments for this booking
    const payments = await Payment.find({ booking: params.id })
      .populate("verifiedBy", "name")
      .populate("rejectedBy", "name")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      booking,
      payments,
    });
  } catch (error) {
    console.error("Get booking error:", error);
    return NextResponse.json({ error: "Failed to fetch booking" }, { status: 500 });
  }
}

// PUT - Update booking
export async function PUT(request, { params }) {
  try {
    const session = await auth();
    if (!session || (session.user.role !== "admin" && session.user.role !== "editor")) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    await connectDB();

    const data = await request.json();
    const { action, ...updateData } = data;

    const booking = await Booking.findById(params.id);
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Handle specific actions
    if (action === "confirm") {
      booking.confirmBooking(session.user.id);
      await booking.save();

      return NextResponse.json({
        success: true,
        message: "Booking confirmed successfully",
        booking,
      });
    } else if (action === "cancel") {
      const { reason } = updateData;
      if (!reason) {
        return NextResponse.json(
          { error: "Cancellation reason is required" },
          { status: 400 }
        );
      }

      booking.cancelBooking(session.user.id, reason);
      await booking.save();

      // Update plot status back to available
      await Plot.findByIdAndUpdate(booking.plot, {
        status: "available",
        bookedBy: null,
        bookingDate: null,
      });

      return NextResponse.json({
        success: true,
        message: "Booking cancelled successfully",
        booking,
      });
    } else if (action === "complete") {
      // Check if fully paid
      if (!booking.isFullyPaid) {
        return NextResponse.json(
          { error: "Cannot complete booking - payment not fully received" },
          { status: 400 }
        );
      }

      booking.completeBooking();
      await booking.save();

      // Update plot status to booked
      await Plot.findByIdAndUpdate(booking.plot, {
        status: "booked",
        bookedBy: booking.investor,
        bookingDate: new Date(),
      });

      return NextResponse.json({
        success: true,
        message: "Booking completed successfully",
        booking,
      });
    }

    // General update
    Object.assign(booking, updateData);
    booking.lastModifiedBy = session.user.id;
    await booking.save();

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("Update booking error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update booking" },
      { status: 500 }
    );
  }
}

// DELETE - Delete booking
export async function DELETE(request, { params }) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    await connectDB();

    const booking = await Booking.findById(params.id);
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Check if there are verified payments
    const verifiedPayments = await Payment.countDocuments({
      booking: params.id,
      paymentStatus: "verified",
    });

    if (verifiedPayments > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete booking with ${verifiedPayments} verified payments. Cancel the booking instead.`,
        },
        { status: 400 }
      );
    }

    // Delete all pending/rejected payments
    await Payment.deleteMany({
      booking: params.id,
      paymentStatus: { $in: ["pending", "rejected"] },
    });

    // Delete booking
    await booking.deleteOne();

    // Update plot status back to available
    await Plot.findByIdAndUpdate(booking.plot, {
      status: "available",
      bookedBy: null,
      bookingDate: null,
    });

    return NextResponse.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("Delete booking error:", error);
    return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 });
  }
}
