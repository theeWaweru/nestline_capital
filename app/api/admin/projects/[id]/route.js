// app/api/admin/projects/[id]/route.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import Project from "@/lib/models/Project";
import Plot from "@/lib/models/Plot";

// GET - Get single project
export async function GET(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const project = await Project.findById(params.id)
      .populate("createdBy", "name email")
      .lean();

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Get plot count
    const plotCount = await Plot.countDocuments({ project: project._id });

    return NextResponse.json({
      ...project,
      plotCount,
      slotsRemaining: project.totalPlots - plotCount,
    });
  } catch (error) {
    console.error("Get project error:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PUT - Update project
export async function PUT(request, { params }) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    await connectDB();

    const data = await request.json();

    const project = await Project.findById(params.id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // If reducing totalPlots, check if it's valid
    if (data.totalPlots && data.totalPlots < project.totalPlots) {
      const plotCount = await Plot.countDocuments({ project: project._id });
      if (data.totalPlots < plotCount) {
        return NextResponse.json(
          {
            error: `Cannot reduce total plots to ${data.totalPlots}. ${plotCount} plots already exist.`,
          },
          { status: 400 }
        );
      }
    }

    // Update project
    Object.assign(project, data);
    await project.save();

    return NextResponse.json(project);
  } catch (error) {
    console.error("Update project error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE - Delete project
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

    const project = await Project.findById(params.id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Check if project has plots
    const plotCount = await Plot.countDocuments({ project: project._id });
    if (plotCount > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete project with ${plotCount} existing plots. Delete plots first.`,
        },
        { status: 400 }
      );
    }

    await project.deleteOne();

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete project error:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
