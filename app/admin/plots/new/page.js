// app/admin/plots/new/page.js
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MultiStepForm from "@/components/MultiStepForm";
import PlotBasicDetailsStep from "@/components/plot-form/PlotBasicDetailsStep";
import PlotImagesStep from "@/components/plot-form/PlotImagesStep";
import PlotTitleDeedStep from "@/components/plot-form/PlotTitleDeedStep";
import PlotLocationStep from "@/components/plot-form/PlotLocationStep";
import PlotAdditionalInfoStep from "@/components/plot-form/PlotAdditionalInfoStep";

export default function NewPlotPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedProject = searchParams.get("project");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    project: preselectedProject || "",
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
    if (!formData.project) {
      alert("Please select a project");
      return;
    }

    if (!formData.plotNumber) {
      alert("Please enter a plot number");
      return;
    }

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
      const response = await fetch("/api/admin/plots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create plot");
      }

      const plot = await response.json();

      // Redirect to plot detail page
      router.push(`/admin/plots/${plot._id}`);
    } catch (error) {
      console.error("Error creating plot:", error);
      alert(error.message || "Failed to create plot. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (
      confirm(
        "Are you sure you want to cancel? All entered information will be lost."
      )
    ) {
      if (preselectedProject) {
        router.push(`/admin/projects/${preselectedProject}`);
      } else {
        router.push("/admin/plots");
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Plot</h1>
        <p className="text-gray-600 mt-2">
          Create a new land plot with complete details and documentation
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
