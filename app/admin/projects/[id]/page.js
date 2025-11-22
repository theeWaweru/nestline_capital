// app/admin/projects/[id]/page.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
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
  Calendar,
  Layout,
  DollarSign,
  Clock,
  Plus,
} from "lucide-react";

const statusColors = {
  planning: "bg-yellow-100 text-yellow-800",
  development: "bg-blue-100 text-blue-800",
  ready: "bg-green-100 text-green-800",
};

const statusLabels = {
  planning: "Planning",
  development: "In Development",
  ready: "Ready",
};

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProject = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/projects/${params.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }
      const data = await response.json();
      setProject(data);
    } catch (error) {
      console.error("Error fetching project:", error);
      alert("Failed to load project");
      router.push("/admin/projects");
    } finally {
      setLoading(false);
    }
  }, [params.id, router]);
  
  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const handleDelete = async () => {
    if (
      !confirm(
        `Are you sure you want to delete "${project.name}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/projects/${params.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete project");
      }

      router.push("/admin/projects");
    } catch (error) {
      console.error("Error deleting project:", error);
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

  if (!project) {
    return null;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/admin/projects")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <Badge className={statusColors[project.status]}>
                {statusLabels[project.status]}
              </Badge>
              <span className="text-gray-600 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {typeof project.location === "string"
                  ? project.location
                  : project.location?.address ||
                    project.location?.county ||
                    "Location not set"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href={`/admin/projects/${project._id}/edit`}>
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

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        {/* Plot Stats */}
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Plots</CardDescription>
            <CardTitle className="text-3xl">
              {project.plotCount}/{project.totalPlots}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              {project.slotsRemaining} slots remaining
            </p>
            <Button
              size="sm"
              className="w-full mt-3 bg-[#5c8a75] hover:bg-[#4a6f5f]"
              asChild
            >
              <Link href={`/admin/plots/new?project=${project._id}`}>
                <Plus className="w-4 h-4 mr-2" />
                Add Plot
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Land Size */}
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Land Size</CardDescription>
            <CardTitle className="text-2xl">{project.totalLandSize}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Plot size: {project.standardPlotSize}
            </p>
          </CardContent>
        </Card>

        {/* Payment Period */}
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Payment Period</CardDescription>
            <CardTitle className="text-2xl">
              {project.paymentCompletionPeriod} days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Time to complete payment</p>
          </CardContent>
        </Card>
      </div>

      {/* Project Details */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Project Name</p>
              <p className="font-medium">{project.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Location</p>
              <p className="font-medium">
                {typeof project.location === "string"
                  ? project.location
                  : project.location?.address ||
                    project.location?.county ||
                    "Location not set"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Description</p>
              <p className="text-sm text-gray-800">
                {project.description || "No description provided"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {project.planningStartDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Planning Started</p>
                  <p className="font-medium">
                    {new Date(project.planningStartDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
            {project.developmentStartDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Development Started</p>
                  <p className="font-medium">
                    {new Date(
                      project.developmentStartDate
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
            {project.completionDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="font-medium">
                    {new Date(project.completionDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
            {!project.planningStartDate &&
              !project.developmentStartDate &&
              !project.completionDate && (
                <p className="text-sm text-gray-500">No timeline set</p>
              )}
          </CardContent>
        </Card>

        {/* Investor Notes */}
        {project.investorNotes && (
          <Card>
            <CardHeader>
              <CardTitle>Investor Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {project.investorNotes}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* View Plots Button */}
      <div className="mt-6">
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/admin/plots?project=${project._id}`}>
            <Layout className="w-4 h-4 mr-2" />
            View All Plots in This Project
          </Link>
        </Button>
      </div>
    </div>
  );
}
