// =============================================================================
// 3. components/admin/Sidebar.js - Admin navigation sidebar
// =============================================================================
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const navigationItems = [
  { href: "/admin/dashboard", icon: "📊", label: "Dashboard" },
  { href: "/admin/plots", icon: "📍", label: "Plot Inventory" },
  { href: "/admin/analytics", icon: "📈", label: "Analytics" },
  { href: "/admin/projects", icon: "🏢", label: "Projects" },
  { href: "/admin/quotes", icon: "💬", label: "Quote Requests" },
  { href: "/admin/users", icon: "👥", label: "Users" },
  { href: "/admin/settings", icon: "⚙️", label: "Settings" },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`admin-sidebar ${!isOpen ? "mobile-hidden md:block" : ""}`}
      >
        <div className="sidebar-brand">
          <h2>Nestline Admin</h2>
        </div>

        <nav className="sidebar-nav">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${pathname === item.href ? "active" : ""}`}
              onClick={onClose}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
