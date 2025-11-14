// app/dashboard/profile/page.js
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowLeft,
  User,
  Lock,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Phone,
  Mail,
} from "lucide-react";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  // Profile state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState({ type: "", text: "" });

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({ type: "", text: "" });
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "",
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Fetch profile data
  useEffect(() => {
    if (session?.user) {
      fetchProfile();
    }
  }, [session]);

  const fetchProfile = async () => {
    try {
      setProfileLoading(true);
      const response = await fetch("/api/users/profile");
      const data = await response.json();

      if (response.ok) {
        setProfile({
          name: data.user.name || "",
          email: data.user.email || "",
          phone: data.user.phone || "",
          role: data.user.role || "",
        });
      } else {
        setProfileMessage({
          type: "error",
          text: data.error || "Failed to load profile",
        });
      }
    } catch (error) {
      setProfileMessage({
        type: "error",
        text: "Failed to load profile",
      });
    } finally {
      setProfileLoading(false);
    }
  };

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileMessage({ type: "", text: "" });

    if (!profile.name.trim()) {
      setProfileMessage({ type: "error", text: "Name is required" });
      return;
    }

    try {
      setProfileSaving(true);

      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profile.name,
          phone: profile.phone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setProfileMessage({
          type: "success",
          text: "Profile updated successfully!",
        });

        // Update session with new name
        await update({ name: data.user.name });

        // Clear success message after 3 seconds
        setTimeout(() => setProfileMessage({ type: "", text: "" }), 3000);
      } else {
        setProfileMessage({
          type: "error",
          text: data.error || "Failed to update profile",
        });
      }
    } catch (error) {
      setProfileMessage({
        type: "error",
        text: "Failed to update profile",
      });
    } finally {
      setProfileSaving(false);
    }
  };

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    let label = "";
    if (score <= 2) label = "Weak";
    else if (score <= 4) label = "Medium";
    else label = "Strong";

    return { score, label };
  };

  useEffect(() => {
    if (passwordData.newPassword) {
      setPasswordStrength(calculatePasswordStrength(passwordData.newPassword));
    } else {
      setPasswordStrength({ score: 0, label: "" });
    }
  }, [passwordData.newPassword]);

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMessage({ type: "", text: "" });

    // Validation
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setPasswordMessage({
        type: "error",
        text: "All fields are required",
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage({
        type: "error",
        text: "New passwords do not match",
      });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordMessage({
        type: "error",
        text: "Password must be at least 8 characters",
      });
      return;
    }

    try {
      setPasswordSaving(true);

      const response = await fetch("/api/users/profile/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPasswordMessage({
          type: "success",
          text: "Password changed successfully!",
        });

        // Clear form
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        // Clear success message after 3 seconds
        setTimeout(() => setPasswordMessage({ type: "", text: "" }), 3000);
      } else {
        setPasswordMessage({
          type: "error",
          text: data.error || "Failed to change password",
        });
      }
    } catch (error) {
      setPasswordMessage({
        type: "error",
        text: "Failed to change password",
      });
    } finally {
      setPasswordSaving(false);
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
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your account information and security
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            Profile Info
          </TabsTrigger>
          <TabsTrigger value="password" className="gap-2">
            <Lock className="w-4 h-4" />
            Password
          </TabsTrigger>
        </TabsList>

        {/* Profile Info Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent>
              {profileLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-[#5c8a75]" />
                </div>
              ) : (
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  {profileMessage.text && (
                    <Alert
                      variant={
                        profileMessage.type === "error" ? "destructive" : "default"
                      }
                    >
                      {profileMessage.type === "error" ? (
                        <AlertCircle className="h-4 w-4" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      )}
                      <AlertDescription>{profileMessage.text}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        className="pl-10 bg-gray-50"
                        disabled
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Email cannot be changed
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={profile.phone}
                        onChange={(e) =>
                          setProfile({ ...profile, phone: e.target.value })
                        }
                        className="pl-10"
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Include country code (e.g., +1 for USA, +254 for Kenya)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Account Role</Label>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#5c8a75] text-white capitalize">
                        {profile.role}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      disabled={profileSaving}
                      className="bg-[#5c8a75] hover:bg-[#4a6f5f]"
                    >
                      {profileSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={fetchProfile}
                      disabled={profileSaving}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Password Change Tab */}
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-6">
                {passwordMessage.text && (
                  <Alert
                    variant={
                      passwordMessage.type === "error" ? "destructive" : "default"
                    }
                  >
                    {passwordMessage.type === "error" ? (
                      <AlertCircle className="h-4 w-4" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    )}
                    <AlertDescription>{passwordMessage.text}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    required
                  />
                  {passwordData.newPassword && (
                    <div className="space-y-2">
                      <div className="flex gap-1">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded ${
                              i < passwordStrength.score
                                ? passwordStrength.score <= 2
                                  ? "bg-red-500"
                                  : passwordStrength.score <= 4
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                                : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p
                        className={`text-sm ${
                          passwordStrength.score <= 2
                            ? "text-red-600"
                            : passwordStrength.score <= 4
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        Password strength: {passwordStrength.label}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">
                    Password Requirements:
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                    <li>At least 8 characters long</li>
                    <li>Contains uppercase and lowercase letters</li>
                    <li>Contains at least one number</li>
                    <li>Different from your current password</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={passwordSaving}
                    className="bg-[#5c8a75] hover:bg-[#4a6f5f]"
                  >
                    {passwordSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Changing...
                      </>
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setPasswordData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      })
                    }
                    disabled={passwordSaving}
                  >
                    Clear
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
