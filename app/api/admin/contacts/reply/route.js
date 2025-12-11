import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import ContactSubmission from "@/lib/models/ContactSubmission";
import { sendEmail } from "@/lib/email";

function emailTemplate(content, title) {
  return `
    <!DOCTYPE html>
    <html><head><meta charset="utf-8"><style>
      body{font-family:'Quicksand',Arial,sans-serif;margin:0;padding:0;background:#f6f8f7}
      .container{max-width:600px;margin:0 auto;background:#fff}
      .header{background:#5c8a75;color:#fff;padding:30px 20px;text-align:center}
      .header h1{margin:0;font-size:28px}
      .header p{margin:10px 0 0;font-size:16px}
      .content{padding:40px 30px;line-height:1.6}
      .footer{padding:20px;text-align:center;color:#666;font-size:12px;border-top:1px solid#e0e0e0}
    </style></head><body>
      <div class="container">
        <div class="header"><h1>Nestline Capital</h1><p>${title}</p></div>
        <div class="content">${content.replace(/\n/g, "<br>")}</div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Nestline Capital</p>
          <p>Email: info@nestlinecapital.com | Website: www.nestlinecapital.com</p>
        </div>
      </div>
    </body></html>
  `;
}

export async function POST(request) {
  try {
    const session = await auth();
    if (
      !session ||
      (session.user.role !== "admin" && session.user.role !== "editor")
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { contactId, to, subject, message } = await request.json();

    await sendEmail({
      to,
      subject,
      html: emailTemplate(message, "Response to Your Inquiry"),
    });

    // Update contact status to 'contacted'
    await ContactSubmission.findByIdAndUpdate(contactId, {
      status: "contacted",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reply error:", error);
    return NextResponse.json(
      { error: "Failed to send reply" },
      { status: 500 }
    );
  }
}
