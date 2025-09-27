// components/admin/Header.js
"use client";

export default function Header() {
  return (
    <header className="admin-header">
      <div className="header-left">
        <div>
          <h1 className="header-title">Plot Inventory Management</h1>
          <p className="header-subtitle">
            Monitor plot availability, track status changes, and manage
            inventory across all development phases
          </p>
        </div>
      </div>

      <div className="header-right">
        <select className="header-select">
          <option value="all">All Projects</option>
          <option value="palmcrest">PalmCrest Residence</option>
          <option value="greenfield">Greenfield Estates</option>
        </select>

        <div className="user-menu">
          <div className="user-avatar">JD</div>
          <div>
            <div className="text-sm font-medium">John Doe</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}
