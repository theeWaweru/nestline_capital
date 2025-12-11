// app/api/admin/dashboard/stats/route.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import Project from "@/lib/models/Project";
import Plot from "@/lib/models/Plot";
import User from "@/lib/models/User";
import Payment from "@/lib/models/Payment";
import Booking from "@/lib/models/Booking";
import ContactSubmission from "@/lib/models/ContactSubmission";

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

    // Get all stats in parallel for better performance
    const [
      totalProjects,
      projectsByStatus,
      totalPlots,
      plotsByStatus,
      totalInvestors,
      recentInvestors,
      pendingPayments,
      verifiedPayments,
      totalBookings,
    ] = await Promise.all([
      // Total projects
      Project.countDocuments(),

      // Projects by status
      Project.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]),

      // Total plots
      Plot.countDocuments(),

      // Plots by status
      Plot.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]),

      // Total investors (role: user)
      User.countDocuments({ role: "user" }),

      // Recent investors (last 30 days)
      User.countDocuments({
        role: "user",
        createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      }),

      // Pending payment verifications
      Payment.countDocuments({ paymentStatus: "pending" }),

      // Verified payments
      Payment.countDocuments({ paymentStatus: "verified" }),

      // Total bookings
      Booking.countDocuments(),
    ]);

    // Format project stats
    const projectStats = {
      total: totalProjects,
      planning: projectsByStatus.find((p) => p._id === "planning")?.count || 0,
      development:
        projectsByStatus.find((p) => p._id === "development")?.count || 0,
      ready: projectsByStatus.find((p) => p._id === "ready")?.count || 0,
    };

    // Format plot stats
    const plotStats = {
      total: totalPlots,
      draft: plotsByStatus.find((p) => p._id === "draft")?.count || 0,
      available: plotsByStatus.find((p) => p._id === "available")?.count || 0,
      processing: plotsByStatus.find((p) => p._id === "processing")?.count || 0,
      booked: plotsByStatus.find((p) => p._id === "booked")?.count || 0,
    };

    // Calculate plots visible to investors
    const visiblePlots = await Plot.countDocuments({
      visibility: true,
      status: "available",
    });

    // Before the final return statement, add:
    const recentContacts = await ContactSubmission.find()
      .sort({ submittedAt: -1 })
      .limit(5)
      .lean();

    const newContactsCount = await ContactSubmission.countDocuments({
      status: "new",
    });

    return NextResponse.json({
      projects: projectStats,
      plots: {
        ...plotStats,
        visible: visiblePlots,
      },
      investors: {
        total: totalInvestors,
        recent: recentInvestors,
      },
      bookings: {
        pendingVerification: pendingPayments,
        verified: verifiedPayments,
        total: totalBookings,
      },
      contacts: {
        recent: recentContacts,
        new: newContactsCount,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
