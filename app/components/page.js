"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ComponentsShowcase() {
  const [checkboxState, setCheckboxState] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const [progress, setProgress] = useState(65);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Interactive Components Library
          </h1>
          <p className="text-sm text-gray-600">
            shadcn/ui components styled for Kiota Platform
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        {/* Buttons Section */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Buttons</h2>

          {/* Standard Buttons */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Standard Buttons</CardTitle>
              <CardDescription>
                Default button variants with hover states
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button className="bg-[#5c8a75] hover:bg-[#4a6f5f]">
                  Primary Button
                </Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="link">Link Button</Button>
              </div>

              <Separator />

              <div className="flex flex-wrap gap-3">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Success
                </Button>
                <Button className="bg-amber-500 hover:bg-amber-600">
                  Warning
                </Button>
                <Button variant="destructive">Danger</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Info</Button>
              </div>
            </CardContent>
          </Card>

          {/* Icon Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Icon Buttons</CardTitle>
              <CardDescription>
                36x36px action buttons used in tables
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {/* Edit Button */}
                <Button
                  variant="outline"
                  size="icon"
                  className="w-9 h-9"
                  title="Edit"
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </Button>

                {/* View Button */}
                <Button
                  variant="outline"
                  size="icon"
                  className="w-9 h-9"
                  title="View"
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </Button>

                {/* Delete Button */}
                <Button
                  variant="outline"
                  size="icon"
                  className="w-9 h-9 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                  title="Delete"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </Button>

                {/* More Options Button */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-9 h-9"
                      title="More options"
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
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem>Archive</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-rose-600">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Separator orientation="vertical" className="h-9" />

                {/* With Text Labels */}
                <Button variant="outline" className="gap-2">
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
                  Add New
                </Button>

                <Button variant="outline" className="gap-2">
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
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Badges Section */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Badges</h2>
          <Card>
            <CardHeader>
              <CardTitle>Status Badges</CardTitle>
              <CardDescription>
                Plot and project status indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                  Available
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  Reserved
                </Badge>
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                  On Hold
                </Badge>
                <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-100">
                  Sold
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                  Confirmed
                </Badge>
                <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                  Draft
                </Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Form Elements Section */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Form Elements
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>Interactive Form Components</CardTitle>
              <CardDescription>
                Try interacting with these form elements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Text Input</label>
                <Input placeholder="Enter plot number..." />
              </div>

              {/* Select */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Dropdown</label>
                <Select value={selectValue} onValueChange={setSelectValue}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="palmcrest">
                      PalmCrest Residence
                    </SelectItem>
                    <SelectItem value="greenfield">
                      Greenfield Estates
                    </SelectItem>
                    <SelectItem value="kilifi">Kilifi Beach Plots</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={checkboxState}
                  onCheckedChange={setCheckboxState}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Include sold plots in report
                </label>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <label className="font-medium">Project Completion</label>
                  <span className="text-gray-500">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setProgress(Math.max(0, progress - 10))}
                  >
                    -10%
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setProgress(Math.min(100, progress + 10))}
                  >
                    +10%
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cards Section */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Plots</CardTitle>
                <CardDescription>Active inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#5c8a75]">156</div>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                +12% from last month
              </CardFooter>
            </Card>

            <Card className="bg-[#5c8a75] text-white">
              <CardHeader>
                <CardTitle className="text-white">Revenue</CardTitle>
                <CardDescription className="text-white/80">
                  This quarter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">KES 24.5M</div>
              </CardContent>
              <CardFooter className="text-white/80 text-sm">
                Target: KES 30M
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avg. Sale Time</CardTitle>
                <CardDescription>Days to close</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">45</div>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                -8 days from average
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Tabs Section */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Tabs</h2>
          <Card>
            <CardHeader>
              <CardTitle>Interactive Tabs</CardTitle>
              <CardDescription>Click to switch between views</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="available" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="available">Available</TabsTrigger>
                  <TabsTrigger value="reserved">Reserved</TabsTrigger>
                  <TabsTrigger value="sold">Sold</TabsTrigger>
                  <TabsTrigger value="all">All Plots</TabsTrigger>
                </TabsList>
                <TabsContent value="available" className="space-y-4">
                  <div className="text-sm text-gray-600">
                    <p>Showing 45 available plots ready for purchase</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-2">
                          Available
                        </Badge>
                        <p className="font-medium">Plot {i}23</p>
                        <p className="text-sm text-gray-500">KES 399,000</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="reserved" className="space-y-4">
                  <p className="text-sm text-gray-600">
                    12 plots currently reserved
                  </p>
                </TabsContent>
                <TabsContent value="sold" className="space-y-4">
                  <p className="text-sm text-gray-600">
                    89 plots successfully sold
                  </p>
                </TabsContent>
                <TabsContent value="all" className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Total: 156 plots across all phases
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        {/* Avatars Section */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Avatars</h2>
          <Card>
            <CardHeader>
              <CardTitle>User Avatars</CardTitle>
              <CardDescription>Team member representations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 items-center">
                <Avatar>
                  <AvatarFallback className="bg-[#5c8a75] text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback className="bg-blue-500 text-white">
                    MW
                  </AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback className="bg-amber-500 text-white">
                    SK
                  </AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback className="bg-rose-500 text-white">
                    AD
                  </AvatarFallback>
                </Avatar>

                <Separator orientation="vertical" className="h-10" />

                <div className="flex -space-x-2">
                  <Avatar className="border-2 border-white">
                    <AvatarFallback className="bg-[#5c8a75] text-white text-xs">
                      J
                    </AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-white">
                    <AvatarFallback className="bg-blue-500 text-white text-xs">
                      M
                    </AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-white">
                    <AvatarFallback className="bg-amber-500 text-white text-xs">
                      S
                    </AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-white">
                    <AvatarFallback className="bg-gray-500 text-white text-xs">
                      +5
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Combined Example */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Real-World Example
          </h2>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Plot Inventory</CardTitle>
                  <CardDescription>
                    Manage your property listings
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
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
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Export
                  </Button>
                  <Button
                    className="bg-[#5c8a75] hover:bg-[#4a6f5f] gap-2"
                    size="sm"
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
                    Add Plot
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Filters */}
                <div className="flex gap-3">
                  <Input placeholder="Search plots..." className="max-w-xs" />
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Table */}
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                          <Checkbox />
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                          Plot ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                          Size
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                          Price
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {[
                        {
                          id: "GF001",
                          size: "50x100",
                          price: "399,000",
                          status: "available",
                        },
                        {
                          id: "GF002",
                          size: "50x100",
                          price: "399,000",
                          status: "reserved",
                        },
                        {
                          id: "GF003",
                          size: "50x100",
                          price: "399,000",
                          status: "sold",
                        },
                      ].map((plot) => (
                        <tr key={plot.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <Checkbox />
                          </td>
                          <td className="px-4 py-4 font-medium">{plot.id}</td>
                          <td className="px-4 py-4 text-gray-600">
                            {plot.size}
                          </td>
                          <td className="px-4 py-4">KES {plot.price}</td>
                          <td className="px-4 py-4">
                            <Badge
                              className={
                                plot.status === "available"
                                  ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                                  : plot.status === "reserved"
                                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                  : "bg-rose-100 text-rose-800 hover:bg-rose-100"
                              }
                            >
                              {plot.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="w-9 h-9"
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
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="w-9 h-9"
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
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="w-9 h-9"
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
                                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                      />
                                    </svg>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                  <DropdownMenuItem>Archive</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-rose-600">
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
