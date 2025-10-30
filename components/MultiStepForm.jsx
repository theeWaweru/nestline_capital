// components/MultiStepForm.jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * MultiStepForm Component
 * Handles multi-step form logic with progress indicator
 * 
 * @param {Object} props
 * @param {Array} props.steps - Array of step objects: [{ title, description, component }]
 * @param {Function} props.onSubmit - Called when form is submitted
 * @param {Function} props.onCancel - Called when cancel is clicked
 * @param {boolean} props.isSubmitting - Loading state for submit button
 * @param {Object} props.formData - Current form data
 * @param {Function} props.updateFormData - Function to update form data
 */
export default function MultiStepForm({
    steps,
    onSubmit,
    onCancel,
    isSubmitting = false,
    formData,
    updateFormData,
}) {
    const [currentStep, setCurrentStep] = useState(0);

    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === steps.length - 1;

    const goToNextStep = () => {
        if (!isLastStep) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const goToPreviousStep = () => {
        if (!isFirstStep) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLastStep) {
            onSubmit();
        } else {
            goToNextStep();
        }
    };

    const CurrentStepComponent = steps[currentStep].component;

    return (
        <div className="space-y-6">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <div key={index} className="flex items-center flex-1">
                        <div className="flex flex-col items-center flex-1">
                            {/* Step Circle */}
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors",
                                    index < currentStep
                                        ? "bg-[#5c8a75] text-white"
                                        : index === currentStep
                                            ? "bg-[#5c8a75] text-white ring-4 ring-[#5c8a75]/20"
                                            : "bg-gray-200 text-gray-500"
                                )}
                            >
                                {index < currentStep ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    index + 1
                                )}
                            </div>

                            {/* Step Label */}
                            <div className="mt-2 text-center">
                                <p
                                    className={cn(
                                        "text-sm font-medium",
                                        index <= currentStep ? "text-gray-900" : "text-gray-500"
                                    )}
                                >
                                    {step.title}
                                </p>
                                {index === currentStep && (
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {step.description}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Connector Line */}
                        {index < steps.length - 1 && (
                            <div
                                className={cn(
                                    "h-0.5 flex-1 mx-2 mt-[-2rem] transition-colors",
                                    index < currentStep ? "bg-[#5c8a75]" : "bg-gray-200"
                                )}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Form Content */}
            <Card>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit}>
                        <CurrentStepComponent
                            formData={formData}
                            updateFormData={updateFormData}
                        />

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t">
                            <div>
                                {!isFirstStep && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={goToPreviousStep}
                                    >
                                        <ChevronLeft className="w-4 h-4 mr-2" />
                                        Previous
                                    </Button>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={onCancel}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-[#5c8a75] hover:bg-[#4a6f5f]"
                                >
                                    {isSubmitting ? (
                                        "Saving..."
                                    ) : isLastStep ? (
                                        "Create Project"
                                    ) : (
                                        <>
                                            Next
                                            <ChevronRight className="w-4 h-4 ml-2" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Progress Text */}
            <div className="text-center text-sm text-gray-500">
                Step {currentStep + 1} of {steps.length}
            </div>
        </div>
    );
}