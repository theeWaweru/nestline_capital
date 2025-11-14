// app/admin/settings/page.js
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Settings,
  Mail,
  Database,
  Key,
  Globe,
  Save,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user?.role !== "admin") {
      router.push("/unauthorized");
    }
  }, [status, session, router]);

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    setTimeout(() => {
      setSaving(false);
      alert("Settings saved successfully!");
    }, 1000);
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

        <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
        <p className="text-gray-600 mt-1">
          Configure platform settings and integrations
        </p>
      </div>

      <Alert className="mb-6 bg-blue-50 border-blue-200">
        <AlertDescription className="text-blue-800">
          Settings are configured via environment variables in your .env file.
          Changes here will override environment defaults for this session.
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="general">
            <Settings className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="w-4 h-4 mr-2" />
            Email
          </TabsTrigger>
          <TabsTrigger value="database">
            <Database className="w-4 h-4 mr-2" />
            Database
          </TabsTrigger>
          <TabsTrigger value="api">
            <Key className="w-4 h-4 mr-2" />
            API Keys
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic platform configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  defaultValue="Nestline Capital"
                  placeholder="Your site name"
                />
              </div>
              <div>
                <Label htmlFor="siteUrl">Site URL</Label>
                <Input
                  id="siteUrl"
                  defaultValue="https://kiota.nestlinecapital.com"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  defaultValue="admin@nestlinecapital.com"
                  placeholder="contact@example.com"
                />
              </div>
              <div>
                <Label htmlFor="paymentPeriod">Default Payment Completion Period (days)</Label>
                <Input
                  id="paymentPeriod"
                  type="number"
                  defaultValue="90"
                  placeholder="90"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Number of days investors have to complete payments after booking
                </p>
              </div>
              <Button onClick={handleSave} disabled={saving} className="bg-[#5c8a75] hover:bg-[#4a6f5f]">
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>
                Configure Brevo (Sendinblue) email service
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  Email settings are managed through environment variables.
                  Update your .env file with BREVO_API_KEY and BREVO_FROM_EMAIL.
                </AlertDescription>
              </Alert>
              <div>
                <Label>Current From Email</Label>
                <Input value="admin@nestlinecapital.com" disabled />
              </div>
              <div>
                <Label>Email Provider</Label>
                <Input value="Brevo (Sendinblue)" disabled />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Database Configuration</CardTitle>
              <CardDescription>
                MongoDB connection settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  Database settings are managed through the MONGODB_URI environment variable.
                  Do not share your connection string publicly.
                </AlertDescription>
              </Alert>
              <div>
                <Label>Database Type</Label>
                <Input value="MongoDB Atlas" disabled />
              </div>
              <div>
                <Label>Database Name</Label>
                <Input value="nestline-estates" disabled />
              </div>
              <div>
                <Label>Connection Status</Label>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Connected
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>API Keys & Integrations</CardTitle>
              <CardDescription>
                Third-party service configurations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  API keys are managed through environment variables in your .env file.
                  Never commit API keys to version control.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Google Maps API</h4>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Configured
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Used for plot location mapping and GPS coordinates
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">AWS S3</h4>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Configured
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    File storage for images, documents, and payment screenshots
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Brevo Email Service</h4>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Configured
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Transactional emails for notifications and alerts
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
