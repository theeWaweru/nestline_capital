// =============================================================================
// 3. components/admin/PlotFilters.js - Advanced filtering interface
// =============================================================================
"use client";

import { useState } from "react";

export default function PlotFilters({
  projects,
  filters,
  onFilterChange,
  plotCount,
  totalCount,
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterReset = () => {
    onFilterChange({
      project: "",
      status: "",
      priceRange: [0, 10000000],
      sizeRange: [0, 5],
      search: "",
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Search */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search plots by ID or location..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
          />
        </div>

        {/* Project filter */}
        <select
          value={filters.project}
          onChange={(e) => onFilterChange({ project: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
        >
          <option value="">All Projects</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>

        {/* Status filter */}
        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ status: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
        >
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="requested">On Hold</option>
          <option value="confirmed">Confirmed</option>
          <option value="sold">Sold</option>
        </select>

        {/* Advanced filters toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="px-4 py-2 text-sage-600 border border-sage-300 rounded-lg hover:bg-sage-50"
        >
          🔍 Filters
        </button>

        {/* Reset */}
        <button
          onClick={handleFilterReset}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          🔄 Reset
        </button>
      </div>

      {/* Advanced filters */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range (KSh)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange[0]}
                  onChange={(e) =>
                    onFilterChange({
                      priceRange: [
                        Number(e.target.value),
                        filters.priceRange[1],
                      ],
                    })
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    onFilterChange({
                      priceRange: [
                        filters.priceRange[0],
                        Number(e.target.value),
                      ],
                    })
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {/* Size range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size Range (Acres)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.1"
                  placeholder="Min"
                  value={filters.sizeRange[0]}
                  onChange={(e) =>
                    onFilterChange({
                      sizeRange: [Number(e.target.value), filters.sizeRange[1]],
                    })
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  step="0.1"
                  placeholder="Max"
                  value={filters.sizeRange[1]}
                  onChange={(e) =>
                    onFilterChange({
                      sizeRange: [filters.sizeRange[0], Number(e.target.value)],
                    })
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results summary */}
      <div className="mt-4 text-sm text-gray-600">
        Showing <span className="font-medium text-gray-900">{plotCount}</span>{" "}
        of <span className="font-medium text-gray-900">{totalCount}</span> plots
      </div>
    </div>
  );
}
