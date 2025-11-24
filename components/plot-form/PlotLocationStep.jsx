// components/plot-form/PlotLocationStep.jsx
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Info } from "lucide-react";

export default function PlotLocationStep({ formData, updateFormData }) {
    const handleCoordinateChange = (corner, field, value) => {
        // Allow empty values
        if (value === "") {
            updateFormData({
                coordinates: {
                    ...formData.coordinates,
                    [corner]: {
                        ...formData.coordinates?.[corner],
                        [field]: "",
                    },
                },
            });
            return;
        }

        const numValue = parseFloat(value);

        // Check if it's a valid number
        if (isNaN(numValue)) {
            alert("Please enter a valid number");
            return;
        }

        // Validate lat/lng ranges
        if (field === "lat" && (numValue < -90 || numValue > 90)) {
            alert("Latitude must be between -90 and 90");
            return;
        }
        if (field === "lng" && (numValue < -180 || numValue > 180)) {
            alert("Longitude must be between -180 and 180");
            return;
        }

        updateFormData({
            coordinates: {
                ...formData.coordinates,
                [corner]: {
                    ...formData.coordinates?.[corner],
                    [field]: numValue,
                },
            },
        });
    };

    const allCornersSet =
        formData.coordinates?.corner1?.lat &&
        formData.coordinates?.corner1?.lng &&
        formData.coordinates?.corner2?.lat &&
        formData.coordinates?.corner2?.lng &&
        formData.coordinates?.corner3?.lat &&
        formData.coordinates?.corner3?.lng &&
        formData.coordinates?.corner4?.lat &&
        formData.coordinates?.corner4?.lng;

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Plot Location Coordinates
                </h3>
                <p className="text-sm text-gray-600">
                    Define the four corner coordinates of this plot
                </p>
            </div>

            <div className="space-y-4">
                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-900">
                            <p className="font-semibold mb-2">How to get coordinates:</p>
                            <ol className="list-decimal list-inside space-y-1 ml-2">
                                <li>Open Google Maps in your browser</li>
                                <li>Right-click on a corner point of the plot</li>
                                <li>Click the coordinates that appear at the top</li>
                                <li>Paste the latitude and longitude below</li>
                                <li>Repeat for all four corners</li>
                            </ol>
                        </div>
                    </div>
                </div>

                {/* Corner 1 */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-5 h-5 text-[#5c8a75]" />
                        <h4 className="font-semibold text-gray-900">Corner 1 (Top-Left)</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="corner1-lat">
                                Latitude <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="corner1-lat"
                                type="number"
                                step="any"
                                placeholder="-1.286389"
                                value={formData.coordinates?.corner1?.lat || ""}
                                onChange={(e) =>
                                    handleCoordinateChange("corner1", "lat", e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="corner1-lng">
                                Longitude <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="corner1-lng"
                                type="number"
                                step="any"
                                placeholder="36.817223"
                                value={formData.coordinates?.corner1?.lng || ""}
                                onChange={(e) =>
                                    handleCoordinateChange("corner1", "lng", e.target.value)
                                }
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Corner 2 */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-5 h-5 text-[#5c8a75]" />
                        <h4 className="font-semibold text-gray-900">Corner 2 (Top-Right)</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="corner2-lat">
                                Latitude <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="corner2-lat"
                                type="number"
                                step="any"
                                placeholder="-1.286389"
                                value={formData.coordinates?.corner2?.lat || ""}
                                onChange={(e) =>
                                    handleCoordinateChange("corner2", "lat", e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="corner2-lng">
                                Longitude <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="corner2-lng"
                                type="number"
                                step="any"
                                placeholder="36.817223"
                                value={formData.coordinates?.corner2?.lng || ""}
                                onChange={(e) =>
                                    handleCoordinateChange("corner2", "lng", e.target.value)
                                }
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Corner 3 */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-5 h-5 text-[#5c8a75]" />
                        <h4 className="font-semibold text-gray-900">
                            Corner 3 (Bottom-Right)
                        </h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="corner3-lat">
                                Latitude <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="corner3-lat"
                                type="number"
                                step="any"
                                placeholder="-1.286389"
                                value={formData.coordinates?.corner3?.lat || ""}
                                onChange={(e) =>
                                    handleCoordinateChange("corner3", "lat", e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="corner3-lng">
                                Longitude <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="corner3-lng"
                                type="number"
                                step="any"
                                placeholder="36.817223"
                                value={formData.coordinates?.corner3?.lng || ""}
                                onChange={(e) =>
                                    handleCoordinateChange("corner3", "lng", e.target.value)
                                }
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Corner 4 */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-5 h-5 text-[#5c8a75]" />
                        <h4 className="font-semibold text-gray-900">
                            Corner 4 (Bottom-Left)
                        </h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="corner4-lat">
                                Latitude <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="corner4-lat"
                                type="number"
                                step="any"
                                placeholder="-1.286389"
                                value={formData.coordinates?.corner4?.lat || ""}
                                onChange={(e) =>
                                    handleCoordinateChange("corner4", "lat", e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="corner4-lng">
                                Longitude <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="corner4-lng"
                                type="number"
                                step="any"
                                placeholder="36.817223"
                                value={formData.coordinates?.corner4?.lng || ""}
                                onChange={(e) =>
                                    handleCoordinateChange("corner4", "lng", e.target.value)
                                }
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Status */}
                {allCornersSet ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm text-green-900">
                            ✓ All four corner coordinates set
                        </p>
                    </div>
                ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-sm text-yellow-900">
                            Please set all four corner coordinates to define the plot boundary
                        </p>
                    </div>
                )}

                {/* Future Enhancement Note */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                        <strong>Coming Soon:</strong> Interactive map interface for
                        easy coordinate selection by clicking directly on the map. For now,
                        please enter coordinates manually.
                    </p>
                </div>
            </div>
        </div>
    );
}