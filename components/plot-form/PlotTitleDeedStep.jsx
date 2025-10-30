// components/plot-form/PlotTitleDeedStep.jsx
"use client";

import PdfUploader from "@/components/PdfUploader";
import { FileText, AlertCircle, CheckCircle } from "lucide-react";

export default function PlotTitleDeedStep({ formData, updateFormData }) {
    const handleTitleDeedChange = (titleDeed) => {
        updateFormData({ titleDeed });
    };

    const hasTitleDeed = formData.titleDeed && formData.titleDeed.url;

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Title Deed Document
                </h3>
                <p className="text-sm text-gray-600">
                    Upload the official title deed for this plot
                </p>
            </div>

            <div className="space-y-4">
                {/* Critical Notice */}
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-red-900">
                            <p className="font-semibold mb-2">⚠️ CRITICAL REQUIREMENT</p>
                            <p>
                                This plot will <strong>NOT be visible</strong> to investors until
                                a title deed is uploaded. Only plots with ready title deeds are
                                shown on the investor dashboard.
                            </p>
                        </div>
                    </div>
                </div>

                {/* PDF Uploader */}
                <PdfUploader
                    file={formData.titleDeed || null}
                    onChange={handleTitleDeedChange}
                    folder="title-deeds"
                />

                {/* Status Messages */}
                {hasTitleDeed ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <div className="text-sm text-green-900">
                                <p className="font-semibold">✓ Title Deed Uploaded</p>
                                <p className="mt-1">
                                    This plot will be visible to investors once you complete the
                                    form and set status to "Available"
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <FileText className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                            <div className="text-sm text-yellow-900">
                                <p className="font-semibold">No Title Deed Yet</p>
                                <p className="mt-1">
                                    You can save this plot as a draft, but it won't be visible to
                                    investors until a title deed is uploaded.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Document Guidelines */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-900 mb-3">
                        📄 Title Deed Requirements:
                    </p>
                    <ul className="text-sm text-gray-700 space-y-2 ml-4 list-disc">
                        <li>
                            <strong>Format:</strong> PDF only (scanned or digital)
                        </li>
                        <li>
                            <strong>Quality:</strong> Clear and legible, all pages included
                        </li>
                        <li>
                            <strong>Content:</strong> Official title deed from relevant land
                            authority
                        </li>
                        <li>
                            <strong>Verification:</strong> Ensure plot number matches the deed
                        </li>
                        <li>
                            <strong>Size:</strong> Maximum 10MB
                        </li>
                    </ul>
                </div>

                {/* Investor Trust Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">
                        <strong>🔒 Building Trust:</strong> Providing ready title deeds builds
                        investor confidence and demonstrates transparency. This is a key
                        factor in investment decisions.
                    </p>
                </div>
            </div>
        </div>
    );
}