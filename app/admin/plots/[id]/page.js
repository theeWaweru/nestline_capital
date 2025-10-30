// app/admin/plots/[id]/page.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Edit,
  Trash2,
  MapPin,
  DollarSign,
  FileText,
  Eye,
  EyeOff,
} from "lucide-react";

const statusColors = {
  draft: "bg-gray-100 text-gray-800",
  available: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  booked: "bg-blue-100 text-blue-800",
};

const statusLabels = {
  draft: "Draft",
  available: "Available",
  processing: "Processing",
  booked: "Booked",
};

export default function PlotDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [plot, setPlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchPlot();
  }, [fetchPlot]);

  const fetchPlot = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/plots/${params.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch plot");
      }
      const data = await response.json();
      setPlot(data);
      if (data.images?.length > 0) {
        const thumbnail = data.images.find((img) => img.isThumbnail);
        setSelectedImage(thumbnail?.url || data.images[0].url);
      }
    } catch (error) {
      console.error("Error fetching plot:", error);
      alert("Failed to load plot");
      router.push("/admin/plots");
    } finally {
      setLoading(false);
    }
  }, [params.id, router]);

  const handleDelete = async () => {
    if (
      !confirm(
        `Are you sure you want to delete plot #${plot.plotNumber}? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/plots/${params.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete plot");
      }

      router.push("/admin/plots");
    } catch (error) {
      console.error("Error deleting plot:", error);
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-[#5c8a75] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!plot) {
    return null;
  }

  const thumbnail = plot.images?.find((img) => img.isThumbnail);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/admin/plots")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Plots
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Plot #{plot.plotNumber}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <Badge className={statusColors[plot.status]}>
                {statusLabels[plot.status]}
              </Badge>
              <span className="text-gray-600 flex items-center gap-1">
                {plot.visibility ? (
                  <>
                    <Eye className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">Visible to Investors</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">Hidden</span>
                  </>
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href={`/admin/plots/${plot._id}/edit`}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Link>
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      {plot.images && plot.images.length > 0 && (
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Plot Images</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Main Image */}
              <div className="mb-4">
                <Image
                  src={selectedImage}
                  alt="Plot view"
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {plot.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image.url)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === image.url
                        ? "border-[#5c8a75]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {image.isThumbnail && (
                      <div className="absolute top-1 right-1 bg-[#5c8a75] text-white text-xs px-1 py-0.5 rounded">
                        Main
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        {/* Price */}
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Full Price</CardDescription>
            <CardTitle className="text-2xl">
              KES {plot.price.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              30% Deposit: KES {(plot.price * 0.3).toLocaleString()}
            </p>
          </CardContent>
        </Card>

        {/* Size */}
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Plot Size</CardDescription>
            <CardTitle className="text-xl">{plot.size}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Project: {plot.project?.name}
            </p>
          </CardContent>
        </Card>

        {/* Title Deed */}
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Title Deed</CardDescription>
            <CardTitle className="text-xl">
              {plot.titleDeed?.url ? (
                <span className="text-green-600">✓ Ready</span>
              ) : (
                <span className="text-red-600">Not Uploaded</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {plot.titleDeed?.url && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(plot.titleDeed.url, "_blank")}
              >
                <FileText className="w-4 h-4 mr-2" />
                View Document
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Details Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Plot Number</p>
              <p className="font-medium">{plot.plotNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Project</p>
              <p className="font-medium">{plot.project?.name}</p>
              <p className="text-sm text-gray-500">
                {typeof plot.project?.location === "string"
                  ? plot.project.location
                  : plot.project?.location?.address ||
                    plot.project?.location?.county ||
                    ""}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <Badge className={statusColors[plot.status]}>
                {statusLabels[plot.status]}
              </Badge>
            </div>
            {plot.bookedBy && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Booked By</p>
                <p className="font-medium">{plot.bookedBy.name}</p>
                <p className="text-sm text-gray-500">{plot.bookedBy.email}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Location Coordinates */}
        <Card>
          <CardHeader>
            <CardTitle>Location Coordinates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {plot.coordinates && (
              <>
                <div className="text-sm">
                  <p className="text-gray-600 mb-1">Corner 1 (Top-Left)</p>
                  <p className="font-mono text-xs">
                    {plot.coordinates.corner1?.lat},{" "}
                    {plot.coordinates.corner1?.lng}
                  </p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-600 mb-1">Corner 2 (Top-Right)</p>
                  <p className="font-mono text-xs">
                    {plot.coordinates.corner2?.lat},{" "}
                    {plot.coordinates.corner2?.lng}
                  </p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-600 mb-1">Corner 3 (Bottom-Right)</p>
                  <p className="font-mono text-xs">
                    {plot.coordinates.corner3?.lat},{" "}
                    {plot.coordinates.corner3?.lng}
                  </p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-600 mb-1">Corner 4 (Bottom-Left)</p>
                  <p className="font-mono text-xs">
                    {plot.coordinates.corner4?.lat},{" "}
                    {plot.coordinates.corner4?.lng}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Additional Details */}
        {(plot.infrastructure ||
          plot.topography ||
          plot.soilType ||
          plot.developmentStatus) && (
          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {plot.infrastructure && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Infrastructure</p>
                  <p className="text-sm text-gray-800">{plot.infrastructure}</p>
                </div>
              )}
              {plot.topography && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Topography</p>
                  <p className="text-sm text-gray-800 capitalize">
                    {plot.topography.replace("-", " ")}
                  </p>
                </div>
              )}
              {plot.soilType && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Soil Type</p>
                  <p className="text-sm text-gray-800 capitalize">
                    {plot.soilType}
                  </p>
                </div>
              )}
              {plot.developmentStatus && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Development Status
                  </p>
                  <p className="text-sm text-gray-800 capitalize">
                    {plot.developmentStatus.replace("-", " ")}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Features & Amenities */}
        {(plot.features || plot.amenities || plot.viewOrientation) && (
          <Card>
            <CardHeader>
              <CardTitle>Features & Amenities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {plot.features && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Special Features</p>
                  <p className="text-sm text-gray-800 whitespace-pre-wrap">
                    {plot.features}
                  </p>
                </div>
              )}
              {plot.amenities && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Nearby Amenities</p>
                  <p className="text-sm text-gray-800 whitespace-pre-wrap">
                    {plot.amenities}
                  </p>
                </div>
              )}
              {plot.viewOrientation && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    View & Orientation
                  </p>
                  <p className="text-sm text-gray-800">
                    {plot.viewOrientation}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
