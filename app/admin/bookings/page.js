// app/admin/bookings/page.js
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, DollarSign, AlertCircle } from "lucide-react";

export default function BookingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("status") || "all"
  );

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/login");
    } else if (
      session?.user?.role !== "admin" &&
      session?.user?.role !== "editor"
    ) {
      router.push("/dashboard");
    }
  }, [status, session, router]);

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

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Bookings & Payments
            </h1>
            <p className="text-gray-600 mt-1">
              Review and verify investor payments
            </p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">
            Pending
            <Badge variant="outline" className="ml-2 bg-yellow-100">
              0
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>All Bookings</CardTitle>
              <CardDescription>
                View all plot bookings and payment submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Coming Soon - Phase 4
                </h3>
                <p className="text-gray-600 mb-4">
                  The booking and payment system will be available after
                  investors can browse and book plots.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto text-left">
                  <p className="text-sm text-blue-900 font-semibold mb-2">
                    Payment Verification Flow:
                  </p>
                  <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                    <li>Investor selects plot(s) and submits booking</li>
                    <li>
                      Investor makes payment to your account and uploads proof
                    </li>
                    <li>
                      Payment appears in &quot;Pending&quot; tab with
                      screenshots
                    </li>
                    <li>You verify payment and approve booking</li>
                    <li>Plot status changes to &quot;Booked&quot;</li>
                    <li>Investor can track remaining payments</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Verification</CardTitle>
              <CardDescription>
                Payments waiting for your verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Pending Payments
                </h3>
                <p className="text-gray-600">
                  All payments have been verified or no bookings yet.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verified" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Verified Payments</CardTitle>
              <CardDescription>Successfully verified bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-gray-600">No verified payments yet</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Payments</CardTitle>
              <CardDescription>
                Payments that were rejected with reasons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-gray-600">No rejected payments</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
