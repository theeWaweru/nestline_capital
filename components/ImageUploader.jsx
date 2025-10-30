// components/ImageUploader.jsx
"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * ImageUploader Component
 * Drag-and-drop image uploader with preview
 * 
 * @param {Object} props
 * @param {Array} props.images - Array of image objects { url, isThumbnail, order }
 * @param {Function} props.onChange - Callback when images change
 * @param {number} props.maxImages - Maximum number of images (default: 8)
 * @param {string} props.folder - S3 folder name (default: 'plots')
 */
export default function ImageUploader({
    images = [],
    onChange,
    maxImages = 8,
    folder = "plots",
}) {
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({});

    const onDrop = useCallback(
        async (acceptedFiles) => {
            if (images.length + acceptedFiles.length > maxImages) {
                alert(`Maximum ${maxImages} images allowed`);
                return;
            }

            setUploading(true);

            try {
                // Upload all files
                const uploadPromises = acceptedFiles.map(async (file, index) => {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("folder", folder);

                    setUploadProgress((prev) => ({
                        ...prev,
                        [file.name]: 0,
                    }));

                    const response = await fetch("/api/upload", {
                        method: "POST",
                        body: formData,
                    });

                    if (!response.ok) {
                        throw new Error("Upload failed");
                    }

                    const data = await response.json();

                    setUploadProgress((prev) => ({
                        ...prev,
                        [file.name]: 100,
                    }));

                    return {
                        url: data.url,
                        isThumbnail: images.length === 0 && index === 0, // First image is thumbnail
                        order: images.length + index,
                    };
                });

                const uploadedImages = await Promise.all(uploadPromises);
                onChange([...images, ...uploadedImages]);
            } catch (error) {
                console.error("Upload error:", error);
                alert("Failed to upload images. Please try again.");
            } finally {
                setUploading(false);
                setUploadProgress({});
            }
        },
        [images, onChange, maxImages, folder]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png", ".webp"],
        },
        maxFiles: maxImages - images.length,
        disabled: uploading || images.length >= maxImages,
    });

    const removeImage = (indexToRemove) => {
        const updatedImages = images.filter((_, index) => index !== indexToRemove);
        // Reorder remaining images
        const reorderedImages = updatedImages.map((img, index) => ({
            ...img,
            order: index,
            // If removed image was thumbnail, make first image thumbnail
            isThumbnail: indexToRemove === 0 && index === 0 ? true : img.isThumbnail,
        }));
        onChange(reorderedImages);
    };

    const setThumbnail = (index) => {
        const updatedImages = images.map((img, i) => ({
            ...img,
            isThumbnail: i === index,
        }));
        onChange(updatedImages);
    };

    return (
        <div className="space-y-4">
            {/* Dropzone */}
            {images.length < maxImages && (
                <div
                    {...getRootProps()}
                    className={cn(
                        "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                        isDragActive
                            ? "border-[#5c8a75] bg-[#5c8a75]/5"
                            : "border-gray-300 hover:border-[#5c8a75]/50",
                        uploading && "opacity-50 cursor-not-allowed"
                    )}
                >
                    <input {...getInputProps()} />
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    {uploading ? (
                        <div>
                            <p className="text-sm text-gray-600 mb-2">Uploading...</p>
                            {Object.entries(uploadProgress).map(([fileName, progress]) => (
                                <div key={fileName} className="text-xs text-gray-500">
                                    {fileName}: {progress}%
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <p className="text-base font-medium text-gray-700 mb-1">
                                {isDragActive
                                    ? "Drop images here"
                                    : "Drag & drop images here, or click to select"}
                            </p>
                            <p className="text-sm text-gray-500">
                                Up to {maxImages} images • JPEG, PNG, WebP • Max 10MB each
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                                {images.length} of {maxImages} uploaded
                            </p>
                        </>
                    )}
                </div>
            )}

            {/* Image Preview Grid */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                        <Card
                            key={index}
                            className={cn(
                                "relative overflow-hidden group",
                                image.isThumbnail && "ring-2 ring-[#5c8a75]"
                            )}
                        >
                            <div className="aspect-square relative">
                                <Image
                                    src={image.url}
                                    alt={`Upload ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    {!image.isThumbnail && (
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => setThumbnail(index)}
                                            className="text-xs"
                                        >
                                            <ImageIcon className="w-3 h-3 mr-1" />
                                            Set as Main
                                        </Button>
                                    )}
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => removeImage(index)}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>

                                {/* Thumbnail Badge */}
                                {image.isThumbnail && (
                                    <div className="absolute top-2 left-2 bg-[#5c8a75] text-white text-xs px-2 py-1 rounded">
                                        Main Image
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {images.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                    No images uploaded yet
                </p>
            )}
        </div>
    );
}