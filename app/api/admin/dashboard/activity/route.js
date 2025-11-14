// app/api/admin/dashboard/activity/route.js
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

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit")) || 10;

    // Get recent items from different collections
    const [recentProjects, recentPlots, recentInvestors] = await Promise.all([
      // Recent projects
      Project.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("createdBy", "name")
        .lean(),

      // Recent plots
      Plot.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("project", "name")
        .populate("createdBy", "name")
        .lean(),

      // Recent investors (users with role: 'user')
      User.find({ role: "user" })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email createdAt")
        .lean(),
    ]);

    // Combine and format activities
    const activities = [];

    // Add projects
    recentProjects.forEach((project) => {
      activities.push({
        id: project._id,
        type: "project",
        action: "created",
        title: project.name,
        description: `New project in ${project.location}`,
        user: project.createdBy?.name || "Admin",
        timestamp: project.createdAt,
        link: `/admin/projects/${project._id}`,
      });
    });

    // Add plots
    recentPlots.forEach((plot) => {
      activities.push({
        id: plot._id,
        type: "plot",
        action: "created",
        title: `Plot #${plot.plotNumber}`,
        description: `Added to ${plot.project?.name || "project"}`,
        user: plot.createdBy?.name || "Admin",
        timestamp: plot.createdAt,
        link: `/admin/plots/${plot._id}`,
      });
    });

    // Add investors
    recentInvestors.forEach((investor) => {
      activities.push({
        id: investor._id,
        type: "investor",
        action: "registered",
        title: investor.name,
        description: investor.email,
        user: "System",
        timestamp: investor.createdAt,
        link: `/admin/investors/${investor._id}`,
      });
    });

    // Sort by timestamp (newest first) and limit
    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const limitedActivities = activities.slice(0, limit);

    return NextResponse.json(limitedActivities);
  } catch (error) {
    console.error("Dashboard activity error:", error);
    return NextResponse.json(
      { error: "Failed to fetch activity" },
      { status: 500 }
    );
  }
}
