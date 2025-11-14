// app/admin/bookings/page.js
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  DollarSign,
  Loader2,
  ExternalLink,
} from "lucide-react";

export default function BookingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("pending");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [verifyNotes, setVerifyNotes] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/login");
    } else if (
      session?.user?.role !== "admin" &&
      session?.user?.role !== "editor"
    ) {
      router.push("/unauthorized");
    } else {
      fetchPayments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session, router, activeTab]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const statusFilter = activeTab === "all" ? "" : `?status=${activeTab}`;
      const response = await fetch(`/api/admin/payments${statusFilter}`);
      const data = await response.json();

      if (response.ok) {
        setPayments(data.payments || []);
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPayment = async () => {
    if (!selectedPayment) return;

    try {
      setProcessing(true);
      const response = await fetch(
        `/api/admin/payments/${selectedPayment._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "verify",
            notes: verifyNotes,
          }),
        }
      );

      if (response.ok) {
        alert("Payment verified successfully!");
        setSelectedPayment(null);
        setVerifyNotes("");
        fetchPayments();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to verify payment");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      alert("Failed to verify payment");
    } finally {
      setProcessing(false);
    }
  };

  const handleRejectPayment = async () => {
    if (!selectedPayment || !rejectReason.trim()) {
      alert("Please provide a rejection reason");
      return;
    }

    try {
      setProcessing(true);
      const response = await fetch(
        `/api/admin/payments/${selectedPayment._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "reject",
            reason: rejectReason,
            notes: verifyNotes,
          }),
        }
      );

      if (response.ok) {
        alert("Payment rejected");
        setSelectedPayment(null);
        setVerifyNotes("");
        setRejectReason("");
        fetchPayments();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to reject payment");
      }
    } catch (error) {
      console.error("Error rejecting payment:", error);
      alert("Failed to reject payment");
    } finally {
      setProcessing(false);
    }
  };

  if (status === "loading" || !session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-[#5c8a75] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800",
      verified: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };

    return (
      <Badge className={variants[status] || "bg-gray-100 text-gray-800"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const pendingCount = payments.filter((p) => p.paymentStatus === "pending").length;

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

        <h1 className="text-3xl font-bold text-gray-900">
          Bookings & Payments
        </h1>
        <p className="text-gray-600 mt-1">
          Review and verify investor payment submissions
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pending">
            Pending
            {pendingCount > 0 && (
              <Badge variant="outline" className="ml-2 bg-yellow-100">
                {pendingCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        {["pending", "verified", "rejected", "all"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Payments
                </CardTitle>
                <CardDescription>
                  {tab === "pending" && "Payments awaiting verification"}
                  {tab === "verified" && "Successfully verified payments"}
                  {tab === "rejected" && "Rejected payments"}
                  {tab === "all" && "All payment submissions"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-[#5c8a75]" />
                  </div>
                ) : payments.length === 0 ? (
                  <div className="text-center py-12">
                    <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Payments
                    </h3>
                    <p className="text-gray-600">
                      {tab === "pending" && "No pending payments to review"}
                      {tab === "verified" && "No verified payments yet"}
                      {tab === "rejected" && "No rejected payments"}
                      {tab === "all" && "No payment submissions yet"}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Payment #</TableHead>
                          <TableHead>Investor</TableHead>
                          <TableHead>Plot</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {payments.map((payment) => (
                          <TableRow key={payment._id}>
                            <TableCell className="font-medium">
                              {payment.paymentNumber}
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">
                                  {payment.investor?.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {payment.investor?.email}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>{payment.plot?.plotNumber}</TableCell>
                            <TableCell>
                              KES {payment.amount?.toLocaleString()}
                            </TableCell>
                            <TableCell className="capitalize">
                              {payment.paymentMethod?.replace("-", " ")}
                            </TableCell>
                            <TableCell>
                              {new Date(payment.paymentDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(payment.paymentStatus)}
                            </TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedPayment(payment)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Payment Details - {selectedPayment.paymentNumber}</CardTitle>
              <CardDescription>
                Submitted by {selectedPayment.investor?.name} on{" "}
                {new Date(selectedPayment.createdAt).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Payment Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Amount</Label>
                  <p className="text-2xl font-bold text-[#5c8a75]">
                    KES {selectedPayment.amount?.toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label>Status</Label>
                  <div className="mt-2">
                    {getStatusBadge(selectedPayment.paymentStatus)}
                  </div>
                </div>
                <div>
                  <Label>Payment Method</Label>
                  <p className="capitalize">
                    {selectedPayment.paymentMethod?.replace("-", " ")}
                  </p>
                </div>
                <div>
                  <Label>Transaction Reference</Label>
                  <p>{selectedPayment.transactionReference || "N/A"}</p>
                </div>
                <div>
                  <Label>Deposited By</Label>
                  <p>{selectedPayment.depositedBy}</p>
                </div>
                <div>
                  <Label>Plot</Label>
                  <p>{selectedPayment.plot?.plotNumber}</p>
                </div>
              </div>

              {/* Screenshots */}
              <div>
                <Label>Payment Screenshots ({selectedPayment.screenshots?.length || 0})</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {selectedPayment.screenshots?.map((screenshot, index) => (
                    <div key={index} className="border rounded-lg p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={screenshot.url}
                        alt={`Payment proof ${index + 1}`}
                        className="w-full h-48 object-contain rounded"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full mt-2"
                        onClick={() => window.open(screenshot.url, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open Full Size
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Investor Notes */}
              {selectedPayment.investorNotes && (
                <div>
                  <Label>Investor Notes</Label>
                  <p className="mt-2 p-3 bg-gray-50 rounded border">
                    {selectedPayment.investorNotes}
                  </p>
                </div>
              )}

              {/* Admin Actions */}
              {selectedPayment.paymentStatus === "pending" && (
                <div className="space-y-4 border-t pt-4">
                  <div>
                    <Label>Verification Notes (Optional)</Label>
                    <Textarea
                      placeholder="Add notes about this verification..."
                      value={verifyNotes}
                      onChange={(e) => setVerifyNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleVerifyPayment}
                      disabled={processing}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      {processing ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <CheckCircle className="w-4 h-4 mr-2" />
                      )}
                      Verify Payment
                    </Button>
                  </div>

                  <div className="border-t pt-4">
                    <Label>Reject Payment</Label>
                    <Input
                      placeholder="Reason for rejection (required)"
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      className="mt-2"
                    />
                    <Button
                      onClick={handleRejectPayment}
                      disabled={processing || !rejectReason.trim()}
                      variant="destructive"
                      className="w-full mt-2"
                    >
                      {processing ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <XCircle className="w-4 h-4 mr-2" />
                      )}
                      Reject Payment
                    </Button>
                  </div>
                </div>
              )}

              {/* Verification/Rejection Info */}
              {selectedPayment.paymentStatus === "verified" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="font-semibold text-green-900">
                    Verified by {selectedPayment.verifiedBy?.name}
                  </p>
                  <p className="text-sm text-green-700">
                    {new Date(selectedPayment.verifiedAt).toLocaleString()}
                  </p>
                  {selectedPayment.verificationNotes && (
                    <p className="text-sm text-green-800 mt-2">
                      Notes: {selectedPayment.verificationNotes}
                    </p>
                  )}
                </div>
              )}

              {selectedPayment.paymentStatus === "rejected" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="font-semibold text-red-900">
                    Rejected by {selectedPayment.rejectedBy?.name}
                  </p>
                  <p className="text-sm text-red-700">
                    {new Date(selectedPayment.rejectedAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-red-800 mt-2">
                    Reason: {selectedPayment.rejectionReason}
                  </p>
                </div>
              )}

              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setSelectedPayment(null)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
