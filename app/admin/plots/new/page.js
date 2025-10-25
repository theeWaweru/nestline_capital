// =============================================================================
// 2. app/admin/plots/new/page.js - Plot creation form
// =============================================================================
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
// import PlotForm from "@/components/forms/PlotForm";

export default function NewPlotPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedProject = searchParams.get("project");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handlePlotCreated = (plot) => {
    router.push(`/admin/plots/${plot._id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner"></div>
          <p className="mt-4 text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="admin-main">
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6">
          {/* Page header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => router.back()}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
              >
                ← Back
              </button>
              <h2 className="text-3xl font-bold text-gray-900">Add New Plot</h2>
            </div>
            <p className="text-gray-600">
              Register a new plot with detailed specifications, pricing, and
              location coordinates.
            </p>
          </div>

          <PlotForm
            projects={projects}
            defaultProject={preselectedProject}
            onSuccess={handlePlotCreated}
          />
        </main>
      </div>
    </div>
  );
}
