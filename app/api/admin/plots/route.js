// app/api/admin/plots/route.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import Plot from "@/lib/models/Plot";
import Project from "@/lib/models/Project";

// GET - List all plots
export async function GET(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("project");
    const status = searchParams.get("status");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const order = searchParams.get("order") === "asc" ? 1 : -1;

    // Build query
    const query = {};
    if (projectId) {
      query.project = projectId;
    }
    if (status) {
      query.status = status;
    }

    // Fetch plots
    const plots = await Plot.find(query)
      .sort({ [sortBy]: order })
      .populate("project", "name slug location")
      .populate("createdBy", "name email")
      .populate("bookedBy", "name email")
      .lean();

    return NextResponse.json(plots);
  } catch (error) {
    console.error("Get plots error:", error);
    return NextResponse.json(
      { error: "Failed to fetch plots" },
      { status: 500 }
    );
  }
}

// POST - Create new plot
export async function POST(request) {
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

    // Validate required fields
    const requiredFields = ["plotNumber", "project", "size", "price"];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate coordinates
    if (
      !data.coordinates ||
      !data.coordinates.corner1 ||
      !data.coordinates.corner2 ||
      !data.coordinates.corner3 ||
      !data.coordinates.corner4
    ) {
      return NextResponse.json(
        { error: "All four corner coordinates are required" },
        { status: 400 }
      );
    }

    // Check if project exists
    const project = await Project.findById(data.project);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Check plot limit
    const existingPlotCount = await Plot.countDocuments({
      project: data.project,
    });
    if (existingPlotCount >= project.totalPlots) {
      return NextResponse.json(
        {
          error: `Cannot add more plots. Project limit: ${project.totalPlots}, Current: ${existingPlotCount}`,
        },
        { status: 400 }
      );
    }

    // Check for duplicate plot number within project
    const duplicatePlot = await Plot.findOne({
      plotNumber: data.plotNumber,
      project: data.project,
    });
    if (duplicatePlot) {
      return NextResponse.json(
        { error: "Plot number already exists in this project" },
        { status: 400 }
      );
    }

    // Validate minimum images
    if (!data.images || data.images.length < 4) {
      return NextResponse.json(
        { error: "At least 4 images are required" },
        { status: 400 }
      );
    }

    // Create plot
    const plot = new Plot({
      ...data,
      createdBy: session.user.id,
    });

    await plot.save();

    // Populate references
    await plot.populate("project", "name slug location");
    await plot.populate("createdBy", "name email");

    return NextResponse.json(plot, { status: 201 });
  } catch (error) {
    console.error("Create plot error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create plot" },
      { status: 500 }
    );
  }
}
