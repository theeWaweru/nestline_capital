// components/plot-form/PlotLocationStep.jsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Info, Calculator } from "lucide-react";

export default function PlotLocationStep({ formData, updateFormData }) {
    const [utmData, setUtmData] = useState({
        zone: "37",
        hemisphere: "S",
        easting: "",
        northing: "",
        corner: "corner1"
    });

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

    const convertUTMtoLatLng = (zone, hemisphere, easting, northing) => {
        // UTM to Lat/Lng conversion for WGS84
        const k0 = 0.9996;
        const a = 6378137;
        const e = 0.081819191;
        const e1sq = 0.006739497;

        const arc = northing / k0;
        const mu = arc / (a * (1 - Math.pow(e, 2) / 4.0));

        const ei = (1 - Math.pow((1 - e * e), (1 / 2.0))) / (1 + Math.pow((1 - e * e), (1 / 2.0)));

        const phi1 = mu + (3 * ei / 2 - 27 * Math.pow(ei, 3) / 32.0) * Math.sin(2 * mu);

        const n0 = a / Math.pow((1 - Math.pow((e * Math.sin(phi1)), 2)), (1 / 2.0));
        const r0 = a * (1 - e * e) / Math.pow((1 - Math.pow((e * Math.sin(phi1)), 2)), (3 / 2.0));
        const fact1 = n0 * Math.tan(phi1) / r0;

        const _a1 = 500000 - easting;
        const dd0 = _a1 / (n0 * k0);
        const t0 = Math.pow(Math.tan(phi1), 2);
        const Q0 = e1sq * Math.pow(Math.cos(phi1), 2);

        const lof1 = _a1 / (n0 * k0);
        const lof2 = (1 + 2 * t0 + Q0) * Math.pow(dd0, 3) / 6.0;
        const _a2 = (lof1 - lof2) / Math.cos(phi1);
        const _a3 = _a2 * 180 / Math.PI;

        let latitude = 180 * (phi1 - fact1 * Math.pow(dd0, 2) / 2) / Math.PI;
        let longitude = ((zone > 0 ? (6 * zone - 183.0) : 3.0) - _a3);

        if (hemisphere === "S") {
            latitude = -Math.abs(latitude);
        }

        return {
            lat: parseFloat(latitude.toFixed(7)),
            lng: parseFloat(longitude.toFixed(7))
        };
    };

    const handleUTMConvert = () => {
        if (!utmData.easting || !utmData.northing) {
            alert("Please enter both Easting and Northing values");
            return;
        }

        try {
            const result = convertUTMtoLatLng(
                parseInt(utmData.zone),
                utmData.hemisphere,
                parseFloat(utmData.easting),
                parseFloat(utmData.northing)
            );

            updateFormData({
                coordinates: {
                    ...formData.coordinates,
                    [utmData.corner]: result,
                },
            });

            alert(`✓ Converted to ${utmData.corner}!\nLat: ${result.lat}\nLng: ${result.lng}`);
        } catch (error) {
            alert("Conversion failed. Please check your UTM values.");
        }
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

    const renderCoordinateInputs = (cornerNum, cornerLabel) => (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-[#5c8a75]" />
                <h4 className="font-semibold text-gray-900">{cornerLabel}</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor={`${cornerNum}-lat`}>
                        Latitude <span className="text-red-500">*</span>
                        <span className="text-xs text-gray-500 ml-1">(-90 to 90)</span>
                    </Label>
                    <Input
                        id={`${cornerNum}-lat`}
                        type="number"
                        step="any"
                        placeholder="-3.052971"
                        value={formData.coordinates?.[cornerNum]?.lat || ""}
                        onChange={(e) =>
                            handleCoordinateChange(cornerNum, "lat", e.target.value)
                        }
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`${cornerNum}-lng`}>
                        Longitude <span className="text-red-500">*</span>
                        <span className="text-xs text-gray-500 ml-1">(-180 to 180)</span>
                    </Label>
                    <Input
                        id={`${cornerNum}-lng`}
                        type="number"
                        step="any"
                        placeholder="40.164583"
                        value={formData.coordinates?.[cornerNum]?.lng || ""}
                        onChange={(e) =>
                            handleCoordinateChange(cornerNum, "lng", e.target.value)
                        }
                        required
                    />
                </div>
            </div>
        </div>
    );

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

            <Tabs defaultValue="latlong" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="latlong">Lat/Long</TabsTrigger>
                    <TabsTrigger value="utm">
                        <Calculator className="w-4 h-4 mr-2" />
                        UTM Converter
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="latlong" className="space-y-4 mt-4">
                    {/* Instructions */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-blue-900">
                                <p className="font-semibold mb-2">How to get coordinates from Google Maps:</p>
                                <ol className="list-decimal list-inside space-y-1 ml-2">
                                    <li>Open Google Maps</li>
                                    <li>Right-click on a corner of the plot</li>
                                    <li>Click the coordinates (e.g., "-3.0530, 40.1646")</li>
                                    <li>Paste latitude and longitude separately below</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    {renderCoordinateInputs("corner1", "Corner 1 (Top-Left)")}
                    {renderCoordinateInputs("corner2", "Corner 2 (Top-Right)")}
                    {renderCoordinateInputs("corner3", "Corner 3 (Bottom-Right)")}
                    {renderCoordinateInputs("corner4", "Corner 4 (Bottom-Left)")}

                    {allCornersSet ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                            <p className="text-green-800 font-medium">
                                ✓ All corner coordinates set
                            </p>
                        </div>
                    ) : (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                            <p className="text-yellow-800">
                                Please set all four corner coordinates
                            </p>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="utm" className="space-y-4 mt-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-blue-900">
                                <p className="font-semibold mb-2">UTM to Lat/Long Converter</p>
                                <p>Enter UTM coordinates to automatically convert to Latitude/Longitude. Kenya typically uses Zone 36 or 37.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>UTM Zone</Label>
                                <Select
                                    value={utmData.zone}
                                    onValueChange={(value) => setUtmData({ ...utmData, zone: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="36">Zone 36</SelectItem>
                                        <SelectItem value="37">Zone 37</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Hemisphere</Label>
                                <Select
                                    value={utmData.hemisphere}
                                    onValueChange={(value) => setUtmData({ ...utmData, hemisphere: value })}
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

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Easting (m)</Label>
                                <Input
                                    type="number"
                                    placeholder="500000"
                                    value={utmData.easting}
                                    onChange={(e) => setUtmData({ ...utmData, easting: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Northing (m)</Label>
                                <Input
                                    type="number"
                                    placeholder="9665963"
                                    value={utmData.northing}
                                    onChange={(e) => setUtmData({ ...utmData, northing: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Apply to Corner</Label>
                            <Select
                                value={utmData.corner}
                                onValueChange={(value) => setUtmData({ ...utmData, corner: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="corner1">Corner 1 (Top-Left)</SelectItem>
                                    <SelectItem value="corner2">Corner 2 (Top-Right)</SelectItem>
                                    <SelectItem value="corner3">Corner 3 (Bottom-Right)</SelectItem>
                                    <SelectItem value="corner4">Corner 4 (Bottom-Left)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            type="button"
                            onClick={handleUTMConvert}
                            className="w-full bg-[#5c8a75] hover:bg-[#4a6f5f]"
                        >
                            <Calculator className="w-4 h-4 mr-2" />
                            Convert & Apply
                        </Button>
                    </div>

                    {/* Show current coordinates */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Current Coordinates</h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            {["corner1", "corner2", "corner3", "corner4"].map((corner, idx) => (
                                <div key={corner} className="flex justify-between">
                                    <span className="text-gray-600">Corner {idx + 1}:</span>
                                    <span className="font-mono text-gray-900">
                                        {formData.coordinates?.[corner]?.lat && formData.coordinates?.[corner]?.lng
                                            ? `${formData.coordinates[corner].lat.toFixed(6)}, ${formData.coordinates[corner].lng.toFixed(6)}`
                                            : "Not set"
                                        }
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}