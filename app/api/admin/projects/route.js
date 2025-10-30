// app/api/admin/projects/route.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import Project from "@/lib/models/Project";
import Plot from "@/lib/models/Plot";

// GET - List all projects
export async function GET(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const order = searchParams.get("order") === "asc" ? 1 : -1;

    // Build query
    const query = {};
    if (status) {
      query.status = status;
    }

    // Fetch projects with plot count
    const projects = await Project.find(query)
      .sort({ [sortBy]: order })
      .populate("createdBy", "name email")
      .lean();

    // Get plot counts for each project
    const projectsWithCounts = await Promise.all(
      projects.map(async (project) => {
        const plotCount = await Plot.countDocuments({ project: project._id });
        return {
          ...project,
          plotCount,
          slotsRemaining: project.totalPlots - plotCount,
        };
      })
    );

    return NextResponse.json(projectsWithCounts);
  } catch (error) {
    console.error("Get projects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST - Create new project
export async function POST(request) {
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

    // Validate required fields
    const requiredFields = [
      "name",
      "location",
      "totalLandSize",
      "totalPlots",
      "standardPlotSize",
      "status",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Check if project name already exists
    const existingProject = await Project.findOne({ name: data.name });
    if (existingProject) {
      return NextResponse.json(
        { error: "Project with this name already exists" },
        { status: 400 }
      );
    }

    // Create project
    const project = new Project({
      ...data,
      createdBy: session.user.id,
    });

    await project.save();

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create project" },
      { status: 500 }
    );
  }
}
