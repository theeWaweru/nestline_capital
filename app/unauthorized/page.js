// app/unauthorized/page.js
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldAlert, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sage-50 via-cream to-sage-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-red-100 rounded-full">
              <ShieldAlert className="w-12 h-12 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Access Denied
          </CardTitle>
          <CardDescription className="text-base mt-2">
            You don't have permission to access this page
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-sage-50 border border-sage-200 rounded-lg p-4">
            <h3 className="font-semibold text-sage-900 mb-2">
              Why am I seeing this?
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-sage-600 mt-0.5">•</span>
                <span>You may not have the required role to access this page</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-600 mt-0.5">•</span>
                <span>Your session may have expired</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-600 mt-0.5">•</span>
                <span>You may need to log in with a different account</span>
              </li>
            </ul>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>
              If you believe this is an error, please contact{" "}
              <a
                href="mailto:support@nestlinecapital.com"
                className="text-sage-600 hover:text-sage-700 underline"
              >
                support@nestlinecapital.com
              </a>
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
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
