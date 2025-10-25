// =============================================================================
// 5. components/ui/ImageUpload.js - Image upload component
// =============================================================================
"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

export default function ImageUpload({
  onImagesChange,
  maxImages = 5,
  existingImages = [],
}) {
  const [images, setImages] = useState(existingImages);
  const [uploading, setUploading] = useState(false);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const handleFileSelect = useCallback(
    async (event) => {
      const files = Array.from(event.target.files);

      if (images.length + files.length > maxImages) {
        alert(`You can only upload up to ${maxImages} images`);
        return;
      }

      setUploading(true);
      try {
        const uploadPromises = files.map(uploadToCloudinary);
        const uploadedUrls = await Promise.all(uploadPromises);

        const newImages = [...images, ...uploadedUrls];
        setImages(newImages);
        onImagesChange(newImages);
      } catch (error) {
        alert("Failed to upload images. Please try again.");
      } finally {
        setUploading(false);
      }
    },
    [images, maxImages, onImagesChange]
  );

  const handleRemoveImage = (indexToRemove) => {
    const newImages = images.filter((_, index) => index !== indexToRemove);
    setImages(newImages);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((imageUrl, index) => (
          <div key={index} className="relative group">
            <Image
              src={imageUrl}
              alt={`Upload ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg border border-gray-300"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        ))}

        {images.length < maxImages && (
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <div className="text-2xl text-gray-400 mb-2">📷</div>
              <p className="text-sm text-gray-500">Click to upload</p>
            </div>
            <input
              type="file"
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              disabled={uploading}
            />
          </label>
        )}
      </div>

      {uploading && (
        <div className="text-center py-4">
          <div className="loading-spinner mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Uploading images...</p>
        </div>
      )}

      <p className="text-sm text-gray-600">
        Upload up to {maxImages} high-quality images. Supported formats: JPG,
        PNG, WebP
      </p>
    </div>
  );
}
