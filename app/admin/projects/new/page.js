// app/admin/projects/new/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MultiStepForm from "@/components/MultiStepForm";
import BasicInfoStep from "@/components/project-form/BasicInfoStep";
import StatusTimelineStep from "@/components/project-form/StatusTimelineStep";
import PlotConfigStep from "@/components/project-form/PlotConfigStep";
import PurchaseSettingsStep from "@/components/project-form/PurchaseSettingsStep";

export default function NewProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    totalLandSize: "",
    description: "",
    status: "draft",
    planningStartDate: null,
    developmentStartDate: null,
    completionDate: null,
    totalPlots: "",
    standardPlotSize: "",
    priceRange: {
      min: 0,
      max: 0,
    },
    paymentCompletionPeriod: 90,
    investorNotes: "",
  });

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
      // Set status to planning when creating full project
      const projectData = { ...formData, status: "planning" };

      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create project");
      }

      const project = await response.json();

      // Redirect to project detail page
      router.push(`/admin/projects/${project._id}`);
    } catch (error) {
      console.error("Error creating project:", error);
      alert(error.message || "Failed to create project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);

    try {
      // Save with draft status
      const draftData = { ...formData, status: "draft" };

      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(draftData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save draft");
      }

      const project = await response.json();

      alert("Draft saved successfully! You can continue editing later.");
      // Redirect to projects list
      router.push("/admin/projects");
    } catch (error) {
      console.error("Error saving draft:", error);
      alert(error.message || "Failed to save draft. Please try again.");
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleCancel = () => {
    if (
      confirm(
        "Are you sure you want to cancel? All entered information will be lost."
      )
    ) {
      router.push("/admin/projects");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
        <p className="text-gray-600 mt-2">
          Add a new land development project to the platform
        </p>
      </div>

      {/* Multi-Step Form */}
      <MultiStepForm
        steps={steps}
        formData={formData}
        updateFormData={updateFormData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onSaveDraft={handleSaveDraft}
        isSubmitting={isSubmitting}
        isSavingDraft={isSavingDraft}
      />
    </div>
  );
}
