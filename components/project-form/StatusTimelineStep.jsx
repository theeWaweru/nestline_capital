// components/project-form/StatusTimelineStep.jsx
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";

export default function StatusTimelineStep({ formData, updateFormData }) {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Status & Timeline
                </h3>
                <p className="text-sm text-gray-600">
                    Define the current status and development timeline
                </p>
            </div>

            <div className="space-y-4">
                {/* Project Status */}
                <div className="space-y-2">
                    <Label htmlFor="status">
                        Project Status <span className="text-red-500">*</span>
                    </Label>
                    <Select
                        value={formData.status || "planning"}
                        onValueChange={(value) => updateFormData({ status: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="planning">Planning</SelectItem>
                            <SelectItem value="development">In Development</SelectItem>
                            <SelectItem value="ready">Ready</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                        Current stage of the project
                    </p>
                </div>

                {/* Planning Start Date */}
                <div className="space-y-2">
                    <Label htmlFor="planningStartDate">
                        Planning Start Date
                    </Label>
                    <div className="relative">
                        <Input
                            id="planningStartDate"
                            type="date"
                            value={
                                formData.planningStartDate
                                    ? new Date(formData.planningStartDate)
                                        .toISOString()
                                        .split("T")[0]
                                    : ""
                            }
                            onChange={(e) =>
                                updateFormData({
                                    planningStartDate: e.target.value
                                        ? new Date(e.target.value).toISOString()
                                        : null,
                                })
                            }
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    <p className="text-xs text-gray-500">
                        Optional: When planning phase started
                    </p>
                </div>

                {/* Development Start Date */}
                {(formData.status === "development" ||
                    formData.status === "ready") && (
                        <div className="space-y-2">
                            <Label htmlFor="developmentStartDate">
                                Development Start Date
                            </Label>
                            <div className="relative">
                                <Input
                                    id="developmentStartDate"
                                    type="date"
                                    value={
                                        formData.developmentStartDate
                                            ? new Date(formData.developmentStartDate)
                                                .toISOString()
                                                .split("T")[0]
                                            : ""
                                    }
                                    onChange={(e) =>
                                        updateFormData({
                                            developmentStartDate: e.target.value
                                                ? new Date(e.target.value).toISOString()
                                                : null,
                                        })
                                    }
                                />
                                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                            <p className="text-xs text-gray-500">
                                When development/construction started
                            </p>
                        </div>
                    )}

                {/* Completion Date */}
                {formData.status === "ready" && (
                    <div className="space-y-2">
                        <Label htmlFor="completionDate">
                            Completion Date
                        </Label>
                        <div className="relative">
                            <Input
                                id="completionDate"
                                type="date"
                                value={
                                    formData.completionDate
                                        ? new Date(formData.completionDate)
                                            .toISOString()
                                            .split("T")[0]
                                        : ""
                                }
                                onChange={(e) =>
                                    updateFormData({
                                        completionDate: e.target.value
                                            ? new Date(e.target.value).toISOString()
                                            : null,
                                    })
                                }
                            />
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        <p className="text-xs text-gray-500">
                            When project was completed and ready for sale
                        </p>
                    </div>
                )}

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">
                        <strong>Timeline Tip:</strong> Dates help investors understand the
                        project's progress. For planning stage projects, dates can be left
                        empty until more details are available.
                    </p>
                </div>
            </div>
        </div>
    );
}