// File: app/admin/page.js
"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  MapPin,
  Users,
  FileText,
  Settings,
  LogOut,
  UserPlus,
  BarChart3,
  Shield,
  Building2,
  Mail,
} from "lucide-react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalPlots: 0,
    available: 0,
    sold: 0,
    totalUsers: 0,
    editors: 0,
    pendingBookings: 0,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user?.role !== "admin") {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-[#5c8a75] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        {/* Sidebar */}
        <Sidebar className="border-r">
          <SidebarHeader className="border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-6 h-6 text-[#5c8a75]" />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Nestline Capital
                </h1>
                <p className="text-xs text-gray-500">Admin Dashboard</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-3 py-4">
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive>
                      <Link href="/admin">
                        <Home className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/plots">
                        <MapPin className="w-4 h-4" />
                        <span>Plot Management</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/bookings">
                        <FileText className="w-4 h-4" />
                        <span>Bookings</span>
                        {stats.pendingBookings > 0 && (
                          <Badge className="ml-auto bg-red-500 text-white hover:bg-red-600">
                            {stats.pendingBookings}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/users">
                        <Users className="w-4 h-4" />
                        <span>Users</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/editors">
                        <UserPlus className="w-4 h-4" />
                        <span>Invite Editors</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/analytics">
                        <BarChart3 className="w-4 h-4" />
                        <span>Analytics</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/settings">
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="w-full">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-[#5c8a75] text-white text-sm">
                          {session?.user?.name?.charAt(0) || "A"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start text-left flex-1 min-w-0">
                        <span className="text-sm font-medium truncate w-full">
                          {session?.user?.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          Administrator
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" side="top">
                    <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin/profile">
                        <Shield className="w-4 h-4 mr-2" />
                        Profile Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Dashboard Overview
                </h2>
                <p className="text-sm text-gray-600">
                  Welcome back, {session?.user?.name}
                </p>
              </div>
            </div>

            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
              <Shield className="w-3 h-3 mr-1" />
              Admin
            </Badge>
          </header>

          {/* Content Area - Scrollable */}
          <main className="flex-1 p-6 overflow-y-auto">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Plots</CardDescription>
                  <CardTitle className="text-3xl text-[#5c8a75]">
                    {stats.totalPlots}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge
                      variant="secondary"
                      className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                    >
                      {stats.available} Available
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-rose-100 text-rose-800 hover:bg-rose-100"
                    >
                      {stats.sold} Sold
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>System Users</CardDescription>
                  <CardTitle className="text-3xl text-blue-600">
                    {stats.totalUsers}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {stats.editors} editors active
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Pending Bookings</CardDescription>
                  <CardTitle className="text-3xl text-orange-600">
                    {stats.pendingBookings}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {stats.pendingBookings > 0 ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      asChild
                    >
                      <Link href="/admin/bookings">
                        Review Booking{stats.pendingBookings > 1 ? "s" : ""}
                      </Link>
                    </Button>
                  ) : (
                    <p className="text-sm text-gray-500 py-2 text-center">
                      All caught up! 🎉
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                  <CardDescription>
                    Common administrative tasks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/admin/plots/new">
                      <MapPin className="w-4 h-4 mr-2" />
                      Add New Plot
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/admin/editors">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Invite Editor
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/admin/analytics">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Reports
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-[#5c8a75] border-l-4">
                <CardHeader>
                  <CardTitle className="text-base">
                    Admin Capabilities
                  </CardTitle>
                  <CardDescription>What you can do</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-[#5c8a75] mr-2">✓</span>
                      <span>Create, edit, delete all content</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#5c8a75] mr-2">✓</span>
                      <span>Invite and manage editors</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#5c8a75] mr-2">✓</span>
                      <span>Approve/reject bookings</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#5c8a75] mr-2">✓</span>
                      <span>Manage user accounts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#5c8a75] mr-2">✓</span>
                      <span>View analytics & reports</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#5c8a75] mr-2">✓</span>
                      <span>Configure system settings</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">System Status</CardTitle>
                <CardDescription>All systems operational</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">Database</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 hover:bg-green-100"
                    >
                      Connected
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">Email Service</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 hover:bg-green-100"
                    >
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">
                        Authentication
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 hover:bg-green-100"
                    >
                      Secured
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}