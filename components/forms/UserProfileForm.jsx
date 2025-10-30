// Example: components/forms/UserProfileForm.jsx (or wherever you need phone input)
"use client";

import { useState } from "react";
import PhoneInput from "@/components/PhoneInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validatePhoneNumber } from "@/lib/utils";

export default function UserProfileForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "", // Store in E.164 format (e.g., +254712345678)
    });

    const [errors, setErrors] = useState({});

    const handlePhoneChange = (value) => {
        setFormData({ ...formData, phone: value });
        // Clear error when user types
        if (errors.phone) {
            setErrors({ ...errors, phone: "" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate phone number
        const phoneValidation = validatePhoneNumber(formData.phone);

        if (!phoneValidation.valid) {
            setErrors({ ...errors, phone: phoneValidation.error });
            return;
        }

        // Phone is valid, submit form
        const submitData = {
            name: formData.name,
            email: formData.email,
            phone: phoneValidation.normalized, // Use normalized E.164 format
        };

        try {
            const response = await fetch("/api/users/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submitData),
            });

            if (response.ok) {
                alert("Profile saved successfully!");
            }
        } catch (error) {
            console.error("Error saving profile:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
            <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
            </div>

            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
            </div>

            {/* International Phone Input */}
            <PhoneInput
                value={formData.phone}
                onChange={handlePhoneChange}
                label="Phone Number"
                placeholder="Enter phone number"
                required
                defaultCountry="KE" // Change based on your primary market
                error={errors.phone}
            />

            <Button type="submit" className="w-full">
                Save Profile
            </Button>
        </form>
    );
}

// ==========================================
// EXAMPLE 2: Contact Form with US default
// ==========================================

export function ContactForm() {
    const [phone, setPhone] = useState("");

    return (
        <div>
            <PhoneInput
                value={phone}
                onChange={setPhone}
                label="Contact Number"
                defaultCountry="US" // For US-based forms
                placeholder="(555) 123-4567"
            />
        </div>
    );
}

// ==========================================
// EXAMPLE 3: Displaying Phone Numbers
// ==========================================

import { formatPhoneNumber } from "@/lib/utils";

export function UserProfileDisplay({ user }) {
    return (
        <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-medium">
                {formatPhoneNumber(user.phone)}
                {/* Input: +254712345678
          Output: +254 712 345 678
          Input: +12025551234
          Output: +1 202 555 1234 */}
            </p>
        </div>
    );
}