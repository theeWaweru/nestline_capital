// app/api/admin/dashboard/stats/route.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import Project from "@/lib/models/Project";
import Plot from "@/lib/models/Plot";
import User from "@/lib/models/User";

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

      // Total investors (role: investor)
      User.countDocuments({ role: "investor" }),

      // Recent investors (last 30 days)
      User.countDocuments({
        role: "investor",
        createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      }),
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
      // Placeholder for future booking stats
      bookings: {
        pendingVerification: 0, // Will be implemented in Phase 4
        verified: 0,
        total: 0,
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
