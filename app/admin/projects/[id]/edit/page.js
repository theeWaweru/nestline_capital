// app/admin/projects/[id]/edit/page.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import MultiStepForm from "@/components/MultiStepForm";
import BasicInfoStep from "@/components/project-form/BasicInfoStep";
import StatusTimelineStep from "@/components/project-form/StatusTimelineStep";
import PlotConfigStep from "@/components/project-form/PlotConfigStep";
import PurchaseSettingsStep from "@/components/project-form/PurchaseSettingsStep";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    totalLandSize: "",
    description: "",
    status: "planning",
    planningStartDate: null,
    developmentStartDate: null,
    completionDate: null,
    totalPlots: "",
    standardPlotSize: "",
    paymentCompletionPeriod: 90,
    investorNotes: "",
  });

  const fetchProject = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/projects/${params.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }
      const project = await response.json();

      // Populate form with existing data
      setFormData({
        name: project.name || "",
        location:
          typeof project.location === "string"
            ? project.location
            : project.location?.address || project.location?.county || "",
        totalLandSize: project.totalLandSize || "",
        description: project.description || "",
        status: project.status || "planning",
        planningStartDate: project.planningStartDate || null,
        developmentStartDate: project.developmentStartDate || null,
        completionDate: project.completionDate || null,
        totalPlots: project.totalPlots || "",
        standardPlotSize: project.standardPlotSize || "",
        paymentCompletionPeriod: project.paymentCompletionPeriod || 90,
        investorNotes: project.investorNotes || "",
      });
    } catch (error) {
      console.error("Error fetching project:", error);
      alert("Failed to load project. Please try again.");
      router.push("/admin/projects");
    } finally {
      setLoading(false);
    }
  }, [params.id, router]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);


const updateFormData = (updates) => {
  setFormData((prev) => ({ ...prev, ...updates }));
};

const steps = [
  {
    title: "Basic Info",
    description: "Project details",
    component: BasicInfoStep,
  },
  {
    title: "Timeline",
    description: "Status & dates",
    component: StatusTimelineStep,
  },
  {
    title: "Plot Config",
    description: "Plots & pricing",
    component: PlotConfigStep,
  },
  {
    title: "Purchase Terms",
    description: "Payment settings",
    component: PurchaseSettingsStep,
  },
];

const handleSubmit = async () => {
  setIsSubmitting(true);

  try {
    const response = await fetch(`/api/admin/projects/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update project");
    }

    const project = await response.json();

    // Redirect to project detail page
    router.push(`/admin/projects/${project._id}`);
  } catch (error) {
    console.error("Error updating project:", error);
    alert(error.message || "Failed to update project. Please try again.");
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
    router.push(`/admin/projects/${params.id}`);
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
      <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
      <p className="text-gray-600 mt-2">Update project details and settings</p>
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