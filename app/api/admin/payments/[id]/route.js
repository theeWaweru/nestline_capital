// app/api/admin/payments/[id]/route.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import Payment from "@/lib/models/Payment";
import Booking from "@/lib/models/Booking";
import Plot from "@/lib/models/Plot";
import mongoose from "mongoose";

// GET - Get single payment
export async function GET(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { id } = await params;

    const payment = await Payment.findById(id)
      .populate("investor", "name email phone")
      .populate("plot", "plotNumber size price")
      .populate("booking", "bookingNumber totalAmount amountPaid paymentPlan")
      .populate("verifiedBy", "name")
      .populate("rejectedBy", "name")
      .lean();

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    // Check authorization - investors can only see their own payments
    if (
      session.user.role === "user" &&
      payment.investor._id.toString() !== session.user.id
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    return NextResponse.json({
      success: true,
      payment,
    });
  } catch (error) {
    console.error("Get payment error:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment" },
      { status: 500 }
    );
  }
}

// PUT - Update payment (mainly for verification/rejection)
export async function PUT(request, { params }) {
  try {
    const session = await auth();
    if (
      !session ||
      (session.user.role !== "admin" && session.user.role !== "editor")
    ) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    await connectDB();

    const { id } = await params;

    const data = await request.json();
    const { action, notes, reason } = data;

    const payment = await Payment.findById(id);
    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    // Start a session for transaction
    const mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();

    try {
      if (action === "verify") {
        // Verify payment
        payment.verifyPayment(session.user.id, notes || "");
        await payment.save({ session: mongoSession });

        // Update booking amount paid
        const booking = await Booking.findById(payment.booking).session(
          mongoSession
        );
        if (!booking) {
          throw new Error("Booking not found");
        }

        booking.amountPaid += payment.amount;
        booking.lastModifiedBy = session.user.id;
        await booking.save({ session: mongoSession });

        // Check if payment is complete and update plot/booking status
        if (booking.isFullyPaid && booking.bookingStatus !== "completed") {
          booking.completeBooking();
          await booking.save({ session: mongoSession });

          // Update plot to booked
          await Plot.findByIdAndUpdate(
            booking.plot,
            {
              status: "booked",
              bookedBy: booking.investor,
              bookingDate: new Date(),
            },
            { session: mongoSession }
          );
        }

        await mongoSession.commitTransaction();

        return NextResponse.json({
          success: true,
          message: "Payment verified successfully",
          payment,
          bookingUpdated: true,
        });
      } else if (action === "reject") {
        if (!reason) {
          throw new Error("Rejection reason is required");
        }

        // Reject payment
        payment.rejectPayment(session.user.id, reason, notes || "");
        await payment.save({ session: mongoSession });

        await mongoSession.commitTransaction();

        return NextResponse.json({
          success: true,
          message: "Payment rejected",
          payment,
        });
      } else {
        throw new Error("Invalid action");
      }
    } catch (error) {
      await mongoSession.abortTransaction();
      throw error;
    } finally {
      mongoSession.endSession();
    }
  } catch (error) {
    console.error("Update payment error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update payment" },
      { status: 500 }
    );
  }
}

// DELETE - Delete payment (admin only)
export async function DELETE(request, { params }) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    await connectDB();

    const { id } = await params;

    const payment = await Payment.findById(id);
    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    // Cannot delete verified payments
    if (payment.paymentStatus === "verified") {
      return NextResponse.json(
        { error: "Cannot delete verified payments" },
        { status: 400 }
      );
    }

    await payment.deleteOne();

    return NextResponse.json({
      success: true,
      message: "Payment deleted successfully",
    });
  } catch (error) {
    console.error("Delete payment error:", error);
    return NextResponse.json(
      { error: "Failed to delete payment" },
      { status: 500 }
    );
  }
}
