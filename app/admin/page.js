// app/admin/page.js
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/dashboard/StatCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import PlotStatusChart from "@/components/dashboard/PlotStatusChart";
import {
  FolderOpen,
  MapPin,
  Users,
  AlertCircle,
  Plus,
  ArrowRight,
} from "lucide-react";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch stats and activity in parallel
      const [statsResponse, activityResponse] = await Promise.all([
        fetch("/api/admin/dashboard/stats"),
        fetch("/api/admin/dashboard/activity?limit=10"),
      ]);

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      if (activityResponse.ok) {
        const activityData = await activityResponse.json();
        setActivities(activityData);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back, {session?.user?.name}! Here&apos;s what&apos;s
          happening.
        </p>
      </div>

      {/* Pending Payments Alert - Placeholder for Phase 4 */}
      {stats?.bookings?.pendingVerification > 0 && (
        <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-yellow-800">
                {stats.bookings.pendingVerification} Payment
                {stats.bookings.pendingVerification !== 1 ? "s" : ""} Awaiting
                Verification
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                Investors are waiting for their payments to be verified.
              </p>
            </div>
            <Button
              size="sm"
              className="bg-yellow-600 hover:bg-yellow-700"
              asChild
            >
              <Link href="/admin/bookings?status=pending">
                Review Now <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mb-6 flex flex-wrap gap-3">
        <Button className="bg-[#5c8a75] hover:bg-[#4a6f5f]" asChild>
          <Link href="/admin/projects/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Link>
        </Button>
        <Button
          variant="outline"
          className="border-[#5c8a75] text-[#5c8a75] hover:bg-[#5c8a75] hover:text-white"
          asChild
        >
          <Link href="/admin/plots/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Plot
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Total Projects"
          value={loading ? "..." : stats?.projects?.total || 0}
          icon={FolderOpen}
          color="blue"
          description={`${stats?.projects?.ready || 0} ready for investors`}
          onClick={() => router.push("/admin/projects")}
        />

        <StatCard
          title="Total Plots"
          value={loading ? "..." : stats?.plots?.total || 0}
          icon={MapPin}
          color="green"
          description={`${stats?.plots?.visible || 0} visible to investors`}
          onClick={() => router.push("/admin/plots")}
        />

        <StatCard
          title="Investors"
          value={loading ? "..." : stats?.investors?.total || 0}
          icon={Users}
          color="purple"
          change={stats?.investors?.recent > 0 ? 10 : 0}
          changeLabel={`${stats?.investors?.recent || 0} new this month`}
          onClick={() => router.push("/admin/investors")}
        />

        <StatCard
          title="Pending Verification"
          value={loading ? "..." : stats?.bookings?.pendingVerification || 0}
          icon={AlertCircle}
          color={stats?.bookings?.pendingVerification > 0 ? "yellow" : "green"}
          description="Payment verifications needed"
          onClick={() => router.push("/admin/bookings?status=pending")}
        />
      </div>

      {/* Charts & Activity Grid */}
      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        {/* Plot Distribution Chart - 1 column */}
        <div className="lg:col-span-1">
          <PlotStatusChart data={stats?.plots} />
        </div>

        {/* Activity Feed - 2 columns */}
        <div className="lg:col-span-2">
          <ActivityFeed activities={activities} loading={loading} />
        </div>
      </div>

      {/* Project Status Overview */}
      {stats?.projects && (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-blue-900">Planning</h3>
              <span className="text-2xl font-bold text-blue-700">
                {stats.projects.planning || 0}
              </span>
            </div>
            <p className="text-xs text-blue-600">Projects in planning phase</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-yellow-900">
                Development
              </h3>
              <span className="text-2xl font-bold text-yellow-700">
                {stats.projects.development || 0}
              </span>
            </div>
            <p className="text-xs text-yellow-600">Under active development</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-green-900">Ready</h3>
              <span className="text-2xl font-bold text-green-700">
                {stats.projects.ready || 0}
              </span>
            </div>
            <p className="text-xs text-green-600">Ready for investors</p>
          </div>
        </div>
      )}
    </div>
  );
}
