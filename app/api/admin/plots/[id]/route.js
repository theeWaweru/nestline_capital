// app/api/admin/plots/[id]/route.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import Plot from "@/lib/models/Plot";
import Project from "@/lib/models/Project";

// GET - Get single plot
export async function GET(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const plot = await Plot.findById(params.id)
      .populate("project", "name slug location paymentCompletionPeriod")
      .populate("createdBy", "name email")
      .populate("bookedBy", "name email")
      .lean();

    if (!plot) {
      return NextResponse.json({ error: "Plot not found" }, { status: 404 });
    }

    return NextResponse.json(plot);
  } catch (error) {
    console.error("Get plot error:", error);
    return NextResponse.json(
      { error: "Failed to fetch plot" },
      { status: 500 }
    );
  }
}

// PUT - Update plot
export async function PUT(request, { params }) {
  try {
    const session = await auth();
    if (
      !session ||
      (session.user.role !== "admin" && session.user.role !== "editor")
    ) {
      return NextResponse.json(
        { error: "Admin or editor access required" },
        { status: 403 }
      );
    }

    await connectDB();

    const data = await request.json();

    const plot = await Plot.findById(params.id);
    if (!plot) {
      return NextResponse.json({ error: "Plot not found" }, { status: 404 });
    }

    // If changing project, validate new project
    if (data.project && data.project !== plot.project.toString()) {
      const newProject = await Project.findById(data.project);
      if (!newProject) {
        return NextResponse.json(
          { error: "New project not found" },
          { status: 404 }
        );
      }

      // Check plot limit in new project
      const plotCount = await Plot.countDocuments({ project: data.project });
      if (plotCount >= newProject.totalPlots) {
        return NextResponse.json(
          {
            error: `Cannot move plot. New project limit reached: ${newProject.totalPlots}`,
          },
          { status: 400 }
        );
      }

      // Check for duplicate plot number in new project
      const duplicatePlot = await Plot.findOne({
        plotNumber: data.plotNumber || plot.plotNumber,
        project: data.project,
        _id: { $ne: plot._id },
      });
      if (duplicatePlot) {
        return NextResponse.json(
          { error: "Plot number already exists in the new project" },
          { status: 400 }
        );
      }
    }

    // If changing plot number, check for duplicates in current project
    if (data.plotNumber && data.plotNumber !== plot.plotNumber) {
      const duplicatePlot = await Plot.findOne({
        plotNumber: data.plotNumber,
        project: data.project || plot.project,
        _id: { $ne: plot._id },
      });
      if (duplicatePlot) {
        return NextResponse.json(
          { error: "Plot number already exists in this project" },
          { status: 400 }
        );
      }
    }

    // Update plot
    Object.assign(plot, data);
    await plot.save();

    // Populate references
    await plot.populate("project", "name slug location");
    await plot.populate("createdBy", "name email");

    return NextResponse.json(plot);
  } catch (error) {
    console.error("Update plot error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update plot" },
      { status: 500 }
    );
  }
}

// DELETE - Delete plot
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

    const plot = await Plot.findById(params.id);
    if (!plot) {
      return NextResponse.json({ error: "Plot not found" }, { status: 404 });
    }

    // Prevent deletion if plot is booked
    if (plot.status === "booked" || plot.status === "processing") {
      return NextResponse.json(
        { error: `Cannot delete plot with status: ${plot.status}` },
        { status: 400 }
      );
    }

    await plot.deleteOne();

    return NextResponse.json({ message: "Plot deleted successfully" });
  } catch (error) {
    console.error("Delete plot error:", error);
    return NextResponse.json(
      { error: "Failed to delete plot" },
      { status: 500 }
    );
  }
}
