// app/not-found.js
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f6f8f7] to-white p-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#5c8a75]">404</h1>
          <h2 className="text-3xl font-semibold text-gray-900 mt-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mt-2 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or hasn&apos;t
            been created yet.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button asChild className="bg-[#5c8a75] hover:bg-[#4a6f5f]">
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/plots">Browse Plots</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
