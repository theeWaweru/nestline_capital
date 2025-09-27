// =============================================================================
// 1. app/admin/layout.js - Admin-specific layout
// =============================================================================
import "./admin.css";

export default function AdminLayout({ children }) {
  return (
    <>
      <div className="admin-layout">
        <div className="admin-main">
          <main className="admin-content">{children}</main>
        </div>
      </div>
    </>
  );
}
