// components/PhoneInput.jsx
"use client";

import PhoneInputWithCountry from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Label } from "@/components/ui/label";

/**
 * International Phone Number Input Component
 * Uses react-phone-number-input for proper international phone formatting
 * 
 * @param {string} value - Phone number in E.164 format (e.g., +254712345678)
 * @param {function} onChange - Callback when phone number changes
 * @param {string} label - Label for the input
 * @param {string} placeholder - Placeholder text
 * @param {boolean} required - Whether field is required
 * @param {string} defaultCountry - Default country code (e.g., 'KE', 'US')
 * @param {string} error - Error message to display
 */
export default function PhoneInput({
    value,
    onChange,
    label = "Phone Number",
    placeholder = "Enter phone number",
    required = false,
    defaultCountry = "KE",
    error,
    className = "",
}) {
    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <Label>
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </Label>
            )}
            <PhoneInputWithCountry
                international
                defaultCountry={defaultCountry}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="phone-input-custom"
                numberInputProps={{
                    className: "phone-number-input",
                }}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <style jsx global>{`
        .phone-input-custom {
          display: flex;
          align-items: center;
          border: 1px solid #e5e7eb;
          border-radius: 0.375rem;
          padding: 0.5rem 0.75rem;
          background: white;
          transition: all 0.15s ease;
        }

        .phone-input-custom:focus-within {
          outline: 2px solid #5c8a75;
          outline-offset: 2px;
          border-color: #5c8a75;
        }

        .phone-input-custom .PhoneInputCountry {
          margin-right: 0.5rem;
          display: flex;
          align-items: center;
        }

        .phone-input-custom .PhoneInputCountryIcon {
          width: 1.5rem;
          height: 1rem;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
          border-radius: 0.125rem;
        }

        .phone-input-custom .PhoneInputCountrySelect {
          margin-left: 0.25rem;
          font-size: 0.875rem;
          cursor: pointer;
          background: transparent;
          border: none;
          padding: 0.25rem;
        }

        .phone-input-custom .PhoneInputCountrySelect:focus {
          outline: none;
        }

        .phone-number-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 0.875rem;
          background: transparent;
        }

        .phone-number-input::placeholder {
          color: #9ca3af;
        }

        /* Error state */
        .phone-input-custom.error {
          border-color: #ef4444;
        }

        .phone-input-custom.error:focus-within {
          outline-color: #ef4444;
          border-color: #ef4444;
        }

        /* Disabled state */
        .phone-input-custom:has(input:disabled) {
          background-color: #f3f4f6;
          cursor: not-allowed;
          opacity: 0.6;
        }
      `}</style>
        </div>
    );
}