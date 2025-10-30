// components/project-form/PurchaseSettingsStep.jsx
"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

export default function PurchaseSettingsStep({ formData, updateFormData }) {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Purchase Settings
                </h3>
                <p className="text-sm text-gray-600">
                    Configure payment terms and investor information
                </p>
            </div>

            <div className="space-y-4">
                {/* Payment Completion Period */}
                <div className="space-y-2">
                    <Label htmlFor="paymentCompletionPeriod">
                        Payment Completion Period (Days){" "}
                        <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="paymentCompletionPeriod"
                        type="number"
                        min="1"
                        placeholder="90"
                        value={formData.paymentCompletionPeriod || 90}
                        onChange={(e) =>
                            updateFormData({
                                paymentCompletionPeriod: e.target.value
                                    ? parseInt(e.target.value)
                                    : 90,
                            })
                        }
                        required
                    />
                    <p className="text-xs text-gray-500">
                        Number of days investors have to complete full payment after booking
                    </p>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                        <strong>How it works:</strong> After an investor books a plot and
                        makes the initial 30% deposit, they have this many days to complete
                        the remaining payment. Reminders are automatically sent at 30, 7,
                        and 1 day before the deadline.
                    </div>
                </div>

                {/* Investor Notes */}
                <div className="space-y-2">
                    <Label htmlFor="investorNotes">Notes for Investors (Optional)</Label>
                    <Textarea
                        id="investorNotes"
                        placeholder="Add any important information, terms, or special conditions for investors..."
                        rows={6}
                        value={formData.investorNotes || ""}
                        onChange={(e) => updateFormData({ investorNotes: e.target.value })}
                    />
                    <p className="text-xs text-gray-500">
                        This information will be displayed to investors viewing this project
                    </p>
                </div>

                {/* Summary Card */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
                    <h4 className="font-semibold text-gray-900">Project Summary</h4>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Project Name:</span>
                            <span className="font-medium text-gray-900">
                                {formData.name || "—"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Location:</span>
                            <span className="font-medium text-gray-900">
                                {formData.location || "—"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Total Plots:</span>
                            <span className="font-medium text-gray-900">
                                {formData.totalPlots || "—"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Plot Size:</span>
                            <span className="font-medium text-gray-900">
                                {formData.standardPlotSize || "—"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className="font-medium text-gray-900 capitalize">
                                {formData.status || "—"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Payment Period:</span>
                            <span className="font-medium text-gray-900">
                                {formData.paymentCompletionPeriod || 90} days
                            </span>
                        </div>
                    </div>

                    <div className="pt-4 border-t">
                        <p className="text-xs text-gray-500">
                            Review the information above before creating the project. You can
                            edit these details later if needed.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}