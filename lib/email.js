// lib/email.js - Email Service
async function sendEmail({ to, subject, html }) {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@nestlinecapital.com";

  if (!BREVO_API_KEY) {
    throw new Error("BREVO_API_KEY is not configured");
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: {
        name: "Nestline Capital",
        email: ADMIN_EMAIL,
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to send email: ${response.statusText}`);
  }

  return response.json();
}

export async function sendVerificationEmail(email, customerName, token) {
  const verificationUrl = `${
    process.env.NEXTAUTH_URL || "http://localhost:3100"
  }/verify-email?token=${token}`;

  const html = `
    <div style="font-family: 'Geist', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #5c8a75; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px;">Nestline Capital</h1>
        <h2 style="margin: 10px 0 0 0; font-weight: 400;">Email Verification Required</h2>
      </div>
      
      <div style="padding: 30px; background-color: #f6f8f7;">
        <p style="font-size: 16px; line-height: 1.6;">Dear ${customerName},</p>
        
        <p style="font-size: 16px; line-height: 1.6;">Thank you for your interest in our real estate investment opportunities. To proceed with your quote request, please verify your email address.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #5c8a75; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-size: 16px; font-weight: 500;">
            Verify Email Address
          </a>
        </div>
        
        <p style="font-size: 14px; line-height: 1.6; color: #666;">If the button doesn't work, copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #5c8a75; font-size: 14px;">${verificationUrl}</p>
        
        <p style="font-size: 14px; line-height: 1.6;"><strong>Important:</strong> This verification link will expire in 7 days. After verification, we will contact you within 24 hours.</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;">
        
        <p style="font-size: 12px; color: #999; text-align: center;">
          If you didn't request this quote, please ignore this email.
        </p>
      </div>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Verify Your Email - Nestline Capital Quote Request",
    html,
  });
}
