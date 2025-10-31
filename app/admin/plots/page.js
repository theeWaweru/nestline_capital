// app/admin/plots/page.js
"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, MoreVertical, Edit, Trash2, Eye, Filter } from "lucide-react";

const statusColors = {
  draft: "bg-gray-100 text-gray-800",
  available: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  booked: "bg-blue-100 text-blue-800",
};

const statusLabels = {
  draft: "Draft",
  available: "Available",
  processing: "Processing",
  booked: "Booked",
};

export default function PlotsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [plots, setPlots] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(
    searchParams.get("project") || "all"
  );
  const [selectedStatus, setSelectedStatus] = useState("all");

  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }, []);

  const fetchPlots = useCallback(async () => {
    try {
      setLoading(true);
      let url = "/api/admin/plots?";

      if (selectedProject !== "all") {
        url += `project=${selectedProject}&`;
      }
      if (selectedStatus !== "all") {
        url += `status=${selectedStatus}&`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setPlots(data);
      }
    } catch (error) {
      console.error("Error fetching plots:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedProject, selectedStatus]);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/login");
    } else if (
      session?.user?.role !== "admin" &&
      session?.user?.role !== "editor"
    ) {
      router.push("/dashboard");
    } else {
      fetchProjects();
      fetchPlots();
    }
  }, [status, session, router, fetchProjects, fetchPlots]);

  useEffect(() => {
    fetchPlots();
  }, [fetchPlots]);

  const handleDelete = async (id, plotNumber) => {
    if (!confirm(`Are you sure you want to delete plot ${plotNumber}?`)) return;

    try {
      const response = await fetch(`/api/admin/plots/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchPlots();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete plot");
      }
    } catch (error) {
      console.error("Error deleting plot:", error);
      alert("Failed to delete plot");
    }
  };

  if (status === "loading" || !session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-[#5c8a75] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Plots</h1>
          <p className="text-gray-600 mt-1">Manage individual land plots</p>
        </div>
        <Button asChild className="bg-[#5c8a75] hover:bg-[#4a6f5f]">
          <Link href="/admin/plots/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Plot
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project._id} value={project._id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="booked">Booked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Plots Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {plots.length} {plots.length === 1 ? "Plot" : "Plots"}
          </CardTitle>
          <CardDescription>View and manage all land plots</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin w-8 h-8 border-4 border-[#5c8a75] border-t-transparent rounded-full"></div>
            </div>
          ) : plots.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No plots found</p>
              <Button asChild variant="outline">
                <Link href="/admin/plots/new">Create your first plot</Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plot Number</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Visibility</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plots.map((plot) => (
                    <TableRow key={plot._id}>
                      <TableCell className="font-medium">
                        #{plot.plotNumber}
                      </TableCell>
                      <TableCell>{plot.project?.name || "—"}</TableCell>
                      <TableCell>{plot.size}</TableCell>
                      <TableCell>KES {plot.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[plot.status]}>
                          {statusLabels[plot.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {plot.visibility ? (
                          <span className="text-green-600 text-sm">
                            ✓ Visible
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">Hidden</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/plots/${plot._id}`}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/plots/${plot._id}/edit`}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            {session?.user?.role === "admin" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleDelete(plot._id, plot.plotNumber)
                                }
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
