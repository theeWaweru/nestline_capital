// app/admin/investors/page.js
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
import { ArrowLeft, Users } from "lucide-react";

export default function InvestorsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);

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
      fetchInvestors();
    }
  }, [status, session, router]);

  const fetchInvestors = async () => {
    try {
      // This will be implemented in Phase 4
      // For now, just show empty state
      setInvestors([]);
    } catch (error) {
      console.error("Error fetching investors:", error);
    } finally {
      setLoading(false);
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
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/admin")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <h1 className="text-3xl font-bold text-gray-900">Investors</h1>
        <p className="text-gray-600 mt-1">Manage registered investors</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registered Investors</CardTitle>
          <CardDescription>
            View and manage all investor accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin w-8 h-8 border-4 border-[#5c8a75] border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Coming Soon
              </h3>
              <p className="text-gray-600 mb-4">
                Investor management will be available in Phase 4 after the
                booking system is implemented.
              </p>
              <p className="text-sm text-gray-500">
                This page will show all registered investors, their booking
                history, and payment status.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
