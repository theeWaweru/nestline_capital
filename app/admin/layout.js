// =============================================================================
// 1. app/admin/layout.js - Admin-specific layout
// =============================================================================
import { Inter } from "next/font/google";
import "./admin.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nestline Capital - Admin Dashboard",
  description: "Property management dashboard for Nestline Capital",
};

export default function AdminLayout({ children }) {
  return (
    <>
      <html lang="en" className={inter.className}>
        <head>
          <script
            async
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          />
        </head>
        <body className="admin-dashboard">{children}</body>
      </html>
    </>
  );
}
