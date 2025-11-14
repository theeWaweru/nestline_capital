// app/admin/team/page.js
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, UserPlus, Shield, Edit3, Trash2 } from "lucide-react";

export default function TeamPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user?.role !== "admin") {
      router.push("/unauthorized");
    } else {
      fetchTeamMembers();
    }
  }, [status, session, router]);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("/api/admin/team");
      if (response.ok) {
        const data = await response.json();
        setTeamMembers(data.members || []);
      }
    } catch (error) {
      console.error("Error fetching team:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role) => {
    const variants = {
      admin: "bg-purple-100 text-purple-800 border-purple-200",
      editor: "bg-blue-100 text-blue-800 border-blue-200",
    };

    return (
      <Badge variant="outline" className={variants[role] || "bg-gray-100 text-gray-800"}>
        <Shield className="w-3 h-3 mr-1" />
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
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
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/admin")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
            <p className="text-gray-600 mt-1">
              Manage admin and editor accounts
            </p>
          </div>
          <Button className="bg-[#5c8a75] hover:bg-[#4a6f5f]">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Team Member
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Admin and editor users who can manage the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin w-8 h-8 border-4 border-[#5c8a75] border-t-transparent rounded-full"></div>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Team Member Management
              </h3>
              <p className="text-gray-600 mb-4">
                This feature allows you to invite and manage admin and editor accounts.
              </p>
              <p className="text-sm text-gray-500">
                Team members with admin role have full access, while editors can manage content but cannot access sensitive settings.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member._id}>
                      <TableCell className="font-medium">
                        {member.name}
                      </TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{getRoleBadge(member.role)}</TableCell>
                      <TableCell>
                        {member.isActive ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(member.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit3 className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            <Trash2 className="w-3 h-3 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>
            Understanding team member roles and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <h4 className="font-semibold text-purple-900 mb-1">Admin</h4>
              <p className="text-sm text-gray-600">
                Full access to all features including team management, settings, projects, plots, bookings, and payments.
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h4 className="font-semibold text-blue-900 mb-1">Editor</h4>
              <p className="text-sm text-gray-600">
                Can manage projects, plots, bookings, and verify payments. Cannot access team management or system settings.
              </p>
            </div>
            <div className="border-l-4 border-gray-500 pl-4 py-2">
              <h4 className="font-semibold text-gray-900 mb-1">User (Investor)</h4>
              <p className="text-sm text-gray-600">
                Can view available plots, create bookings, submit payment proofs, and track their investments.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
