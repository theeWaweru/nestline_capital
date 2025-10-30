// components/project-form/PlotConfigStep.jsx
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

export default function PlotConfigStep({ formData, updateFormData }) {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Plot Configuration
                </h3>
                <p className="text-sm text-gray-600">
                    Define the number of plots and their specifications
                </p>
            </div>

            <div className="space-y-4">
                {/* Total Number of Plots */}
                <div className="space-y-2">
                    <Label htmlFor="totalPlots">
                        Total Number of Plots <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="totalPlots"
                        type="number"
                        min="1"
                        placeholder="e.g., 50"
                        value={formData.totalPlots || ""}
                        onChange={(e) =>
                            updateFormData({
                                totalPlots: e.target.value ? parseInt(e.target.value) : "",
                            })
                        }
                        required
                    />
                    <p className="text-xs text-gray-500">
                        Maximum number of plots that can be added to this project
                    </p>
                </div>

                {/* Warning Box */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-900">
                        <strong>Important:</strong> This is a hard limit. Once plots are added,
                        you cannot reduce this number below the count of existing plots.
                    </div>
                </div>

                {/* Standard Plot Size */}
                <div className="space-y-2">
                    <Label htmlFor="standardPlotSize">
                        Standard Plot Size <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="standardPlotSize"
                        placeholder="e.g., 50x100M - Eighth Acre"
                        value={formData.standardPlotSize || ""}
                        onChange={(e) =>
                            updateFormData({ standardPlotSize: e.target.value })
                        }
                        required
                    />
                    <p className="text-xs text-gray-500">
                        Typical size of plots in this project (can be customized per plot)
                    </p>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                    <Label>Price Range (Optional)</Label>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="priceMin" className="text-xs text-gray-600">
                                Minimum Price (KES)
                            </Label>
                            <Input
                                id="priceMin"
                                type="number"
                                min="0"
                                placeholder="e.g., 800000"
                                value={formData.priceRange?.min || ""}
                                onChange={(e) =>
                                    updateFormData({
                                        priceRange: {
                                            ...formData.priceRange,
                                            min: e.target.value ? parseInt(e.target.value) : 0,
                                        },
                                    })
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="priceMax" className="text-xs text-gray-600">
                                Maximum Price (KES)
                            </Label>
                            <Input
                                id="priceMax"
                                type="number"
                                min="0"
                                placeholder="e.g., 1500000"
                                value={formData.priceRange?.max || ""}
                                onChange={(e) =>
                                    updateFormData({
                                        priceRange: {
                                            ...formData.priceRange,
                                            max: e.target.value ? parseInt(e.target.value) : 0,
                                        },
                                    })
                                }
                            />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500">
                        Expected price range for plots in this project
                    </p>
                </div>

                {/* Info Box */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-900">
                        <strong>Plot Numbering:</strong> When adding plots, you'll assign
                        unique 4-6 digit numbers (e.g., 2696, 2697). These help investors
                        identify specific plots.
                    </p>
                </div>
            </div>
        </div>
    );
}