// lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { parsePhoneNumber, isValidPhoneNumber } from "libphonenumber-js";

/**
 * Merge Tailwind classes (for shadcn/ui)
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Validates international phone numbers
 * Uses libphonenumber-js for proper validation
 *
 * @param {string} phone - Phone number in any format
 * @param {string} defaultCountry - Default country code (optional, e.g., 'KE', 'US')
 * @returns {object} { valid: boolean, normalized: string, error: string }
 */
export function validatePhoneNumber(phone, defaultCountry = "KE") {
  if (!phone) {
    return { valid: false, error: "Phone number is required" };
  }

  try {
    // Check if valid phone number
    if (!isValidPhoneNumber(phone, defaultCountry)) {
      return {
        valid: false,
        error:
          "Invalid phone number. Please enter a valid phone number with country code.",
      };
    }

    // Parse and normalize
    const phoneNumber = parsePhoneNumber(phone, defaultCountry);

    return {
      valid: true,
      normalized: phoneNumber.number, // E.164 format (e.g., +254712345678)
      country: phoneNumber.country,
      nationalNumber: phoneNumber.nationalNumber,
      formatted: phoneNumber.formatInternational(), // Human-readable format
    };
  } catch (error) {
    return {
      valid: false,
      error: "Invalid phone number format",
    };
  }
}

/**
 * Formats phone number for display
 * @param {string} phone - Phone number in E.164 format
 * @returns {string} Formatted phone number
 */
export function formatPhoneNumber(phone) {
  if (!phone) return "";

  try {
    const phoneNumber = parsePhoneNumber(phone);
    return phoneNumber.formatInternational();
  } catch (error) {
    return phone; // Return as-is if parsing fails
  }
}

/**
 * Generate a random verification token
 */
export function generateVerificationToken() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
