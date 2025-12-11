// app/api/contact-form/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/database";
import ContactSubmission from "@/lib/models/ContactSubmission";
import { sendEmail } from "@/lib/email";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { firstName, lastName, email, phone, projectId, message } = body;

    if (!firstName || !lastName || !email || !phone || !projectId || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400, headers: corsHeaders() }
      );
    }

    const projectNames = {
      "palmcrest-residences-1": "PalmCrest Residences 1",
      "palmcrest-residences-2": "PalmCrest Residences 2",
      "azuredune-developments": "AzureDune Developments",
      general: "General Inquiry",
    };
    const projectName = projectNames[projectId] || projectId;

    const submission = await ContactSubmission.create({
      firstName,
      lastName,
      email,
      phone,
      projectId,
      projectName,
      message,
      submittedAt: new Date(),
    });

    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "New Contact - " + projectName,
      html:
        "<h2>New Contact</h2><p><strong>Name:</strong> " +
        firstName +
        " " +
        lastName +
        "</p><p><strong>Email:</strong> " +
        email +
        "</p><p><strong>Phone:</strong> " +
        phone +
        "</p><p><strong>Project:</strong> " +
        projectName +
        "</p><p><strong>Message:</strong></p><p>" +
        message +
        "</p>",
    });

    await sendEmail({
      to: email,
      subject: "Thank you - Nestline Capital",
      html:
        "<h2>Thank you " +
        firstName +
        "!</h2><p>We received your message about <strong>" +
        projectName +
        "</strong>.</p><p>We will respond within 24-48 hours.</p><p><strong>Your message:</strong></p><p>" +
        message +
        "</p><hr><p>Best regards,<br>Nestline Capital</p>",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Submission received",
        submissionId: submission._id,
      },
      { headers: corsHeaders() }
    );
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json(
      { error: "Failed to process" },
      { status: 500, headers: corsHeaders() }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}
