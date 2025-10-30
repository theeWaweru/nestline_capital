// components/plot-form/PlotBasicDetailsStep.jsx
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AlertCircle } from "lucide-react";

export default function PlotBasicDetailsStep({ formData, updateFormData }) {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        if (formData.project && projects.length > 0) {
            const project = projects.find((p) => p._id === formData.project);
            setSelectedProject(project);

            // Auto-fill plot size from project if not already set
            if (project && !formData.size) {
                updateFormData({ size: project.standardPlotSize });
            }
        }
    }, [formData.project, projects]);

    const fetchProjects = async () => {
        try {
            const response = await fetch("/api/admin/projects?status=ready");
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleProjectChange = (projectId) => {
        const project = projects.find((p) => p._id === projectId);
        updateFormData({
            project: projectId,
            size: project?.standardPlotSize || "",
        });
        setSelectedProject(project);
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Basic Plot Details
                </h3>
                <p className="text-sm text-gray-600">
                    Enter the fundamental information about this plot
                </p>
            </div>

            <div className="space-y-4">
                {/* Project Selection */}
                <div className="space-y-2">
                    <Label htmlFor="project">
                        Select Project <span className="text-red-500">*</span>
                    </Label>
                    {loading ? (
                        <div className="flex items-center justify-center py-4">
                            <div className="animate-spin w-6 h-6 border-4 border-[#5c8a75] border-t-transparent rounded-full"></div>
                        </div>
                    ) : (
                        <>
                            <Select
                                value={formData.project || ""}
                                onValueChange={handleProjectChange}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose a project" />
                                </SelectTrigger>
                                <SelectContent>
                                    {projects.length === 0 ? (
                                        <SelectItem value="none" disabled>
                                            No projects available
                                        </SelectItem>
                                    ) : (
                                        projects.map((project) => (
                                            <SelectItem key={project._id} value={project._id}>
                                                {project.name} ({project.slotsRemaining} slots available)
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                            {selectedProject && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                                    <p className="text-blue-900">
                                        <strong>{selectedProject.name}</strong> •{" "}
                                        {typeof selectedProject.location === 'string'
                                            ? selectedProject.location
                                            : selectedProject.location?.address || selectedProject.location?.county || 'Location not set'}
                                    </p>
                                    <p className="text-blue-700 text-xs mt-1">
                                        {selectedProject.plotCount}/{selectedProject.totalPlots} plots
                                        added • {selectedProject.slotsRemaining} slots remaining
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Plot Number */}
                <div className="space-y-2">
                    <Label htmlFor="plotNumber">
                        Plot Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="plotNumber"
                        placeholder="e.g., 2696"
                        value={formData.plotNumber || ""}
                        onChange={(e) => updateFormData({ plotNumber: e.target.value })}
                        maxLength={6}
                        required
                    />
                    <p className="text-xs text-gray-500">
                        Unique 4-6 digit identifier for this plot (as shown on site plan)
                    </p>
                </div>

                {/* Plot Size */}
                <div className="space-y-2">
                    <Label htmlFor="size">
                        Plot Size <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="size"
                        placeholder="e.g., 50x100M - Eighth Acre"
                        value={formData.size || ""}
                        onChange={(e) => updateFormData({ size: e.target.value })}
                        required
                    />
                    <p className="text-xs text-gray-500">
                        Physical dimensions and area measurement
                    </p>
                </div>

                {/* Price */}
                <div className="space-y-2">
                    <Label htmlFor="price">
                        Full Price (KES) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="price"
                        type="number"
                        min="0"
                        placeholder="e.g., 1200000"
                        value={formData.price || ""}
                        onChange={(e) =>
                            updateFormData({
                                price: e.target.value ? parseInt(e.target.value) : "",
                            })
                        }
                        required
                    />
                    <p className="text-xs text-gray-500">
                        Total purchase price for this plot
                    </p>
                    {formData.price && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p className="text-sm text-green-900">
                                <strong>30% Deposit:</strong> KES{" "}
                                {(formData.price * 0.3).toLocaleString()}
                            </p>
                            <p className="text-xs text-green-700 mt-1">
                                Minimum required to book this plot
                            </p>
                        </div>
                    )}
                </div>

                {/* Warning */}
                {!selectedProject && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-yellow-900">
                            <strong>Note:</strong> Please select a project first. Only projects
                            with status "Ready" are shown.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}