// components/plot-form/PlotAdditionalInfoStep.jsx
"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Info, CheckCircle } from "lucide-react";

export default function PlotAdditionalInfoStep({ formData, updateFormData }) {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Additional Plot Information
                </h3>
                <p className="text-sm text-gray-600">
                    Provide detailed information to help investors make informed decisions
                </p>
            </div>

            <div className="space-y-4">
                {/* Infrastructure */}
                <div className="space-y-2">
                    <Label htmlFor="infrastructure">Infrastructure & Utilities</Label>
                    <Textarea
                        id="infrastructure"
                        placeholder="e.g., Water connection available, Electricity nearby, Tarmac access road"
                        rows={3}
                        value={formData.infrastructure || ""}
                        onChange={(e) =>
                            updateFormData({ infrastructure: e.target.value })
                        }
                    />
                    <p className="text-xs text-gray-500">
                        Available utilities and infrastructure (water, electricity, roads)
                    </p>
                </div>

                {/* Topography */}
                <div className="space-y-2">
                    <Label htmlFor="topography">Topography</Label>
                    <Select
                        value={formData.topography || ""}
                        onValueChange={(value) => updateFormData({ topography: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select topography" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="flat">Flat</SelectItem>
                            <SelectItem value="gently-sloped">Gently Sloped</SelectItem>
                            <SelectItem value="hilly">Hilly</SelectItem>
                            <SelectItem value="elevated">Elevated</SelectItem>
                            <SelectItem value="valley">Valley</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                        Terrain and land formation characteristics
                    </p>
                </div>

                {/* Soil Type */}
                <div className="space-y-2">
                    <Label htmlFor="soilType">Soil Type</Label>
                    <Select
                        value={formData.soilType || ""}
                        onValueChange={(value) => updateFormData({ soilType: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select soil type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="sandy">Sandy</SelectItem>
                            <SelectItem value="clay">Clay</SelectItem>
                            <SelectItem value="loamy">Loamy</SelectItem>
                            <SelectItem value="rocky">Rocky</SelectItem>
                            <SelectItem value="mixed">Mixed</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                        Important for construction and foundation planning
                    </p>
                </div>

                {/* Special Features */}
                <div className="space-y-2">
                    <Label htmlFor="features">Special Features</Label>
                    <Textarea
                        id="features"
                        placeholder="e.g., Mature trees, Natural water source, Partial boundary wall, Scenic view"
                        rows={3}
                        value={formData.features || ""}
                        onChange={(e) => updateFormData({ features: e.target.value })}
                    />
                    <p className="text-xs text-gray-500">
                        Unique characteristics that add value to the plot
                    </p>
                </div>

                {/* Nearby Amenities */}
                <div className="space-y-2">
                    <Label htmlFor="amenities">Nearby Amenities</Label>
                    <Textarea
                        id="amenities"
                        placeholder="e.g., 5km to shopping center, 3km to primary school, 10km to hospital, Adjacent to main highway"
                        rows={4}
                        value={formData.amenities || ""}
                        onChange={(e) => updateFormData({ amenities: e.target.value })}
                    />
                    <p className="text-xs text-gray-500">
                        Proximity to schools, hospitals, shopping, transport
                    </p>
                </div>

                {/* Development Status */}
                <div className="space-y-2">
                    <Label htmlFor="developmentStatus">Development Status</Label>
                    <Select
                        value={formData.developmentStatus || ""}
                        onValueChange={(value) =>
                            updateFormData({ developmentStatus: value })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select development status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="surveyed-only">Surveyed Only</SelectItem>
                            <SelectItem value="pegged">Pegged</SelectItem>
                            <SelectItem value="cleared">Cleared</SelectItem>
                            <SelectItem value="fenced">Fenced</SelectItem>
                            <SelectItem value="partially-developed">
                                Partially Developed
                            </SelectItem>
                            <SelectItem value="ready-to-build">Ready to Build</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                        Current state of plot preparation
                    </p>
                </div>

                {/* View/Orientation */}
                <div className="space-y-2">
                    <Label htmlFor="viewOrientation">View & Orientation</Label>
                    <Textarea
                        id="viewOrientation"
                        placeholder="e.g., North-facing, Valley view, Mountain backdrop, Open countryside"
                        rows={2}
                        value={formData.viewOrientation || ""}
                        onChange={(e) =>
                            updateFormData({ viewOrientation: e.target.value })
                        }
                    />
                    <p className="text-xs text-gray-500">
                        Direction facing and scenic views available
                    </p>
                </div>

                {/* Guidelines */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-900">
                            <p className="font-semibold mb-2">Why this information matters:</p>
                            <ul className="space-y-1 ml-4 list-disc">
                                <li>
                                    Helps investors understand the plot's characteristics
                                </li>
                                <li>Builds transparency and trust</li>
                                <li>Reduces back-and-forth inquiries</li>
                                <li>Enables informed decision-making</li>
                                <li>Differentiates your plots from competitors</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Summary Preview */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
                    <h4 className="font-semibold text-gray-900">Plot Summary</h4>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Plot Number:</span>
                            <span className="font-medium text-gray-900">
                                {formData.plotNumber || "—"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Size:</span>
                            <span className="font-medium text-gray-900">
                                {formData.size || "—"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Price:</span>
                            <span className="font-medium text-gray-900">
                                {formData.price
                                    ? `KES ${formData.price.toLocaleString()}`
                                    : "—"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Images:</span>
                            <span className="font-medium text-gray-900">
                                {formData.images?.length || 0} uploaded
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Title Deed:</span>
                            <span
                                className={`font-medium ${formData.titleDeed?.url ? "text-green-600" : "text-red-600"
                                    }`}
                            >
                                {formData.titleDeed?.url ? "✓ Uploaded" : "✗ Not uploaded"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Coordinates:</span>
                            <span
                                className={`font-medium ${formData.coordinates?.corner1?.lat &&
                                        formData.coordinates?.corner2?.lat &&
                                        formData.coordinates?.corner3?.lat &&
                                        formData.coordinates?.corner4?.lat
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                            >
                                {formData.coordinates?.corner1?.lat &&
                                    formData.coordinates?.corner2?.lat &&
                                    formData.coordinates?.corner3?.lat &&
                                    formData.coordinates?.corner4?.lat
                                    ? "✓ All set"
                                    : "✗ Incomplete"}
                            </span>
                        </div>
                    </div>

                    <div className="pt-4 border-t">
                        {formData.titleDeed?.url ? (
                            <div className="flex items-start gap-2 text-green-700">
                                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm">
                                    This plot will be <strong>visible to investors</strong> when
                                    set to "Available" status
                                </p>
                            </div>
                        ) : (
                            <div className="flex items-start gap-2 text-yellow-700">
                                <Info className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm">
                                    Plot will be saved as <strong>draft</strong> until a title
                                    deed is uploaded
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}