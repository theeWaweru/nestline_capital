// =============================================================================
// 1. app/admin/projects/new/page.js - Project creation form
// =============================================================================
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import ProjectForm from "@/components/forms/ProjectForm";

export default function NewProjectPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleProjectCreated = (project) => {
    router.push(`/admin/projects/${project._id}`);
  };

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
              <h2 className="text-3xl font-bold text-gray-900">
                Create New Project
              </h2>
            </div>
            <p className="text-gray-600">
              Set up a new real estate development project with comprehensive
              details and planning information.
            </p>
          </div>

          <ProjectForm onSuccess={handleProjectCreated} />
        </main>
      </div>
    </div>
  );
}
