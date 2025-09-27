// =============================================================================
// 1. app/admin/plots/page.js - Main plot inventory page
// =============================================================================
"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import PlotTable from "@/components/admin/PlotTable";
import PlotFilters from "@/components/admin/PlotFilters";
import PlotStats from "@/components/admin/PlotStats";
import GoogleMap from "@/components/maps/google-map";

export default function PlotInventoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [plots, setPlots] = useState([]);
  const [filteredPlots, setFilteredPlots] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("table"); // 'table' or 'map'
  const [selectedPlots, setSelectedPlots] = useState([]);

  // Filter states
  const [filters, setFilters] = useState({
    project: "",
    status: "",
    priceRange: [0, 10000000],
    sizeRange: [0, 5],
    search: "",
  });

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plotsRes, projectsRes] = await Promise.all([
          fetch("/api/plots"),
          fetch("/api/projects"),
        ]);

        const plotsData = await plotsRes.json();
        const projectsData = await projectsRes.json();

        setPlots(plotsData);
        setFilteredPlots(plotsData);
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = plots;

    // Project filter
    if (filters.project) {
      filtered = filtered.filter((plot) => plot.projectId === filters.project);
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter((plot) => plot.status === filters.status);
    }

    // Price range filter
    filtered = filtered.filter(
      (plot) =>
        plot.price >= filters.priceRange[0] &&
        plot.price <= filters.priceRange[1]
    );

    // Size range filter
    filtered = filtered.filter(
      (plot) =>
        plot.sizeInAcres >= filters.sizeRange[0] &&
        plot.sizeInAcres <= filters.sizeRange[1]
    );

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (plot) =>
          plot.plotId.toLowerCase().includes(searchLower) ||
          plot.location.toLowerCase().includes(searchLower) ||
          plot.block.toLowerCase().includes(searchLower)
      );
    }

    setFilteredPlots(filtered);
  }, [plots, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handlePlotSelect = (plotId, selected) => {
    if (selected) {
      setSelectedPlots([...selectedPlots, plotId]);
    } else {
      setSelectedPlots(selectedPlots.filter((id) => id !== plotId));
    }
  };

  const handleSelectAll = (selected) => {
    if (selected) {
      setSelectedPlots(filteredPlots.map((plot) => plot._id));
    } else {
      setSelectedPlots([]);
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedPlots.length === 0) return;

    try {
      const response = await fetch("/api/plots/bulk", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plotIds: selectedPlots,
          action,
        }),
      });

      if (response.ok) {
        // Refresh data
        const plotsRes = await fetch("/api/plots");
        const plotsData = await plotsRes.json();
        setPlots(plotsData);
        setSelectedPlots([]);
      }
    } catch (error) {
      console.error("Error performing bulk action:", error);
    }
  };

  const handleExport = async (format) => {
    try {
      const params = new URLSearchParams({
        format,
        ...filters,
      });

      const response = await fetch(`/api/export/plots?${params}`);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `plots-export.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner"></div>
          <p className="mt-4 text-gray-600">Loading plot inventory...</p>
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Plot Inventory Management
              </h2>
              <p className="text-gray-600">
                Monitor plot availability, track status changes, and manage
                inventory across all development phases
              </p>
            </div>

            <div className="flex gap-3 mt-4 md:mt-0">
              <button
                onClick={() => handleExport("csv")}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
              >
                📊 Export
              </button>
              <button className="px-4 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 flex items-center gap-2">
                ➕ Add Plot
              </button>
            </div>
          </div>

          {/* Stats overview */}
          <PlotStats plots={filteredPlots} />

          {/* Filters */}
          <PlotFilters
            projects={projects}
            filters={filters}
            onFilterChange={handleFilterChange}
            plotCount={filteredPlots.length}
            totalCount={plots.length}
          />

          {/* View toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setView("table")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    view === "table"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  📋 Plot Inventory
                </button>
                <button
                  onClick={() => setView("map")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    view === "map"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  🗺️ Plot Locations
                </button>
              </div>

              {selectedPlots.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {selectedPlots.length} selected
                  </span>
                  <select
                    onChange={(e) => handleBulkAction(e.target.value)}
                    className="text-sm border border-gray-300 rounded px-3 py-1"
                    defaultValue=""
                  >
                    <option value="">Bulk Actions</option>
                    <option value="mark-available">Mark as Available</option>
                    <option value="mark-hold">Put on Hold</option>
                    <option value="export-selected">Export Selected</option>
                  </select>
                </div>
              )}
            </div>

            <div className="text-sm text-gray-500">
              Showing {filteredPlots.length} of {plots.length} plots
            </div>
          </div>

          {/* Content */}
          {view === "table" ? (
            <PlotTable
              plots={filteredPlots}
              projects={projects}
              selectedPlots={selectedPlots}
              onPlotSelect={handlePlotSelect}
              onSelectAll={handleSelectAll}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="map-container h-96">
                <GoogleMap
                  plots={filteredPlots}
                  center={{ lat: -3.2207, lng: 40.1173 }}
                  zoom={10}
                  onPlotClick={(plot) => console.log("Clicked plot:", plot)}
                  className="w-full h-full"
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
