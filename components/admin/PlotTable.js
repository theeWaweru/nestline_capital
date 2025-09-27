// =============================================================================
// 4. components/admin/PlotTable.js - Enhanced plot data table
// =============================================================================
"use client";

import { useState } from "react";

export default function PlotTable({
  plots,
  projects,
  selectedPlots,
  onPlotSelect,
  onSelectAll,
}) {
  const [sortField, setSortField] = useState("plotId");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedPlots = [...plots].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === "project") {
      const aProject = projects.find((p) => p._id === a.projectId);
      const bProject = projects.find((p) => p._id === b.projectId);
      aValue = aProject?.name || "";
      bValue = bProject?.name || "";
    }

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusColor = (status) => {
    const colors = {
      available: "bg-green-100 text-green-800",
      requested: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      sold: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <span className="text-gray-400">↕️</span>;
    return sortDirection === "asc" ? (
      <span className="text-sage-600">↑</span>
    ) : (
      <span className="text-sage-600">↓</span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={
                    selectedPlots.length === plots.length && plots.length > 0
                  }
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded border-gray-300 text-sage-600 focus:ring-sage-500"
                />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("plotId")}
              >
                Plot ID <SortIcon field="plotId" />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("sizeInAcres")}
              >
                Size (Acres) <SortIcon field="sizeInAcres" />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("pricePerAcre")}
              >
                Price/Acre <SortIcon field="pricePerAcre" />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("status")}
              >
                Status <SortIcon field="status" />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("location")}
              >
                Location <SortIcon field="location" />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("updatedAt")}
              >
                Last Updated <SortIcon field="updatedAt" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedPlots.map((plot) => (
              <tr key={plot._id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedPlots.includes(plot._id)}
                    onChange={(e) => onPlotSelect(plot._id, e.target.checked)}
                    className="rounded border-gray-300 text-sage-600 focus:ring-sage-500"
                  />
                </td>
                <td className="px-4 py-4 text-sm font-medium text-gray-900">
                  {plot.plotId}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  {plot.sizeInAcres}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  KSh {(plot.pricePerAcre || 0).toLocaleString()}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      plot.status
                    )}`}
                  >
                    {plot.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {plot.location}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500">
                  {new Date(plot.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 text-sm">
                  <div className="flex gap-2">
                    <button className="text-sage-600 hover:text-sage-900">
                      ✏️
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      👁️
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      📍
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">{Math.min(plots.length, 20)}</span> of{" "}
            <span className="font-medium">{plots.length}</span> results
          </div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Previous
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              1
            </button>
            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
