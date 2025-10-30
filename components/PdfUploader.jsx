// components/PdfUploader.jsx
"use client";

import { useState } from "react";
import { FileText, Upload, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * PdfUploader Component
 * Single PDF file uploader for title deeds
 * 
 * @param {Object} props
 * @param {Object} props.file - File object { url, fileName, uploadedAt }
 * @param {Function} props.onChange - Callback when file changes
 * @param {string} props.folder - S3 folder name (default: 'title-deeds')
 */
export default function PdfUploader({
    file = null,
    onChange,
    folder = "title-deeds",
}) {
    const [uploading, setUploading] = useState(false);

    const handleFileSelect = async (e) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        // Validate PDF
        if (selectedFile.type !== "application/pdf") {
            alert("Please select a PDF file");
            return;
        }

        // Validate size (10MB max)
        const maxSize = 10 * 1024 * 1024;
        if (selectedFile.size > maxSize) {
            alert("File too large. Maximum size is 10MB.");
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("folder", folder);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            const data = await response.json();

            onChange({
                url: data.url,
                fileName: selectedFile.name,
                uploadedAt: new Date().toISOString(),
            });
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload PDF. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const removeFile = () => {
        onChange(null);
    };

    return (
        <div className="space-y-4">
            {!file ? (
                <label>
                    <Card
                        className={cn(
                            "border-2 border-dashed p-6 text-center cursor-pointer transition-colors hover:border-[#5c8a75]/50",
                            uploading && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileSelect}
                            disabled={uploading}
                            className="hidden"
                        />
                        <Upload className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                        {uploading ? (
                            <p className="text-sm text-gray-600">Uploading PDF...</p>
                        ) : (
                            <>
                                <p className="text-base font-medium text-gray-700 mb-1">
                                    Click to upload title deed
                                </p>
                                <p className="text-sm text-gray-500">
                                    PDF only • Max 10MB
                                </p>
                            </>
                        )}
                    </Card>
                </label>
            ) : (
                <Card className="p-4 border-[#5c8a75] bg-[#5c8a75]/5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#5c8a75] rounded">
                                <FileText className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    {file.fileName}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Uploaded {new Date(file.uploadedAt).toLocaleDateString()}
                                </p>
                            </div>
                            <CheckCircle className="w-5 h-5 text-green-600 ml-2" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(file.url, "_blank")}
                            >
                                View
                            </Button>
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={removeFile}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}