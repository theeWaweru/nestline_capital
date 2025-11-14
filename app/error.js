// app/error.js
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to console (in production, you'd send to error tracking service)
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sage-50 via-cream to-sage-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-orange-100 rounded-full">
              <AlertTriangle className="w-12 h-12 text-orange-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Something Went Wrong
          </CardTitle>
          <CardDescription className="text-base mt-2">
            We encountered an unexpected error
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-900 mb-2">
              What happened?
            </h3>
            <p className="text-sm text-gray-700 font-mono bg-white p-3 rounded border border-orange-200 overflow-x-auto">
              {error.message || "An unexpected error occurred"}
            </p>
          </div>

          <div className="bg-sage-50 border border-sage-200 rounded-lg p-4">
            <h3 className="font-semibold text-sage-900 mb-2">
              What can you do?
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-sage-600 mt-0.5">•</span>
                <span>Try refreshing the page</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-600 mt-0.5">•</span>
                <span>Clear your browser cache and cookies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-600 mt-0.5">•</span>
                <span>Go back to the home page and try again</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-600 mt-0.5">•</span>
                <span>Contact support if the problem persists</span>
              </li>
            </ul>
          </div>

          {process.env.NODE_ENV === "development" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2 text-xs">
                Development Info
              </h3>
              <pre className="text-xs text-red-800 overflow-x-auto">
                {error.stack}
              </pre>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button
            onClick={() => reset()}
            variant="outline"
            className="w-full"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>

          <Link href="/" className="w-full">
            <Button className="w-full bg-sage-600 hover:bg-sage-700">
              <Home className="w-4 h-4 mr-2" />
              Go to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
