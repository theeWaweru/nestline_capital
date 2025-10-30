// app/admin/plots/[id]/edit/page.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import MultiStepForm from "@/components/MultiStepForm";
import PlotBasicDetailsStep from "@/components/plot-form/PlotBasicDetailsStep";
import PlotImagesStep from "@/components/plot-form/PlotImagesStep";
import PlotTitleDeedStep from "@/components/plot-form/PlotTitleDeedStep";
import PlotLocationStep from "@/components/plot-form/PlotLocationStep";
import PlotAdditionalInfoStep from "@/components/plot-form/PlotAdditionalInfoStep";

export default function EditPlotPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    project: "",
    plotNumber: "",
    size: "",
    price: "",
    images: [],
    titleDeed: null,
    coordinates: {
      corner1: { lat: "", lng: "" },
      corner2: { lat: "", lng: "" },
      corner3: { lat: "", lng: "" },
      corner4: { lat: "", lng: "" },
    },
    infrastructure: "",
    topography: "",
    soilType: "",
    features: "",
    amenities: "",
    developmentStatus: "",
    viewOrientation: "",
  });

  useEffect(() => {
    fetchPlot();
  }, [fetchPlot]);

  const fetchPlot = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/plots/${params.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch plot");
      }
      const plot = await response.json();

      // Populate form with existing data
      setFormData({
        project: plot.project?._id || "",
        plotNumber: plot.plotNumber || "",
        size: plot.size || "",
        price: plot.price || "",
        images: plot.images || [],
        titleDeed: plot.titleDeed || null,
        coordinates: plot.coordinates || {
          corner1: { lat: "", lng: "" },
          corner2: { lat: "", lng: "" },
          corner3: { lat: "", lng: "" },
          corner4: { lat: "", lng: "" },
        },
        infrastructure: plot.infrastructure || "",
        topography: plot.topography || "",
        soilType: plot.soilType || "",
        features: plot.features || "",
        amenities: plot.amenities || "",
        developmentStatus: plot.developmentStatus || "",
        viewOrientation: plot.viewOrientation || "",
      });
    } catch (error) {
      console.error("Error fetching plot:", error);
      alert("Failed to load plot. Please try again.");
      router.push("/admin/plots");
    } finally {
      setLoading(false);
    }
  }, [params.id, router]);

  const updateFormData = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const steps = [
    {
      title: "Basic Details",
      description: "Plot info",
      component: PlotBasicDetailsStep,
    },
    {
      title: "Images",
      description: "Photo gallery",
      component: PlotImagesStep,
    },
    {
      title: "Title Deed",
      description: "Legal document",
      component: PlotTitleDeedStep,
    },
    {
      title: "Location",
      description: "Coordinates",
      component: PlotLocationStep,
    },
    {
      title: "Details",
      description: "Additional info",
      component: PlotAdditionalInfoStep,
    },
  ];

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.images || formData.images.length < 4) {
      alert("Please upload at least 4 images");
      return;
    }

    if (
      !formData.coordinates?.corner1?.lat ||
      !formData.coordinates?.corner2?.lat ||
      !formData.coordinates?.corner3?.lat ||
      !formData.coordinates?.corner4?.lat
    ) {
      alert("Please set all four corner coordinates");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/admin/plots/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update plot");
      }

      const plot = await response.json();

      // Redirect to plot detail page
      router.push(`/admin/plots/${plot._id}`);
    } catch (error) {
      console.error("Error updating plot:", error);
      alert(error.message || "Failed to update plot. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (
      confirm(
        "Are you sure you want to cancel? Any unsaved changes will be lost."
      )
    ) {
      router.push(`/admin/plots/${params.id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-[#5c8a75] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Plot</h1>
        <p className="text-gray-600 mt-2">
          Update plot details and documentation
        </p>
      </div>

      {/* Multi-Step Form */}
      <MultiStepForm
        steps={steps}
        formData={formData}
        updateFormData={updateFormData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
