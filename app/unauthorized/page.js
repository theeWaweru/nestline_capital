// app/unauthorized/page.js
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f6f8f7] to-white p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <ShieldAlert className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">
            Access Denied
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            You don&apos;t have permission to access this page
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 mb-2">
              Why am I seeing this?
            </h3>
            <ul className="text-sm text-red-800 space-y-2 list-disc list-inside">
              <li>You may not have the required role or permissions</li>
              <li>This page is restricted to administrators or editors</li>
              <li>Your session may have expired</li>
              <li>You may need to verify your email address</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">
              What can I do?
            </h3>
            <ul className="text-sm text-blue-800 space-y-2 list-disc list-inside">
              <li>Try logging in again with the correct account</li>
              <li>Contact an administrator if you need access</li>
              <li>Check your email for verification links</li>
              <li>Return to the dashboard and try again</li>
            </ul>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
            <Button asChild className="bg-[#5c8a75] hover:bg-[#4a6f5f] gap-2">
              <Link href="/">
                <Home className="w-4 h-4" />
                Go Home
              </Link>
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500 pt-4 border-t">
            <p>
              If you believe this is an error, please contact support at{" "}
              <a
                href="mailto:support@nestlinecapital.com"
                className="text-[#5c8a75] hover:underline"
              >
                support@nestlinecapital.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
