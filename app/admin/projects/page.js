// app/admin/projects/page.js
"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
import { Plus, MoreVertical, Edit, Trash2, Eye } from "lucide-react";

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

export default function ProjectsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user?.role !== "admin") {
      router.push("/dashboard");
    } else {
      fetchProjects();
    }
  }, [status, session, router, fetchProjects]);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const url =
        filter === "all"
          ? "/api/admin/projects"
          : `/api/admin/projects?status=${filter}`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchProjects();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
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
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage land development projects</p>
        </div>
        <Button asChild className="bg-[#5c8a75] hover:bg-[#4a6f5f]">
          <Link href="/admin/projects/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Link>
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => {
            setFilter("all");
            fetchProjects();
          }}
          className={filter === "all" ? "bg-[#5c8a75] hover:bg-[#4a6f5f]" : ""}
        >
          All Projects
        </Button>
        <Button
          variant={filter === "planning" ? "default" : "outline"}
          onClick={() => {
            setFilter("planning");
            fetchProjects();
          }}
          className={
            filter === "planning" ? "bg-[#5c8a75] hover:bg-[#4a6f5f]" : ""
          }
        >
          Planning
        </Button>
        <Button
          variant={filter === "development" ? "default" : "outline"}
          onClick={() => {
            setFilter("development");
            fetchProjects();
          }}
          className={
            filter === "development" ? "bg-[#5c8a75] hover:bg-[#4a6f5f]" : ""
          }
        >
          Development
        </Button>
        <Button
          variant={filter === "ready" ? "default" : "outline"}
          onClick={() => {
            setFilter("ready");
            fetchProjects();
          }}
          className={
            filter === "ready" ? "bg-[#5c8a75] hover:bg-[#4a6f5f]" : ""
          }
        >
          Ready
        </Button>
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {projects.length} {projects.length === 1 ? "Project" : "Projects"}
          </CardTitle>
          <CardDescription>
            View and manage all land development projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin w-8 h-8 border-4 border-[#5c8a75] border-t-transparent rounded-full"></div>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No projects found</p>
              <Button asChild variant="outline">
                <Link href="/admin/projects/new">
                  Create your first project
                </Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Plots</TableHead>
                    <TableHead>Completion Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project._id}>
                      <TableCell className="font-medium">
                        {project.name}
                      </TableCell>
                      <TableCell>
                        {typeof project.location === "string"
                          ? project.location
                          : project.location?.address ||
                            project.location?.county ||
                            "—"}
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[project.status]}>
                          {statusLabels[project.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">
                          {project.plotCount}/{project.totalPlots}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          ({project.slotsRemaining} slots)
                        </span>
                      </TableCell>
                      <TableCell>
                        {project.completionDate
                          ? new Date(
                              project.completionDate
                            ).toLocaleDateString()
                          : "—"}
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
                              <Link href={`/admin/projects/${project._id}`}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/admin/projects/${project._id}/edit`}
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleDelete(project._id, project.name)
                              }
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
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
