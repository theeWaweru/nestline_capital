// =============================================================================
// 4. components/admin/Header.js - Admin header with user info
// =============================================================================
"use client";

import { useState } from "react";

export default function Header({ onMenuToggle }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="admin-header">
      <div className="flex items-center gap-4">
        <button className="mobile-menu-toggle md:hidden" onClick={onMenuToggle}>
          ☰
        </button>
        <h1 className="text-xl font-semibold text-gray-900">
          Nestline Capital - Admin Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:text-gray-900">
          <span className="text-lg">🔔</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <div className="w-8 h-8 bg-sage-500 rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
            <span className="text-sm font-medium text-gray-700">Admin</span>
            <span className="text-gray-400">▼</span>
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                System Settings
              </a>
              <hr className="my-2" />
              <a
                href="#"
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Sign Out
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
