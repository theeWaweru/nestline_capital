// app/api/upload/route.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { uploadToS3 } from "@/lib/aws-s3";

export async function POST(request) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only admin and editor can upload
    if (session.user.role !== "admin" && session.user.role !== "editor") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder") || "uploads"; // e.g., 'plots', 'title-deeds'

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedImageTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];
    const allowedDocTypes = ["application/pdf"];
    const allAllowedTypes = [...allowedImageTypes, ...allowedDocTypes];

    if (!allAllowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Invalid file type. Only images (JPEG, PNG, WebP) and PDFs allowed.",
        },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to S3
    const fileUrl = await uploadToS3(buffer, file.name, file.type, folder);

    return NextResponse.json({
      success: true,
      url: fileUrl,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}
