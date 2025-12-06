// app/admin/plots/[id]/page.js
"use client";

import { useState, useEffect } from "react";
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
import PlotBoundaryMap from "@/components/plot-form/PlotBoundaryMap";

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
    const fetchPlot = async () => {
      try {
        const response = await fetch(`/api/admin/plots/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch plot");

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
    };

    fetchPlot();
  }, [params.id, router]);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete plot #${plot.plotNumber}?`))
      return;

    try {
      const response = await fetch(`/api/admin/plots/${params.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete plot");
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

  if (!plot) return null;

  return (
    <div className="p-6 max-w-7xl mx-auto">
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
                    <Eye className="w-4 h-4" />
                    Visible to public
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Hidden from public
                  </>
                )}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/admin/plots/${params.id}/edit`}>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt={`Plot ${plot.plotNumber}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No image available
                  </div>
                )}
              </div>

              {plot.images && plot.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {plot.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image.url)}
                      className={`relative aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === image.url
                          ? "border-[#5c8a75]"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={`Plot ${plot.plotNumber} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {plot.coordinates && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Plot Boundary Location
                </CardTitle>
                <CardDescription>
                  Visual representation of the plot&apos;s corner coordinates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PlotBoundaryMap coordinates={plot.coordinates} />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {plot.infrastructure && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Infrastructure & Utilities
                  </h4>
                  <p className="text-gray-600 text-sm">{plot.infrastructure}</p>
                </div>
              )}
              {plot.topography && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Topography
                  </h4>
                  <p className="text-gray-600 text-sm capitalize">
                    {plot.topography}
                  </p>
                </div>
              )}
              {plot.soilType && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Soil Type
                  </h4>
                  <p className="text-gray-600 text-sm capitalize">
                    {plot.soilType}
                  </p>
                </div>
              )}
              {plot.features && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
                  <p className="text-gray-600 text-sm">{plot.features}</p>
                </div>
              )}
              {plot.amenities && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Nearby Amenities
                  </h4>
                  <p className="text-gray-600 text-sm">{plot.amenities}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Plot Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Project</p>
                <p className="font-semibold">{plot.project?.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Plot Number</p>
                <p className="font-semibold">#{plot.plotNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Size</p>
                <p className="font-semibold">{plot.size}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  Price
                </p>
                <p className="text-2xl font-bold text-[#5c8a75]">
                  KES {plot.price?.toLocaleString()}
                </p>
              </div>
              {plot.developmentStatus && (
                <div>
                  <p className="text-sm text-gray-600">Development Status</p>
                  <p className="font-semibold capitalize">
                    {plot.developmentStatus}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {plot.coordinates && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Corner Coordinates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num}>
                      <p className="text-gray-600">Corner {num}</p>
                      <p className="font-mono text-xs">
                        {plot.coordinates[`corner${num}`]?.lat},{" "}
                        {plot.coordinates[`corner${num}`]?.lng}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {plot.titleDeed && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Title Deed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a
                    href={plot.titleDeed}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Document
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="pt-6 space-y-2 text-sm text-gray-600">
              <div>
                <p className="text-xs">Created</p>
                <p>{new Date(plot.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs">Last Updated</p>
                <p>{new Date(plot.updatedAt).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
