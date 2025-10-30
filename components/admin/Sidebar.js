// components/admin/Sidebar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  FolderOpen,
  MapPin,
  DollarSign,
  Users,
  UserCog,
  Settings,
  LogOut,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    roles: ["admin", "editor"],
  },
  {
    name: "Projects",
    href: "/admin/projects",
    icon: FolderOpen,
    roles: ["admin", "editor"],
  },
  {
    name: "Plots",
    href: "/admin/plots",
    icon: MapPin,
    roles: ["admin", "editor"],
  },
  {
    name: "Bookings",
    href: "/admin/bookings",
    icon: DollarSign,
    badge: 0, // Will be dynamic in Phase 4
    roles: ["admin", "editor"],
  },
  {
    name: "Investors",
    href: "/admin/investors",
    icon: Users,
    roles: ["admin", "editor"],
  },
  {
    name: "Team",
    href: "/admin/team",
    icon: UserCog,
    roles: ["admin"], // Admin only
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
    roles: ["admin"], // Admin only
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (href) => {
    if (href === "/admin") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  const canAccess = (item) => {
    if (!session?.user?.role) return false;
    return item.roles.includes(session.user.role);
  };

  return (
    <div className="flex h-screen w-64 flex-col fixed left-0 top-0 bg-gray-900 text-white">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-gray-800">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#5c8a75] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span className="font-bold text-lg">Nestline Capital</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {navigation.map((item) => {
            if (!canAccess(item)) return null;

            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${
                    active
                      ? "bg-[#5c8a75] text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1">{item.name}</span>
                {item.badge > 0 && (
                  <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Info */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-[#5c8a75] rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {session?.user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {session?.user?.name}
            </p>
            <p className="text-xs text-gray-400 capitalize">
              {session?.user?.role}
            </p>
          </div>
        </div>
        <Link
          href="/api/auth/signout"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </Link>
      </div>
    </div>
  );
}
