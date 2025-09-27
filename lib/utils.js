// lib/utils.js - Utility Functions
import crypto from "crypto";

export function generateVerificationToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function validatePhoneNumber(phone) {
  // International phone number format: +[country code][number]
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function formatCurrency(amount, currency = "KSh") {
  return `${currency} ${amount.toLocaleString()}`;
}
