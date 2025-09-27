// =============================================================================
// 6. app/admin/dashboard/page.js - Enhanced dashboard with real data
// =============================================================================
"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import StatsCard from "@/components/admin/StatsCard";
import GoogleMap from "@/components/maps/google-map";


export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, plotsRes] = await Promise.all([
          fetch("/api/analytics/dashboard"),
          fetch("/api/plots"),
        ]);

        const statsData = await statsRes.json();
        const plotsData = await plotsRes.json();

        setStats(statsData);
        setPlots(plotsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div
        className={`admin-main ${
          !sidebarOpen ? "sidebar-hidden md:sidebar-visible" : ""
        }`}
      >
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6">
          {/* Page header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Portfolio Overview
            </h2>
            <p className="text-gray-600">
              Real-time analytics and project insights
            </p>
          </div>

          {/* Stats cards */}
          <div className="stats-grid">
            <StatsCard
              title="Total Portfolio Value"
              value={`KSh ${(
                (stats?.totalPortfolioValue || 0) / 1000000
              ).toFixed(1)}M`}
              description={`${stats?.totalPlots || 0} plots across ${
                stats?.totalProjects || 0
              } projects`}
              icon="💰"
              trend="positive"
              trendValue="12.5%"
              color="sage"
            />

            <StatsCard
              title="Available Plots"
              value={stats?.availablePlots || 0}
              description={`${stats?.plotsOnHold || 0} on hold, ${
                stats?.soldPlots || 0
              } sold`}
              icon="📍"
              trend="negative"
              trendValue="5.2%"
              color="success"
            />

            <StatsCard
              title="Monthly Revenue"
              value={`KSh ${((stats?.monthlyRevenue || 0) / 1000000).toFixed(
                1
              )}M`}
              description="Revenue this month"
              icon="📊"
              trend="positive"
              trendValue="8.7%"
              color="warning"
            />

            <StatsCard
              title="Conversion Rate"
              value={`${stats?.conversionRate || 0}%`}
              description={`${stats?.averageDaysToSale || 0} avg days to sale`}
              icon="🎯"
              trend="positive"
              trendValue="3.1%"
              color="error"
            />
          </div>

          {/* Map and recent activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Project locations map */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Project Locations
                </h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-sage-500 text-white rounded">
                    Satellite
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded">
                    Roadmap
                  </button>
                </div>
              </div>

              <div className="map-container">
                <GoogleMap
                  plots={plots}
                  center={{ lat: -3.2207, lng: 40.1173 }}
                  zoom={10}
                  onPlotClick={(plot) => console.log("Clicked plot:", plot)}
                  className="w-full h-full"
                />

                {/* Map legend */}
                <div className="map-legend">
                  <h4 className="font-semibold text-sm text-gray-900 mb-2">
                    Plot Status
                  </h4>
                  <div className="legend-item">
                    <div className="legend-color bg-green-500"></div>
                    <span>Available</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color bg-yellow-500"></div>
                    <span>On Hold</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color bg-blue-500"></div>
                    <span>Confirmed</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color bg-red-500"></div>
                    <span>Sold</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project health */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Project Health
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Performance and milestone tracking
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">
                      PalmCrest Phase 1
                    </h4>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      ON TRACK
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Completion</span>
                        <span className="font-medium">75%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Budget Used</span>
                        <span className="font-medium">68%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-sage-500 h-2 rounded-full"
                          style={{ width: "68%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Plots Sold</span>
                        <span className="font-medium">12/16</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">Next Milestone:</span>
                      <span className="ml-2">
                        Infrastructure completion - Jan 15, 2025
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent plots table */}
          <div className="plot-table">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Plot Activity
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Latest updates and transactions
              </p>
            </div>

            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Plot ID</th>
                    <th>Size</th>
                    <th>Price/Acre</th>
                    <th>Status</th>
                    <th>Location</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {plots.slice(0, 10).map((plot) => (
                    <tr key={plot._id}>
                      <td className="font-medium">{plot.plotId}</td>
                      <td>{plot.sizeInAcres} acres</td>
                      <td>KSh {(plot.pricePerAcre || 0).toLocaleString()}</td>
                      <td>
                        <span className={`plot-status ${plot.status}`}>
                          {plot.status}
                        </span>
                      </td>
                      <td className="text-gray-600">{plot.location}</td>
                      <td className="text-gray-500">
                        {new Date(plot.updatedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
