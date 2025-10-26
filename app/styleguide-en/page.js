export default function StyleGuideEnhanced() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Kiota Design System - Enhanced Dashboard Components
          </h1>
          <p className="text-sm text-gray-600">
            Nestline Capital Property Management Platform
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        {/* Plot Status Badges */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Plot Status Badges
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                Available
              </span>
              <p className="text-xs text-gray-600 mt-2">Ready for purchase</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                Reserved
              </span>
              <p className="text-xs text-gray-600 mt-2">User has reserved</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                On Hold
              </span>
              <p className="text-xs text-gray-600 mt-2">Under negotiation</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-800">
                Sold
              </span>
              <p className="text-xs text-gray-600 mt-2">Fully paid</p>
            </div>
          </div>
        </section>

        {/* Phase Status */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Phase Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="font-medium">In Development</span>
              </div>
              <p className="text-sm text-gray-600">
                Phase is being planned. Users can view project location but not
                individual plots.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="font-medium">Ready for Viewing</span>
              </div>
              <p className="text-sm text-gray-600">
                Phase is complete. Users can view, book, and purchase plots.
              </p>
            </div>
          </div>
        </section>

        {/* Map Markers */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Map Markers
          </h2>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-4">
              Color-coded markers for plot status on Google Maps
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-white shadow-md"></div>
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white shadow-md"></div>
                <span className="text-sm">Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-500 border-2 border-white shadow-md"></div>
                <span className="text-sm">On Hold</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-rose-500 border-2 border-white shadow-md"></div>
                <span className="text-sm">Sold</span>
              </div>
            </div>
          </div>
        </section>

        {/* Metric Cards */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Metric Cards (Dashboard Stats)
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Large stat cards with icons, values, percentage changes, and
            comparison text
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Primary Metric - Sage Green */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-[#5c8a75]/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <span className="text-emerald-600 text-sm font-medium flex items-center gap-1">
                  ↗ 12.5%
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-1">
                Total Portfolio Value
              </p>
              <h3 className="text-3xl font-bold text-gray-900">KES 214.5M</h3>
              <p className="text-xs text-gray-500 mt-2">vs last quarter</p>
            </div>

            {/* Success Metric */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📍</span>
                </div>
                <span className="text-rose-600 text-sm font-medium flex items-center gap-1">
                  ↘ 5.2%
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-1">Available Plots</p>
              <h3 className="text-3xl font-bold text-gray-900">300</h3>
              <p className="text-xs text-gray-500 mt-2">vs last quarter</p>
            </div>

            {/* Warning Metric */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <span className="text-emerald-600 text-sm font-medium flex items-center gap-1">
                  ↗ 8.7%
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-1">Monthly Revenue</p>
              <h3 className="text-3xl font-bold text-gray-900">KES 18.7M</h3>
              <p className="text-xs text-gray-500 mt-2">vs last quarter</p>
            </div>

            {/* Info Metric */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <span className="text-emerald-600 text-sm font-medium flex items-center gap-1">
                  ↗ 3.1%
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-1">Conversion Rate</p>
              <h3 className="text-3xl font-bold text-gray-900">68.5%</h3>
              <p className="text-xs text-gray-500 mt-2">vs last quarter</p>
            </div>
          </div>

          {/* Code Example */}
          <div className="mt-6 bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-100">
              {`<div className="bg-white p-6 rounded-lg border shadow-sm">
  <div className="flex items-start justify-between mb-4">
    <div className="w-12 h-12 bg-[#5c8a75]/10 rounded-lg 
                    flex items-center justify-center">
      <span className="text-2xl">💰</span>
    </div>
    <span className="text-emerald-600 text-sm font-medium">
      ↗ 12.5%
    </span>
  </div>
  <p className="text-gray-600 text-sm">Total Portfolio Value</p>
  <p className="text-3xl font-bold text-gray-900">KES 214.5M</p>
  <p className="text-xs text-gray-500 mt-2">vs last quarter</p>
</div>`}
            </pre>
          </div>
        </section>

        {/* Progress Bars */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Progress Bars
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Inline progress indicators for project completion, budget tracking,
            and plot sales
          </p>
          <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
            {/* Project Completion */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Completion
                </span>
                <span className="text-sm font-semibold text-gray-900">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>

            {/* Budget Used - Sage Green */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Budget Used
                </span>
                <span className="text-sm font-semibold text-gray-900">68%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#5c8a75] h-2 rounded-full transition-all duration-300"
                  style={{ width: "68%" }}
                ></div>
              </div>
            </div>

            {/* Plots Sold */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Plots Sold
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  90/120
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>

            {/* Risk Level */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Risk Level
                </span>
                <span className="text-sm font-semibold text-amber-600">
                  Medium
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>

            {/* Inline Table Progress */}
            <div className="border-t pt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Inline Table Progress
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-24">120 / 60</span>
                <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-emerald-600 h-1.5 rounded-full"
                    style={{ width: "66%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Example */}
          <div className="mt-6 bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-100">
              {`<div className="flex justify-between items-center mb-2">
  <span className="text-sm font-medium text-gray-700">
    Budget Used
  </span>
  <span className="text-sm font-semibold text-gray-900">
    68%
  </span>
</div>
<div className="w-full bg-gray-200 rounded-full h-2">
  <div 
    className="bg-[#5c8a75] h-2 rounded-full 
                transition-all duration-300" 
    style={{ width: "68%" }}
  />
</div>`}
            </pre>
          </div>
        </section>

        {/* Advanced Data Tables */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Advanced Data Tables
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Sortable columns, checkboxes, inline actions, status badges, and
            pagination
          </p>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Detailed Plot Data
                </h3>
                <p className="text-sm text-gray-600">
                  Sortable columns with inline actions
                </p>
              </div>
              <button className="px-4 py-2 bg-[#5c8a75] text-white rounded-lg hover:bg-[#4a6f5f] flex items-center gap-2 text-sm font-medium">
                <span>📊</span> Export All
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#5c8a75] focus:ring-[#5c8a75]"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:text-gray-900">
                      Plot ID ↕
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:text-gray-900">
                      Size (Acres) ↕
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:text-gray-900">
                      Price/Acre ↕
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#5c8a75] focus:ring-[#5c8a75]"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      Plot GF001
                    </td>
                    <td className="px-6 py-4 text-gray-700">0.5</td>
                    <td className="px-6 py-4 text-gray-700">KES 2,500,000</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Available
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">Block A, Row 1</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      26/12/2024
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <svg
                            className="w-4 h-4 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View"
                        >
                          <svg
                            className="w-4 h-4 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="More"
                        >
                          <svg
                            className="w-4 h-4 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#5c8a75] focus:ring-[#5c8a75]"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      Plot GF002
                    </td>
                    <td className="px-6 py-4 text-gray-700">0.75</td>
                    <td className="px-6 py-4 text-gray-700">KES 2,800,000</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Hold
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">Block A, Row 2</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      25/12/2024
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <svg
                            className="w-4 h-4 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View"
                        >
                          <svg
                            className="w-4 h-4 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="More"
                        >
                          <svg
                            className="w-4 h-4 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#5c8a75] focus:ring-[#5c8a75]"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      Plot GF003
                    </td>
                    <td className="px-6 py-4 text-gray-700">1</td>
                    <td className="px-6 py-4 text-gray-700">KES 3,200,000</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Reserved
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">Block B, Row 1</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      24/12/2024
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <svg
                            className="w-4 h-4 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View"
                        >
                          <svg
                            className="w-4 h-4 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="More"
                        >
                          <svg
                            className="w-4 h-4 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table Footer with Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-sm text-gray-600">Showing 1-5 of 6 plots</p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  ← Previous
                </button>
                <button className="px-3 py-1.5 bg-[#5c8a75] text-white rounded-lg text-sm font-medium">
                  1
                </button>
                <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  2
                </button>
                <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  Next →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs & Toggles */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Tabs & Toggle Controls
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            For switching between map views, data views, and filter modes
          </p>
          <div className="space-y-6">
            {/* Map View Tabs */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Map View Controls (Satellite/Roadmap/Terrain)
              </h3>
              <div className="inline-flex bg-gray-100 rounded-lg p-1 gap-1">
                <button className="px-4 py-2 bg-[#5c8a75] text-white rounded-md text-sm font-medium transition-all shadow-sm">
                  Satellite
                </button>
                <button className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md text-sm font-medium transition-all">
                  Roadmap
                </button>
                <button className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md text-sm font-medium transition-all">
                  Terrain
                </button>
              </div>
            </div>

            {/* View Toggle */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                View Toggle (Table vs Map)
              </h3>
              <div className="inline-flex bg-gray-100 rounded-lg p-1 gap-1">
                <button className="px-4 py-2 bg-white text-gray-900 shadow-sm rounded-md text-sm font-medium flex items-center gap-2 transition-all">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Plot Inventory
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900 rounded-md text-sm font-medium flex items-center gap-2 transition-all">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  Plot Locations
                </button>
              </div>
            </div>
          </div>

          {/* Code Example */}
          <div className="mt-6 bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-100">
              {`<div className="inline-flex bg-gray-100 rounded-lg p-1 gap-1">
  <button className="px-4 py-2 bg-[#5c8a75] text-white 
                     rounded-md text-sm font-medium">
    Satellite
  </button>
  <button className="px-4 py-2 text-gray-700 
                     hover:bg-gray-200 rounded-md text-sm">
    Roadmap
  </button>
  <button className="px-4 py-2 text-gray-700 
                     hover:bg-gray-200 rounded-md text-sm">
    Terrain
  </button>
</div>`}
            </pre>
          </div>
        </section>

        {/* Dropdowns & Filters */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Dropdowns & Filter Controls
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Project selectors, status filters, phase dropdowns, and search
            inputs
          </p>
          <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
            {/* Filter Bar */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Filter Bar with Reset
              </h3>
              <div className="flex flex-wrap gap-3">
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#5c8a75] focus:border-transparent">
                  <option>Select project...</option>
                  <option>All Projects</option>
                  <option>PalmCrest Residence</option>
                  <option>Greenfield Estates</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#5c8a75] focus:border-transparent">
                  <option>Select phase...</option>
                  <option>Phase 1</option>
                  <option>Phase 2</option>
                  <option>Phase 3</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#5c8a75] focus:border-transparent">
                  <option>All Status</option>
                  <option>Available</option>
                  <option>On Hold</option>
                  <option>Sold</option>
                </select>
                <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm flex items-center gap-2 font-medium transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Reset
                </button>
                <button className="px-4 py-2 bg-[#5c8a75] text-white rounded-lg hover:bg-[#4a6f5f] text-sm flex items-center gap-2 font-medium transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Apply Filters
                </button>
              </div>
            </div>

            {/* Search Input with Icon */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Search Input
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search plots by ID or location..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5c8a75] focus:border-transparent text-sm"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Icon Buttons & Actions */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Icon Buttons & Action Menus
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Edit, view, delete, and more actions with three-dot menus
          </p>
          <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
            {/* Icon Button Variants */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Icon Buttons (Inline Actions)
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-blue-200 hover:border-blue-600 transition-colors"
                  title="Edit"
                >
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-emerald-100 hover:border-emerald-600 transition-colors"
                  title="View"
                >
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
                <button
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-rose-50 hover:border-rose-300 transition-colors"
                  title="Delete"
                >
                  <svg
                    className="w-4 h-4 text-gray-600 hover:text-rose-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
                <button
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-200 hover:border-black transition-colors"
                  title="More"
                >
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
                <div className="border-l border-gray-300 mx-2"></div>
                <button
                  className="w-10 h-10 flex items-center justify-center bg-[#5c8a75] text-white rounded-lg hover:bg-[#4a6f5f]  transition-colors"
                  title="Add"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Action Dropdown Menu */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Dropdown Action Menu (Three Dots)
              </h3>
              <div className="inline-block">
                {/* Menu shown in open state */}
                <div className="w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit Plot
                  </button>
                  <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View Details
                  </button>
                  <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                      />
                    </svg>
                    Duplicate
                  </button>
                  <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Export Data
                  </button>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button className="w-full px-4 py-2.5 text-left text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-3 transition-colors">
                    <svg
                      className="w-4 h-4 text-rose-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete Plot
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pagination */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Pagination Controls
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Navigation for tables and lists with item counts
          </p>
          <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
            {/* Standard Pagination */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Standard Pagination
              </h3>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-600">Showing 1-5 of 6 plots</p>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium">
                    ← Previous
                  </button>
                  <button className="px-3.5 py-1.5 bg-[#5c8a75] text-white rounded-lg text-sm font-medium">
                    1
                  </button>
                  <button className="px-3.5 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors font-medium">
                    2
                  </button>
                  <button className="px-3.5 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors font-medium">
                    3
                  </button>
                  <span className="px-2 text-gray-400">...</span>
                  <button className="px-3.5 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors font-medium">
                    10
                  </button>
                  <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors font-medium">
                    Next →
                  </button>
                </div>
              </div>
            </div>

            {/* Compact Pagination */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Compact Pagination
              </h3>
              <div className="flex items-center justify-center gap-2">
                <button
                  disabled
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  ←
                </button>
                <span className="px-4 py-1.5 text-sm font-medium text-gray-700">
                  Page 1 of 10
                </span>
                <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors font-medium">
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Code Example */}
          <div className="mt-6 bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-100">
              {`<div className="flex items-center gap-2">
  <button className="px-3 py-1.5 border border-gray-300 
                     rounded-lg text-sm hover:bg-gray-50">
    ← Previous
  </button>
  <button className="px-3.5 py-1.5 bg-[#5c8a75] 
                     text-white rounded-lg text-sm">
    1
  </button>
  <button className="px-3.5 py-1.5 border border-gray-300 
                     rounded-lg text-sm hover:bg-gray-50">
    2
  </button>
  <button className="px-3 py-1.5 border border-gray-300 
                     rounded-lg text-sm hover:bg-gray-50">
    Next →
  </button>
</div>`}
            </pre>
          </div>
        </section>

        {/* Implementation Notes */}
        <section className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
          <h3 className="text-lg font-semibold mb-3 text-amber-900">
            📋 Implementation Notes
          </h3>
          <ul className="space-y-2 text-sm text-amber-800">
            <li>
              <strong>Color Usage:</strong> All components use your Sage Green
              (#5c8a75) as primary action color
            </li>
            <li>
              <strong>Status Colors:</strong> Emerald=Available, Amber=Hold,
              Blue=Reserved, Rose=Sold
            </li>
            <li>
              <strong>Hover States:</strong> All interactive elements have hover
              transitions
            </li>
            <li>
              <strong>Responsive:</strong> Tables scroll horizontally on mobile,
              cards stack vertically
            </li>
            <li>
              <strong>Accessibility:</strong> Proper focus states, hover
              indicators, and semantic HTML
            </li>
            <li>
              <strong>Icons:</strong> Using Heroicons (from Tailwind) for
              consistency - you can replace with your icon library
            </li>
            <li>
              <strong>Shadows:</strong> Subtle shadows for elevation (shadow-sm,
              shadow-md, shadow-lg)
            </li>
            <li>
              <strong>Spacing:</strong> Consistent padding/margin using Tailwind
              spacing scale
            </li>
          </ul>
        </section>

        {/* Component Checklist */}
        <section className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
          <h3 className="text-lg font-semibold mb-3 text-emerald-900">
            ✅ Component Checklist (From Screenshots)
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-emerald-800">
            <div>
              <p className="font-semibold mb-2">Completed:</p>
              <ul className="space-y-1">
                <li>✓ Metric Cards with percentage changes</li>
                <li>✓ Progress Bars (multiple variants)</li>
                <li>✓ Advanced Data Tables</li>
                <li>✓ Sortable Column Headers</li>
                <li>✓ Inline Action Buttons</li>
                <li>✓ Status Badges</li>
                <li>✓ Pagination Controls</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Also Completed:</p>
              <ul className="space-y-1">
                <li>✓ Map View Tabs (Satellite/Roadmap/Terrain)</li>
                <li>✓ View Toggles (Table/Map)</li>
                <li>✓ Filter Dropdowns with Reset</li>
                <li>✓ Search Input with Icon</li>
                <li>✓ Icon Buttons (Edit/View/Delete/More)</li>
                <li>✓ Dropdown Action Menus</li>
                <li>✓ Checkboxes for bulk selection</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
