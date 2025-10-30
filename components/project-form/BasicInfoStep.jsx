// components/project-form/BasicInfoStep.jsx
"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function BasicInfoStep({ formData, updateFormData }) {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Basic Information
                </h3>
                <p className="text-sm text-gray-600">
                    Enter the core details about this land development project
                </p>
            </div>

            <div className="space-y-4">
                {/* Project Name */}
                <div className="space-y-2">
                    <Label htmlFor="name">
                        Project Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="name"
                        placeholder="e.g., Parklands Phase 2"
                        value={formData.name || ""}
                        onChange={(e) => updateFormData({ name: e.target.value })}
                        required
                    />
                    <p className="text-xs text-gray-500">
                        This will be displayed to investors
                    </p>
                </div>

                {/* Location */}
                <div className="space-y-2">
                    <Label htmlFor="location">
                        Location <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="location"
                        placeholder="e.g., Kiambu, Kenya"
                        value={formData.location || ""}
                        onChange={(e) => updateFormData({ location: e.target.value })}
                        required
                    />
                    <p className="text-xs text-gray-500">
                        City or region where the project is located
                    </p>
                </div>

                {/* Total Land Size */}
                <div className="space-y-2">
                    <Label htmlFor="totalLandSize">
                        Total Land Size <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="totalLandSize"
                        placeholder="e.g., 50 acres"
                        value={formData.totalLandSize || ""}
                        onChange={(e) => updateFormData({ totalLandSize: e.target.value })}
                        required
                    />
                    <p className="text-xs text-gray-500">
                        Total size of the entire project area
                    </p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Describe the project, its features, and what makes it unique..."
                        rows={5}
                        value={formData.description || ""}
                        onChange={(e) => updateFormData({ description: e.target.value })}
                    />
                    <p className="text-xs text-gray-500">
                        Optional: Provide details that investors should know about this project
                    </p>
                </div>
            </div>
        </div>
    );
}