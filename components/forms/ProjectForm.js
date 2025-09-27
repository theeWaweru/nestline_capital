// =============================================================================
// 3. components/forms/ProjectForm.js - Beautiful project creation form
// =============================================================================
"use client";

import { useState } from "react";
import MapLocationPicker from "@/components/maps/MapLocationPicker";
import ImageUpload from "@/components/ui/ImageUpload";

export default function ProjectForm({ project = null, onSuccess }) {
  const [formData, setFormData] = useState({
    name: project?.name || "",
    description: project?.description || "",
    location: {
      county: project?.location?.county || "",
      address: project?.location?.address || "",
      coordinates: project?.location?.coordinates || {
        lat: -1.2921,
        lng: 36.8219,
      },
    },
    totalPlots: project?.totalPlots || "",
    totalArea: project?.totalArea || "",
    developmentType: project?.developmentType || "residential",
    developmentPhase: project?.developmentPhase || "Phase 1",
    restrictions: project?.restrictions || "",
    status: project?.status || "planning",
    startDate: project?.startDate
      ? new Date(project.startDate).toISOString().split("T")[0]
      : "",
    expectedCompletion: project?.expectedCompletion
      ? new Date(project.expectedCompletion).toISOString().split("T")[0]
      : "",
    budgetUsed: project?.budgetUsed || 0,
    riskLevel: project?.riskLevel || "low",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const steps = [
    {
      id: 1,
      title: "Basic Information",
      description: "Project name and description",
    },
    {
      id: 2,
      title: "Location Details",
      description: "Address and coordinates",
    },
    {
      id: 3,
      title: "Development Specs",
      description: "Type, phase, and restrictions",
    },
    {
      id: 4,
      title: "Timeline & Budget",
      description: "Dates and financial planning",
    },
  ];

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = "Project name is required";
        if (!formData.description.trim())
          newErrors.description = "Description is required";
        if (!formData.totalPlots || formData.totalPlots <= 0)
          newErrors.totalPlots = "Total plots must be greater than 0";
        if (!formData.totalArea || formData.totalArea <= 0)
          newErrors.totalArea = "Total area must be greater than 0";
        break;
      case 2:
        if (!formData.location.county.trim())
          newErrors["location.county"] = "County is required";
        if (!formData.location.address.trim())
          newErrors["location.address"] = "Address is required";
        break;
      case 3:
        if (!formData.restrictions.trim())
          newErrors.restrictions = "Development restrictions are required";
        break;
      case 4:
        if (formData.startDate && formData.expectedCompletion) {
          if (
            new Date(formData.startDate) >=
            new Date(formData.expectedCompletion)
          ) {
            newErrors.expectedCompletion =
              "Expected completion must be after start date";
          }
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(currentStep)) return;

    setLoading(true);
    try {
      const url = project ? `/api/projects/${project._id}` : "/api/projects";
      const method = project ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        onSuccess(data);
      } else {
        const errorData = await response.json();
        setErrors({ submit: errorData.error || "Failed to save project" });
      }
    } catch (error) {
      console.error("Error saving project:", error);
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <nav aria-label="Progress">
        <ol className="flex items-center">
          {steps.map((step, stepIdx) => (
            <li
              key={step.id}
              className={`relative ${
                stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : ""
              }`}
            >
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                {stepIdx !== steps.length - 1 && (
                  <div
                    className={`h-0.5 w-full ${
                      currentStep > step.id ? "bg-sage-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
              <div
                className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                  currentStep > step.id
                    ? "bg-sage-600"
                    : currentStep === step.id
                    ? "border-2 border-sage-600 bg-white"
                    : "border-2 border-gray-300 bg-white"
                }`}
              >
                {currentStep > step.id ? (
                  <span className="text-white text-sm">✓</span>
                ) : (
                  <span
                    className={`text-sm ${
                      currentStep === step.id
                        ? "text-sage-600"
                        : "text-gray-500"
                    }`}
                  >
                    {step.id}
                  </span>
                )}
              </div>
              <div className="mt-3">
                <p
                  className={`text-sm font-medium ${
                    currentStep >= step.id ? "text-sage-600" : "text-gray-500"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData("name", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., PalmCrest Residences Phase 1"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Development Type *
          </label>
          <select
            value={formData.developmentType}
            onChange={(e) => updateFormData("developmentType", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="mixed">Mixed Use</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Plots *
          </label>
          <input
            type="number"
            value={formData.totalPlots}
            onChange={(e) =>
              updateFormData("totalPlots", parseInt(e.target.value))
            }
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 ${
              errors.totalPlots ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="16"
            min="1"
          />
          {errors.totalPlots && (
            <p className="mt-1 text-sm text-red-600">{errors.totalPlots}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Area (Acres) *
          </label>
          <input
            type="number"
            step="0.1"
            value={formData.totalArea}
            onChange={(e) =>
              updateFormData("totalArea", parseFloat(e.target.value))
            }
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 ${
              errors.totalArea ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="2.0"
            min="0.1"
          />
          {errors.totalArea && (
            <p className="mt-1 text-sm text-red-600">{errors.totalArea}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => updateFormData("description", e.target.value)}
          rows={4}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Describe the project vision, target market, and key features..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            County *
          </label>
          <select
            value={formData.location.county}
            onChange={(e) => updateFormData("location.county", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 ${
              errors["location.county"] ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select County</option>
            <option value="Nairobi County">Nairobi County</option>
            <option value="Kiambu County">Kiambu County</option>
            <option value="Machakos County">Machakos County</option>
            <option value="Kajiado County">Kajiado County</option>
            <option value="Nakuru County">Nakuru County</option>
            <option value="Kilifi County">Kilifi County</option>
            <option value="Mombasa County">Mombasa County</option>
          </select>
          {errors["location.county"] && (
            <p className="mt-1 text-sm text-red-600">
              {errors["location.county"]}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Development Phase
          </label>
          <select
            value={formData.developmentPhase}
            onChange={(e) => updateFormData("developmentPhase", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
          >
            <option value="Phase 1">Phase 1</option>
            <option value="Phase 2">Phase 2</option>
            <option value="Phase 3">Phase 3</option>
            <option value="Phase 4">Phase 4</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Address *
        </label>
        <input
          type="text"
          value={formData.location.address}
          onChange={(e) => updateFormData("location.address", e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 ${
            errors["location.address"] ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter the complete address of the project"
        />
        {errors["location.address"] && (
          <p className="mt-1 text-sm text-red-600">
            {errors["location.address"]}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Location *
        </label>
        <p className="text-sm text-gray-600 mb-4">
          Click on the map to set the exact location coordinates for this
          project.
        </p>
        <MapLocationPicker
          initialLocation={formData.location.coordinates}
          onLocationChange={(coords) =>
            updateFormData("location.coordinates", coords)
          }
          className="h-64 rounded-lg border border-gray-300"
        />
        <p className="mt-2 text-xs text-gray-500">
          Coordinates: {formData.location.coordinates.lat.toFixed(6)},{" "}
          {formData.location.coordinates.lng.toFixed(6)}
        </p>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => updateFormData("status", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
          >
            <option value="planning">Planning</option>
            <option value="development">Development</option>
            <option value="ready">Ready</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Risk Level
          </label>
          <select
            value={formData.riskLevel}
            onChange={(e) => updateFormData("riskLevel", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
          >
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Development Restrictions & Guidelines *
        </label>
        <textarea
          value={formData.restrictions}
          onChange={(e) => updateFormData("restrictions", e.target.value)}
          rows={6}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 ${
            errors.restrictions ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter detailed development restrictions, building codes, height limits, setback requirements, environmental guidelines, etc."
        />
        {errors.restrictions && (
          <p className="mt-1 text-sm text-red-600">{errors.restrictions}</p>
        )}
        <p className="mt-2 text-sm text-gray-600">
          Include all relevant building codes, zoning restrictions,
          environmental guidelines, and any special requirements for this
          development.
        </p>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => updateFormData("startDate", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected Completion
          </label>
          <input
            type="date"
            value={formData.expectedCompletion}
            onChange={(e) =>
              updateFormData("expectedCompletion", e.target.value)
            }
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 ${
              errors.expectedCompletion ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.expectedCompletion && (
            <p className="mt-1 text-sm text-red-600">
              {errors.expectedCompletion}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Budget Used (KSh)
        </label>
        <input
          type="number"
          value={formData.budgetUsed}
          onChange={(e) =>
            updateFormData("budgetUsed", parseFloat(e.target.value) || 0)
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
          placeholder="0"
          min="0"
        />
        <p className="mt-1 text-sm text-gray-600">
          Current amount spent on this project development.
        </p>
      </div>

      <div className="bg-sage-50 rounded-lg p-6 border border-sage-200">
        <h4 className="font-medium text-sage-900 mb-2">Project Summary</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-sage-600">Name:</span>
            <span className="ml-2 font-medium">{formData.name}</span>
          </div>
          <div>
            <span className="text-sage-600">Type:</span>
            <span className="ml-2 font-medium capitalize">
              {formData.developmentType}
            </span>
          </div>
          <div>
            <span className="text-sage-600">Location:</span>
            <span className="ml-2 font-medium">{formData.location.county}</span>
          </div>
          <div>
            <span className="text-sage-600">Phase:</span>
            <span className="ml-2 font-medium">
              {formData.developmentPhase}
            </span>
          </div>
          <div>
            <span className="text-sage-600">Total Plots:</span>
            <span className="ml-2 font-medium">{formData.totalPlots}</span>
          </div>
          <div>
            <span className="text-sage-600">Total Area:</span>
            <span className="ml-2 font-medium">{formData.totalArea} acres</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="p-8">
          {renderStepIndicator()}

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            {errors.submit && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.submit}</p>
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="flex gap-3">
                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 bg-sage-600 text-white rounded-lg hover:bg-sage-700 focus:ring-2 focus:ring-sage-500"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-sage-600 text-white rounded-lg hover:bg-sage-700 focus:ring-2 focus:ring-sage-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading
                      ? "Creating Project..."
                      : project
                      ? "Update Project"
                      : "Create Project"}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
