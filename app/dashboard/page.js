// File: app/dashboard/page.js
// User dashboard - main page for regular users
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
import { Home, MapPin, FileText, User, LogOut } from "lucide-react";

export default function UserDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    available: 0,
    myBookings: 0,
    totalPlots: 0,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-[#5c8a75] border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
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
                Nestline Capital
              </h1>
              <p className="text-xs text-gray-500">Investment Platform</p>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard">
                    <Home className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/plots">
                    <MapPin className="w-4 h-4" />
                    <span>Browse Plots</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/my-bookings">
                    <FileText className="w-4 h-4" />
                    <span>My Bookings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/profile">
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
                        <AvatarFallback className="bg-[#5c8a75] text-white">
                          {session?.user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start text-left flex-1">
                        <span className="text-sm font-medium">
                          {session?.user?.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {session?.user?.email}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/profile">
                        <User className="w-4 h-4 mr-2" />
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
                  Welcome, {session?.user?.name?.split(" ")[0]}
                </h2>
                <p className="text-sm text-gray-600">
                  Explore plots and manage investments
                </p>
              </div>
            </div>

            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
              {session?.user?.role || "User"}
            </Badge>
          </header>

          <main className="flex-1 p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Available Plots</CardDescription>
                  <CardTitle className="text-3xl text-[#5c8a75]">
                    {stats.available}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Ready for booking</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>My Bookings</CardDescription>
                  <CardTitle className="text-3xl text-blue-600">
                    {stats.myBookings}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Active reservations</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Projects</CardDescription>
                  <CardTitle className="text-3xl text-amber-600">
                    {stats.totalPlots}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Across all locations</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>What would you like to do?</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  asChild
                  className="bg-[#5c8a75] hover:bg-[#4a6f5f] h-auto py-4"
                >
                  <Link href="/dashboard/plots">
                    <div className="flex items-start gap-3 text-left">
                      <MapPin className="w-5 h-5 mt-1" />
                      <div>
                        <div className="font-medium">
                          Browse Available Plots
                        </div>
                        <div className="text-xs opacity-90 font-normal">
                          Explore opportunities
                        </div>
                      </div>
                    </div>
                  </Link>
                </Button>

                <Button asChild variant="outline" className="h-auto py-4">
                  <Link href="/dashboard/my-bookings">
                    <div className="flex items-start gap-3 text-left">
                      <FileText className="w-5 h-5 mt-1" />
                      <div>
                        <div className="font-medium">View My Bookings</div>
                        <div className="text-xs text-gray-500 font-normal">
                          Track investments
                        </div>
                      </div>
                    </div>
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6 border-[#5c8a75] border-l-4">
              <CardHeader>
                <CardTitle className="text-base">Getting Started</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <p>1. Browse available plots in our projects</p>
                <p>2. Select and initiate booking</p>
                <p>3. Upload payment proof</p>
                <p>4. Receive documentation</p>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
