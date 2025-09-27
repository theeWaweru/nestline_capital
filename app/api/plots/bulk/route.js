// =============================================================================
// 5. app/api/plots/bulk/route.js - Bulk operations API
// =============================================================================
import { NextResponse } from "next/server";
import connectDB from "@/lib/database";
import Plot from "@/lib/models/Plot";

export async function PATCH(request) {
  try {
    await connectDB();
    const { plotIds, action } = await request.json();

    if (!plotIds || !Array.isArray(plotIds) || plotIds.length === 0) {
      return NextResponse.json(
        { error: "Plot IDs are required" },
        { status: 400 }
      );
    }

    let updateData = {};

    switch (action) {
      case "mark-available":
        updateData = { status: "available" };
        break;
      case "mark-hold":
        updateData = {
          status: "requested",
          holdExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        };
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const result = await Plot.updateMany({ _id: { $in: plotIds } }, updateData);

    return NextResponse.json({
      message: `Updated ${result.modifiedCount} plots`,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Bulk update error:", error);
    return NextResponse.json(
      { error: "Failed to update plots" },
      { status: 500 }
    );
  }
}
