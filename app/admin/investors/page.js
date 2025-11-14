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
import { ArrowLeft, Users, Mail, Phone, Calendar, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
      const response = await fetch("/api/admin/investors");
      if (response.ok) {
        const data = await response.json();
        setInvestors(data.investors || []);
      }
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
          ) : investors.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Investors Yet
              </h3>
              <p className="text-gray-600">
                No investors have registered on the platform yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Investor</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Last Login</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {investors.map((investor) => (
                    <TableRow key={investor._id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{investor.name}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Mail className="w-3 h-3 mr-1" />
                            {investor.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {investor.phone ? (
                          <div className="flex items-center text-sm">
                            <Phone className="w-3 h-3 mr-1" />
                            {investor.phone}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">No phone</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {investor.emailVerified ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 w-fit">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 w-fit">
                              <XCircle className="w-3 h-3 mr-1" />
                              Unverified
                            </Badge>
                          )}
                          {!investor.isActive && (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 w-fit">
                              Inactive
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium">{investor.stats?.totalBookings || 0} total</p>
                          {investor.stats?.activeBookings > 0 && (
                            <p className="text-green-600">
                              {investor.stats.activeBookings} active
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(investor.createdAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        {investor.lastLogin ? (
                          <span className="text-sm text-gray-600">
                            {new Date(investor.lastLogin).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">Never</span>
                        )}
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
