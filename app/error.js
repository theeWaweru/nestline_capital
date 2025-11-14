// app/error.js
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f6f8f7] to-white p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">
            Something Went Wrong
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            We encountered an unexpected error
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {process.env.NODE_ENV === "development" && error && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                Error Details (Development Only):
              </h3>
              <pre className="text-xs text-red-600 overflow-auto max-h-40">
                {error.message || "Unknown error"}
              </pre>
              {error.stack && (
                <details className="mt-2">
                  <summary className="text-xs text-gray-600 cursor-pointer hover:text-gray-900">
                    Stack Trace
                  </summary>
                  <pre className="text-xs text-gray-600 mt-2 overflow-auto max-h-40">
                    {error.stack}
                  </pre>
                </details>
              )}
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">
              What you can try:
            </h3>
            <ul className="text-sm text-blue-800 space-y-2 list-disc list-inside">
              <li>Refresh the page to try again</li>
              <li>Clear your browser cache and cookies</li>
              <li>Check your internet connection</li>
              <li>Try again in a few minutes</li>
              <li>If the problem persists, contact support</li>
            </ul>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              variant="outline"
              onClick={() => reset()}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
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
              Need help? Contact us at{" "}
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
