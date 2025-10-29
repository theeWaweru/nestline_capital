// File: app/editor/dashboard/page.js
// Editor dashboard - plot and booking management
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
import { Home, MapPin, FileText, User, LogOut, Edit3 } from "lucide-react";

export default function EditorDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    plotsManaged: 0,
    pendingBookings: 0,
    processedToday: 0,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (
      session?.user?.role !== "editor" &&
      session?.user?.role !== "admin"
    ) {
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
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="px-4 py-3">
              <h1 className="text-xl font-semibold text-[#5c8a75]">
                Nestline Editor
              </h1>
              <p className="text-xs text-gray-500">Content Management</p>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/editor/dashboard">
                    <Home className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/editor/plots">
                    <MapPin className="w-4 h-4" />
                    <span>Manage Plots</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/editor/bookings">
                    <FileText className="w-4 h-4" />
                    <span>Process Bookings</span>
                    {stats.pendingBookings > 0 && (
                      <Badge className="ml-auto bg-amber-500">
                        {stats.pendingBookings}
                      </Badge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/editor/profile">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="w-full">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-blue-600 text-white">
                          {session?.user?.name?.charAt(0) || "E"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start text-left flex-1">
                        <span className="text-sm font-medium">
                          {session?.user?.name}
                        </span>
                        <span className="text-xs text-gray-500">Editor</span>
                      </div>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>Editor Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/editor/profile">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Profile Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/login" })}
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

        <div className="flex-1 flex flex-col">
          <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Editor Dashboard
                </h2>
                <p className="text-sm text-gray-600">
                  Manage plots and bookings
                </p>
              </div>
            </div>

            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
              <Edit3 className="w-3 h-3 mr-1" />
              Editor
            </Badge>
          </header>

          <main className="flex-1 p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Plots Managed</CardDescription>
                  <CardTitle className="text-3xl text-[#5c8a75]">
                    {stats.plotsManaged}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Under management</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Pending Bookings</CardDescription>
                  <CardTitle className="text-3xl text-amber-600">
                    {stats.pendingBookings}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Awaiting review</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Processed Today</CardDescription>
                  <CardTitle className="text-3xl text-emerald-600">
                    {stats.processedToday}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Bookings handled</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    asChild
                    className="w-full bg-[#5c8a75] hover:bg-[#4a6f5f]"
                  >
                    <Link href="/editor/plots/add">
                      <MapPin className="w-4 h-4 mr-2" />
                      Add New Plot
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/editor/bookings">
                      <FileText className="w-4 h-4 mr-2" />
                      Review Bookings
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-amber-600">📋</span>
                    Pending Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {stats.pendingBookings > 0 ? (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Link href="/editor/bookings">
                        <FileText className="w-4 h-4 mr-2" />
                        {stats.pendingBookings} Booking
                        {stats.pendingBookings !== 1 ? "s" : ""}
                      </Link>
                    </Button>
                  ) : (
                    <p className="text-sm text-gray-500 py-4 text-center">
                      All done! ✓
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="border-blue-200 border-l-4">
              <CardHeader>
                <CardTitle className="text-base">Editor Permissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-emerald-700 mb-2">
                      ✓ You Can:
                    </p>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Add and edit plots</li>
                      <li>• Process bookings</li>
                      <li>• Update availability</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-red-700 mb-2">
                      ✗ You Cannot:
                    </p>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Delete users/plots</li>
                      <li>• Invite editors</li>
                      <li>• Access settings</li>
                    </ul>
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
