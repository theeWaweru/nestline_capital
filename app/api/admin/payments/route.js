// app/api/admin/payments/route.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import Payment from "@/lib/models/Payment";

// GET - Get all payments (with filtering)
export async function GET(request) {
  try {
    const session = await auth();
    if (!session || (session.user.role !== "admin" && session.user.role !== "editor")) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const bookingId = searchParams.get("booking");
    const investorId = searchParams.get("investor");

    await connectDB();

    // Build query
    const query = {};
    if (status) query.paymentStatus = status;
    if (bookingId) query.booking = bookingId;
    if (investorId) query.investor = investorId;

    const payments = await Payment.find(query)
      .populate("investor", "name email phone")
      .populate("plot", "plotNumber")
      .populate("booking", "bookingNumber totalAmount amountPaid")
      .populate("verifiedBy", "name")
      .populate("rejectedBy", "name")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      payments,
      total: payments.length,
    });
  } catch (error) {
    console.error("Get payments error:", error);
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 });
  }
}
