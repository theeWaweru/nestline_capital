// components/plot-form/PlotLocationStep.jsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Info } from "lucide-react";
import proj4 from "proj4";
import PlotBoundaryMap from "./PlotBoundaryMap";

export default function PlotLocationStep({ formData, updateFormData }) {
    const [inputMode, setInputMode] = useState("latlong"); // 'latlong' or 'utm'

    // UTM state for each corner
    const [utmData, setUtmData] = useState({
        corner1: { easting: "", northing: "", zone: "37", hemisphere: "S" },
        corner2: { easting: "", northing: "", zone: "37", hemisphere: "S" },
        corner3: { easting: "", northing: "", zone: "37", hemisphere: "S" },
        corner4: { easting: "", northing: "", zone: "37", hemisphere: "S" },
    });

    // Convert UTM to Lat/Lng
    const convertUTMtoLatLng = (easting, northing, zone, hemisphere) => {
        try {
            const utmProj = `+proj=utm +zone=${zone} +${hemisphere === "N" ? "north" : "south"} +datum=WGS84 +units=m +no_defs`;
            const wgs84 = "EPSG:4326";

            const [lng, lat] = proj4(utmProj, wgs84, [parseFloat(easting), parseFloat(northing)]);

            return { lat, lng };
        } catch (error) {
            console.error("UTM conversion error:", error);
            return null;
        }
    };

    // Handle UTM input change
    const handleUTMChange = (corner, field, value) => {
        const newUtmData = {
            ...utmData,
            [corner]: {
                ...utmData[corner],
                [field]: value,
            },
        };
        setUtmData(newUtmData);

        // Auto-convert if all fields are filled
        const utm = newUtmData[corner];
        if (utm.easting && utm.northing && utm.zone && utm.hemisphere) {
            const converted = convertUTMtoLatLng(utm.easting, utm.northing, utm.zone, utm.hemisphere);
            if (converted) {
                updateFormData({
                    coordinates: {
                        ...formData.coordinates,
                        [corner]: converted,
                    },
                });
            }
        }
    };

    // Handle Lat/Lng input change
    const handleCoordinateChange = (corner, field, value) => {
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

        if (isNaN(numValue)) {
            alert("Please enter a valid number");
            return;
        }

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
                    Define the four corner coordinates using either Lat/Long or UTM format
                </p>
            </div>

            <div className="space-y-4">
                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-900">
                            <p className="font-semibold mb-2">Choose your input method:</p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li><strong>Lat/Long:</strong> Get from Google Maps (right-click → coordinates)</li>
                                <li><strong>UTM:</strong> Use survey data (Easting, Northing, Zone, Hemisphere)</li>
                                <li>UTM values will auto-convert to Lat/Long for the map</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Input Mode Tabs */}
                <Tabs value={inputMode} onValueChange={setInputMode} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="latlong">Latitude/Longitude</TabsTrigger>
                        <TabsTrigger value="utm">UTM Coordinates</TabsTrigger>
                    </TabsList>

                    {/* LAT/LONG TAB */}
                    <TabsContent value="latlong" className="space-y-4 mt-4">
                        {/* Corner 1 */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <MapPin className="w-5 h-5 text-[#5c8a75]" />
                                <h4 className="font-semibold text-gray-900">Corner 1 (Top-Left)</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="corner1-lat">Latitude <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="corner1-lat"
                                        type="number"
                                        step="any"
                                        placeholder="-1.286389"
                                        value={formData.coordinates?.corner1?.lat || ""}
                                        onChange={(e) => handleCoordinateChange("corner1", "lat", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="corner1-lng">Longitude <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="corner1-lng"
                                        type="number"
                                        step="any"
                                        placeholder="36.817223"
                                        value={formData.coordinates?.corner1?.lng || ""}
                                        onChange={(e) => handleCoordinateChange("corner1", "lng", e.target.value)}
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
                                    <Label htmlFor="corner2-lat">Latitude <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="corner2-lat"
                                        type="number"
                                        step="any"
                                        placeholder="-1.286389"
                                        value={formData.coordinates?.corner2?.lat || ""}
                                        onChange={(e) => handleCoordinateChange("corner2", "lat", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="corner2-lng">Longitude <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="corner2-lng"
                                        type="number"
                                        step="any"
                                        placeholder="36.817223"
                                        value={formData.coordinates?.corner2?.lng || ""}
                                        onChange={(e) => handleCoordinateChange("corner2", "lng", e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Corner 3 */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <MapPin className="w-5 h-5 text-[#5c8a75]" />
                                <h4 className="font-semibold text-gray-900">Corner 3 (Bottom-Right)</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="corner3-lat">Latitude <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="corner3-lat"
                                        type="number"
                                        step="any"
                                        placeholder="-1.286389"
                                        value={formData.coordinates?.corner3?.lat || ""}
                                        onChange={(e) => handleCoordinateChange("corner3", "lat", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="corner3-lng">Longitude <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="corner3-lng"
                                        type="number"
                                        step="any"
                                        placeholder="36.817223"
                                        value={formData.coordinates?.corner3?.lng || ""}
                                        onChange={(e) => handleCoordinateChange("corner3", "lng", e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Corner 4 */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <MapPin className="w-5 h-5 text-[#5c8a75]" />
                                <h4 className="font-semibold text-gray-900">Corner 4 (Bottom-Left)</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="corner4-lat">Latitude <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="corner4-lat"
                                        type="number"
                                        step="any"
                                        placeholder="-1.286389"
                                        value={formData.coordinates?.corner4?.lat || ""}
                                        onChange={(e) => handleCoordinateChange("corner4", "lat", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="corner4-lng">Longitude <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="corner4-lng"
                                        type="number"
                                        step="any"
                                        placeholder="36.817223"
                                        value={formData.coordinates?.corner4?.lng || ""}
                                        onChange={(e) => handleCoordinateChange("corner4", "lng", e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* UTM TAB */}
                    <TabsContent value="utm" className="space-y-4 mt-4">
                        {[1, 2, 3, 4].map((cornerNum) => {
                            const cornerKey = `corner${cornerNum}`;
                            const cornerLabels = ["Top-Left", "Top-Right", "Bottom-Right", "Bottom-Left"];
                            return (
                                <div key={cornerKey} className="bg-white border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <MapPin className="w-5 h-5 text-[#5c8a75]" />
                                        <h4 className="font-semibold text-gray-900">
                                            Corner {cornerNum} ({cornerLabels[cornerNum - 1]})
                                        </h4>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Easting (m) <span className="text-red-500">*</span></Label>
                                            <Input
                                                type="number"
                                                step="any"
                                                placeholder="200000"
                                                value={utmData[cornerKey].easting}
                                                onChange={(e) => handleUTMChange(cornerKey, "easting", e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Northing (m) <span className="text-red-500">*</span></Label>
                                            <Input
                                                type="number"
                                                step="any"
                                                placeholder="9850000"
                                                value={utmData[cornerKey].northing}
                                                onChange={(e) => handleUTMChange(cornerKey, "northing", e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Zone <span className="text-red-500">*</span></Label>
                                            <Input
                                                type="number"
                                                min="1"
                                                max="60"
                                                placeholder="37"
                                                value={utmData[cornerKey].zone}
                                                onChange={(e) => handleUTMChange(cornerKey, "zone", e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Hemisphere <span className="text-red-500">*</span></Label>
                                            <Select
                                                value={utmData[cornerKey].hemisphere}
                                                onValueChange={(value) => handleUTMChange(cornerKey, "hemisphere", value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="N">North</SelectItem>
                                                    <SelectItem value="S">South</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    {formData.coordinates?.[cornerKey]?.lat && (
                                        <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-xs">
                                            <strong>Converted:</strong> Lat: {formData.coordinates[cornerKey].lat.toFixed(6)},
                                            Lng: {formData.coordinates[cornerKey].lng.toFixed(6)}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </TabsContent>
                </Tabs>

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

                {/* Interactive Map Preview */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900">Plot Boundary Preview</h4>
                        {allCornersSet && (
                            <span className="text-xs text-green-600 font-medium">● Live Preview</span>
                        )}
                    </div>
                    <PlotBoundaryMap coordinates={formData.coordinates} className="w-full" />
                    <p className="text-xs text-gray-500 mt-2">
                        The map updates automatically as you enter coordinates. UTM values are converted to Lat/Long for display.
                    </p>
                </div>
            </div>
        </div>
    );
}