// =============================================================================
// 6. app/api/export/plots/route.js - Plot data export
// =============================================================================
import { NextResponse } from "next/server";
import connectDB from "@/lib/database";
import Plot from "@/lib/models/Plot";
import Project from "@/lib/models/Project";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format") || "csv";

    // Build query based on filters
    const query = {};

    const project = searchParams.get("project");
    const status = searchParams.get("status");

    if (project) query.projectId = project;
    if (status) query.status = status;

    // Fetch plots with project data
    const plots = await Plot.find(query)
      .populate("projectId", "name location")
      .sort({ plotId: 1 });

    if (format === "csv") {
      const csvHeaders = [
        "Plot ID",
        "Project",
        "Size (Acres)",
        "Price",
        "Price/Acre",
        "Status",
        "Location",
        "Block",
        "Row",
        "Coordinates",
        "Last Updated",
      ];

      const csvRows = plots.map((plot) => [
        plot.plotId,
        plot.projectId?.name || "",
        plot.sizeInAcres,
        plot.price,
        plot.pricePerAcre,
        plot.status,
        plot.location,
        plot.block,
        plot.row,
        `${plot.coordinates.lat}, ${plot.coordinates.lng}`,
        new Date(plot.updatedAt).toISOString().split("T")[0],
      ]);

      const csvContent = [
        csvHeaders.join(","),
        ...csvRows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
      ].join("\n");

      return new NextResponse(csvContent, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": 'attachment; filename="plots-export.csv"',
        },
      });
    }

    // JSON format
    return NextResponse.json(plots);
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Failed to export data" },
      { status: 500 }
    );
  }
}
