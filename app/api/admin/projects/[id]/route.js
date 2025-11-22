// app/api/admin/projects/[id]/route.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import Project from "@/lib/models/Project";
import Plot from "@/lib/models/Plot";

/**
 * Small slugify helper (keeps it dependency-free).
 * Lowercase, trim, replace spaces with hyphens, remove invalid chars.
 */
function slugify(str = "") {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

// ============================
// GET - Get single project
// ============================
export async function GET(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Await params per App Router API requirements
    const { id } = await params;

    const project = await Project.findById(id)
      .populate("createdBy", "name email")
      .lean();

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const plotCount = await Plot.countDocuments({ project: project._id });

    return NextResponse.json({
      ...project,
      plotCount,
      slotsRemaining: Number(project.totalPlots) - plotCount,
    });
  } catch (error) {
    console.error("Get project error:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// ============================
// PUT - Update project
// ============================
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
    const { id } = await params;

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Prevent invalid totalPlots reduction
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

    // --- Ensure required fields exist before saving ---
    // Preserve existing createdBy if not provided in the update payload
    if (
      data.createdBy === undefined ||
      data.createdBy === null ||
      data.createdBy === ""
    ) {
      data.createdBy = project.createdBy;
    }

    // Ensure slug exists: prefer incoming, else existing, else generate from name
    if (!data.slug) {
      const nameForSlug = data.name || project.name || "";
      data.slug = project.slug || (nameForSlug ? slugify(nameForSlug) : "");
    }

    // Merge safely (preserve unspecified fields)
    Object.assign(project, {
      ...project.toObject(),
      ...data,
    });

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

// ============================
// DELETE - Delete project
// ============================
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

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

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
