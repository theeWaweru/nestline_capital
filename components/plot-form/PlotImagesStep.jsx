// components/plot-form/PlotImagesStep.jsx
"use client";

import ImageUploader from "@/components/ImageUploader";
import { AlertCircle, Image as ImageIcon } from "lucide-react";

export default function PlotImagesStep({ formData, updateFormData }) {
    const handleImagesChange = (images) => {
        updateFormData({ images });
    };

    const hasMinimumImages = formData.images && formData.images.length >= 4;
    const hasThumbnail = formData.images?.some((img) => img.isThumbnail);

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Plot Images
                </h3>
                <p className="text-sm text-gray-600">
                    Upload high-quality images showcasing this plot
                </p>
            </div>

            <div className="space-y-4">
                {/* Requirements Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <ImageIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-900 space-y-2">
                            <p>
                                <strong>Image Requirements:</strong>
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>Minimum 4 images required (up to 8+ recommended)</li>
                                <li>Formats: JPEG, PNG, WebP</li>
                                <li>Maximum size: 10MB per image</li>
                                <li>First image will be set as thumbnail (can be changed)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Image Uploader */}
                <ImageUploader
                    images={formData.images || []}
                    onChange={handleImagesChange}
                    maxImages={12}
                    folder="plots"
                />

                {/* Validation Messages */}
                {formData.images && formData.images.length > 0 && (
                    <div className="space-y-2">
                        {!hasMinimumImages && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex gap-2">
                                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                                <p className="text-sm text-yellow-900">
                                    Please upload at least {4 - formData.images.length} more{" "}
                                    {4 - formData.images.length === 1 ? "image" : "images"} (
                                    {formData.images.length}/4 minimum)
                                </p>
                            </div>
                        )}

                        {hasMinimumImages && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                <p className="text-sm text-green-900">
                                    ✓ {formData.images.length} images uploaded • Requirements met
                                </p>
                            </div>
                        )}

                        {!hasThumbnail && formData.images.length > 0 && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                <p className="text-sm text-yellow-900">
                                    <strong>Tip:</strong> Click "Set as Main" on your best image to
                                    make it the plot thumbnail
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Image Guidelines */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">
                        📸 Image Tips for Better Presentation:
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                        <li>Capture different angles and perspectives of the plot</li>
                        <li>Include boundaries, access roads, and surrounding area</li>
                        <li>Show any special features (trees, water, elevation)</li>
                        <li>Take photos in good lighting conditions</li>
                        <li>Include wide shots and close-up details</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}