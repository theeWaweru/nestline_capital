// app/api/plots/route.js - Plots API
import { NextResponse } from "next/server";
import connectDB from "@/lib/database";
import Plot from "@/lib/models/Plot";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");
    const status = searchParams.get("status");

    let query = {};
    if (projectId) query = { ...query, projectId };
    if (status) query = { ...query, status };

    const plots = await Plot.find(query)
      .populate("projectId", "name")
      .sort({ plotNumber: 1 });

    return NextResponse.json(plots);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch plots" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // Check if plot number already exists for this project
    const existingPlot = await Plot.findOne({
      projectId: body.projectId,
      plotNumber: body.plotNumber,
    });

    if (existingPlot) {
      return NextResponse.json(
        { error: "Plot number already exists for this project" },
        { status: 400 }
      );
    }

    const plot = new Plot(body);
    await plot.save();

    return NextResponse.json(plot, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create plot" },
      { status: 500 }
    );
  }
}
