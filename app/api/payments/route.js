// app/api/payments/route.js - User payment submission
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import Payment from "@/lib/models/Payment";
import Booking from "@/lib/models/Booking";
import Plot from "@/lib/models/Plot";

const MINIMUM_DEPOSIT_PERCENTAGE = 0.30; // 30%

// GET - Get user's payments
export async function GET(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get("booking");

    await connectDB();

    const query = { investor: session.user.id };
    if (bookingId) query.booking = bookingId;

    const payments = await Payment.find(query)
      .populate("booking", "bookingNumber totalAmount amountPaid paymentPlan")
      .populate("plot", "plotNumber")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      payments,
    });
  } catch (error) {
    console.error("Get user payments error:", error);
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 });
  }
}

// POST - Submit payment with screenshot
export async function POST(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized - Please log in" }, { status: 401 });
    }

    await connectDB();

    const data = await request.json();
    const {
      bookingId,
      amount,
      paymentMethod,
      transactionReference,
      screenshots,
      paymentDate,
      depositedBy,
      depositedTo,
      investorNotes,
    } = data;

    // Validate required fields
    if (!bookingId || !amount || !paymentMethod || !screenshots || screenshots.length === 0) {
      return NextResponse.json(
        { error: "Booking, amount, payment method, and at least one screenshot are required" },
        { status: 400 }
      );
    }

    // Validate amount
    if (amount <= 0) {
      return NextResponse.json(
        { error: "Payment amount must be greater than 0" },
        { status: 400 }
      );
    }

    // Get booking and verify ownership
    const booking = await Booking.findById(bookingId).populate("plot");
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.investor.toString() !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized - This is not your booking" },
        { status: 403 }
      );
    }

    // Check if booking is still active
    if (booking.bookingStatus === "cancelled") {
      return NextResponse.json(
        { error: "Cannot submit payment for a cancelled booking" },
        { status: 400 }
      );
    }

    if (booking.bookingStatus === "completed") {
      return NextResponse.json(
        { error: "This booking is already fully paid and completed" },
        { status: 400 }
      );
    }

    // Validate minimum deposit for first payment (30% requirement)
    const isFirstPayment = booking.amountPaid === 0;
    const minimumDeposit = Math.ceil(booking.totalAmount * MINIMUM_DEPOSIT_PERCENTAGE);

    if (isFirstPayment && amount < minimumDeposit) {
      return NextResponse.json(
        {
          error: `Minimum 30% deposit required`,
          details: `Your first payment must be at least KES ${minimumDeposit.toLocaleString()} (30% of KES ${booking.totalAmount.toLocaleString()})`,
          minimumRequired: minimumDeposit,
          percentageRequired: 30,
          amountProvided: amount,
          shortfall: minimumDeposit - amount,
          contactInfo: "For any queries, please contact us at admin@nestlinecapital.com",
        },
        { status: 400 }
      );
    }

    // Check if payment exceeds remaining amount
    if (amount > booking.amountRemaining) {
      return NextResponse.json(
        {
          error: "Payment amount exceeds remaining balance",
          amountRemaining: booking.amountRemaining,
        },
        { status: 400 }
      );
    }

    // Determine if this is an installment payment
    let installmentInfo = {};
    if (booking.paymentPlan === "installment") {
      const paidInstallments = await Payment.countDocuments({
        booking: bookingId,
        paymentStatus: "verified",
      });

      installmentInfo = {
        isInstallment: true,
        installmentNumber: paidInstallments + 1,
        totalInstallments: booking.installmentPlan?.numberOfInstallments || 1,
      };
    }

    // Create payment
    const payment = new Payment({
      booking: bookingId,
      investor: session.user.id,
      plot: booking.plot._id,
      amount,
      paymentMethod,
      transactionReference: transactionReference || "",
      screenshots: screenshots.map((screenshot) => ({
        url: screenshot.url,
        fileName: screenshot.fileName || "",
        fileSize: screenshot.fileSize || 0,
        uploadedAt: new Date(),
      })),
      paymentDate: paymentDate ? new Date(paymentDate) : new Date(),
      depositedBy: depositedBy || session.user.name,
      depositedTo: depositedTo || {},
      investorNotes: investorNotes || "",
      ...installmentInfo,
      submittedBy: session.user.id,
    });

    await payment.save();

    // Populate for response
    await payment.populate("booking", "bookingNumber totalAmount amountPaid");
    await payment.populate("plot", "plotNumber");

    return NextResponse.json({
      success: true,
      message: "Payment submitted successfully! Your payment is pending admin verification.",
      payment,
      bookingStatus: {
        totalAmount: booking.totalAmount,
        amountPaid: booking.amountPaid,
        amountRemaining: booking.amountRemaining,
        paymentProgress: booking.paymentProgress,
      },
      nextSteps: [
        "Admin will review your payment screenshot",
        "You will receive an email notification once verified",
        `Payment deadline: ${booking.installmentPlan?.nextPaymentDue || 'Check your booking details'}`,
        "For queries, contact: admin@nestlinecapital.com",
      ],
    });
  } catch (error) {
    console.error("Submit payment error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit payment" },
      { status: 500 }
    );
  }
}
