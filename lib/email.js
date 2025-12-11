// lib/email.js - Complete Email Service
async function sendEmail({ to, subject, html }) {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const FROM_EMAIL = process.env.FROM_EMAIL || "info@nestlinecapital.com";
  const FROM_NAME = process.env.FROM_NAME || "Nestline Capital";

  if (!BREVO_API_KEY) throw new Error("BREVO_API_KEY not configured");

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: FROM_NAME, email: FROM_EMAIL },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });

  if (!response.ok) throw new Error(`Email failed: ${await response.text()}`);
  return response.json();
}

function emailTemplate(content, title) {
  return `
    <!DOCTYPE html>
    <html><head><meta charset="utf-8"><style>
      body{font-family:'Quicksand',Arial,sans-serif;margin:0;padding:0;background:#f6f8f7}
      .container{max-width:600px;margin:0 auto;background:#fff}
      .header{background:#5c8a75;color:#fff;padding:30px 20px;text-align:center}
      .header h1{margin:0;font-size:28px}
      .header p{margin:10px 0 0;font-size:16px}
      .content{padding:40px 30px}
      .button{display:inline-block;background:#5c8a75;color:#fff;padding:15px 40px;text-decoration:none;border-radius:8px;font-size:16px;margin:20px 0}
      .footer{padding:20px;text-align:center;color:#666;font-size:12px;border-top:1px solid#e0e0e0}
      .info-box{background:#f0f4f2;border-left:4px solid#5c8a75;padding:15px;margin:20px 0;border-radius:4px}
      .warning{background:#fff3cd;border-left:4px solid#f59e0b;padding:15px;margin:20px 0}
    </style></head><body>
      <div class="container">
        <div class="header"><h1>Nestline Capital</h1><p>${title}</p></div>
        <div class="content">${content}</div>
        <div class="footer"><p>© ${new Date().getFullYear()} Nestline Capital</p></div>
      </div>
    </body></html>
  `;
}

export async function sendVerificationEmail(email, name, token) {
  const url = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;
  const content = `
    <p>Hi ${name},</p>
    <p>Welcome to Nestline Capital! Verify your email to complete registration.</p>
    <div style="text-align:center"><a href="${url}" class="button">Verify Email</a></div>
    <p style="font-size:14px;color:#666">Or copy: ${url}</p>
    <div class="warning"><strong>Expires in 7 days</strong></div>
  `;
  return sendEmail({
    to: email,
    subject: "Verify Email - Nestline Capital",
    html: emailTemplate(content, "Email Verification"),
  });
}

export async function sendEditorInvitationEmail(
  email,
  name,
  token,
  tempPassword
) {
  const url = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;
  const content = `
    <p>Hi ${name},</p>
    <p>You've been invited as an <strong>Editor</strong> at Nestline Capital.</p>
    <div class="info-box">
      <strong>Login:</strong> ${email}<br>
      <strong>Temp Password:</strong> <code style="background:#e0e0e0;padding:2px 6px">${tempPassword}</code>
    </div>
    <div style="text-align:center"><a href="${url}" class="button">Verify & Activate</a></div>
    <div class="warning"><strong>Change password after first login</strong></div>
  `;
  return sendEmail({
    to: email,
    subject: "Editor Invitation - Nestline Capital",
    html: emailTemplate(content, "Editor Invitation"),
  });
}

export async function sendPasswordResetEmail(email, name, token) {
  const url = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
  const content = `
    <p>Hi ${name},</p>
    <p>Reset your Nestline Capital password using the button below.</p>
    <div style="text-align:center"><a href="${url}" class="button">Reset Password</a></div>
    <p style="font-size:14px;color:#666">Or copy: ${url}</p>
    <div class="warning"><strong>Expires in 1 hour</strong></div>
  `;
  return sendEmail({
    to: email,
    subject: "Password Reset - Nestline Capital",
    html: emailTemplate(content, "Password Reset"),
  });
}

export { sendEmail };