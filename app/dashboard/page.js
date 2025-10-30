// app/dashboard/page.js
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
import { Home, MapPin, FileText, User, LogOut } from "lucide-react";

export default function UserDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    availablePlots: 0,
    myBookings: 0,
    totalProjects: 0,
  });

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin w-12 h-12 border-4 border-[#5c8a75] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* User Sidebar */}
        <Sidebar>
          <SidebarHeader className="border-b px-6 py-5">
            <Link href="/dashboard" className="flex flex-col">
              <h1 className="text-xl font-semibold text-[#5c8a75]">
                Nestline Capital
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Investment Platform
              </p>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive>
                      <Link href="/dashboard">
                        <Home />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/plots">
                        <MapPin />
                        <span>Browse Plots</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/bookings">
                        <FileText />
                        <span>My Bookings</span>
                      </Link>
                    </SidebarMenuButton>
                    {stats.myBookings > 0 && (
                      <Badge className="ml-auto bg-blue-500 text-white text-xs px-2">
                        {stats.myBookings}
                      </Badge>
                    )}
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/profile">
                        <User />
                        <span>Profile</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t">
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarFallback className="rounded-lg bg-[#5c8a75] text-white">
                          {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {session?.user?.name}
                        </span>
                        <span className="truncate text-xs text-gray-500">
                          {session?.user?.email}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    side="bottom"
                    align="end"
                    sideOffset={4}
                  >
                    <DropdownMenuLabel className="p-0 font-normal">
                      <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarFallback className="rounded-lg bg-[#5c8a75] text-white">
                            {session?.user?.name?.charAt(0)?.toUpperCase() ||
                              "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold">
                            {session?.user?.name}
                          </span>
                          <span className="truncate text-xs text-gray-500">
                            {session?.user?.email}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/profile">
                        <User className="mr-2 h-4 w-4" />
                        Profile Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="text-red-600 focus:text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b bg-white px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="-ml-1" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Welcome, {session?.user?.name?.split(" ")[0]}
                </h2>
                <p className="text-sm text-gray-600">Manage your investments</p>
              </div>
            </div>

            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
              Investor
            </Badge>
          </header>

          {/* Scrollable Content Area */}
          <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <div className="mx-auto max-w-7xl space-y-6">
              {/* Stats Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Available Plots</CardDescription>
                    <CardTitle className="text-3xl text-[#5c8a75]">
                      {stats.availablePlots}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Explore opportunities
                    </p>
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
                    <CardTitle className="text-3xl text-orange-600">
                      {stats.totalProjects}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Across all locations
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Quick Actions</CardTitle>
                    <CardDescription>
                      Get started with investments
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/plots">
                        <MapPin className="mr-2 h-4 w-4" />
                        Browse Available Plots
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/dashboard/bookings">
                        <FileText className="mr-2 h-4 w-4" />
                        View My Bookings
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/projects">
                        <Home className="mr-2 h-4 w-4" />
                        Explore Projects
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-[#5c8a75]">
                  <CardHeader>
                    <CardTitle className="text-base">
                      Investment Journey
                    </CardTitle>
                    <CardDescription>How it works</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <span className="mr-2 text-[#5c8a75]">1.</span>
                        <span>Browse available plots and projects</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-[#5c8a75]">2.</span>
                        <span>Submit a booking request</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-[#5c8a75]">3.</span>
                        <span>Wait for admin approval</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-[#5c8a75]">4.</span>
                        <span>Complete payment</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-[#5c8a75]">5.</span>
                        <span>Track your investment</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Welcome Message */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Welcome to Nestline Capital
                  </CardTitle>
                  <CardDescription>
                    Your gateway to smart land investments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Start exploring our curated selection of premium plots
                    across multiple projects. Our team is here to help you make
                    informed investment decisions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
