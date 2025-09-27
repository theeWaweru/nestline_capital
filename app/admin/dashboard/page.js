// app/admin/dashboard/page.js
"use client";

import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");

  // Data states
  const [projects, setProjects] = useState([]);
  const [plots, setPlots] = useState([]);
  const [quoteRequests, setQuoteRequests] = useState([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalPlots: 0,
    totalQuotes: 0,
    pendingQuotes: 0,
    revenuePotential: 0,
  });

  // Loading states
  const [loading, setLoading] = useState({
    projects: true,
    plots: true,
    quotes: true,
    stats: true,
  });

  // Error states
  const [errors, setErrors] = useState({});

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: "📊" },
    { key: "projects", label: "Projects", icon: "🏢" },
    { key: "plots", label: "Plot Management", icon: "📍" },
    { key: "quotes", label: "Quote Requests", icon: "💬" },
    { key: "users", label: "Users", icon: "👥" },
    { key: "settings", label: "Settings", icon: "⚙️" },
  ];

  // API calls
  const fetchProjects = async () => {
    try {
      setLoading((prev) => ({ ...prev, projects: true }));
      const response = await fetch("/api/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data);
      setErrors((prev) => ({ ...prev, projects: null }));
    } catch (error) {
      console.error("Error fetching projects:", error);
      setErrors((prev) => ({ ...prev, projects: error.message }));
    } finally {
      setLoading((prev) => ({ ...prev, projects: false }));
    }
  };

  const fetchPlots = async (projectId = "") => {
    try {
      setLoading((prev) => ({ ...prev, plots: true }));
      const url = projectId
        ? `/api/plots?projectId=${projectId}`
        : "/api/plots";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch plots");
      const data = await response.json();
      setPlots(data);
      setErrors((prev) => ({ ...prev, plots: null }));
    } catch (error) {
      console.error("Error fetching plots:", error);
      setErrors((prev) => ({ ...prev, plots: error.message }));
    } finally {
      setLoading((prev) => ({ ...prev, plots: false }));
    }
  };

  const fetchQuoteRequests = async () => {
    try {
      setLoading((prev) => ({ ...prev, quotes: true }));
      const response = await fetch("/api/quotes");
      if (!response.ok) throw new Error("Failed to fetch quote requests");
      const data = await response.json();
      setQuoteRequests(data);
      setErrors((prev) => ({ ...prev, quotes: null }));
    } catch (error) {
      console.error("Error fetching quotes:", error);
      setErrors((prev) => ({ ...prev, quotes: error.message }));
    } finally {
      setLoading((prev) => ({ ...prev, quotes: false }));
    }
  };

  const calculateStats = () => {
    const totalProjects = projects.length;
    const totalPlots = plots.length;
    const totalQuotes = quoteRequests.length;
    const pendingQuotes = quoteRequests.filter(
      (q) => q.status === "pending_verification"
    ).length;
    const revenuePotential = plots
      .filter((p) => p.status === "available")
      .reduce((sum, plot) => sum + (plot.price || 0), 0);

    setStats({
      totalProjects,
      totalPlots,
      totalQuotes,
      pendingQuotes,
      revenuePotential,
    });
  };

  const confirmQuoteRequest = async (quoteId) => {
    try {
      const response = await fetch(`/api/quotes/${quoteId}/confirm`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to confirm quote");

      // Refresh data
      await fetchQuoteRequests();
      await fetchPlots();
      alert("Quote request confirmed successfully!");
    } catch (error) {
      console.error("Error confirming quote:", error);
      alert("Failed to confirm quote request");
    }
  };

  const rejectQuoteRequest = async (quoteId) => {
    try {
      const response = await fetch(`/api/quotes/${quoteId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to reject quote");

      // Refresh data
      await fetchQuoteRequests();
      await fetchPlots();
      alert("Quote request rejected successfully!");
    } catch (error) {
      console.error("Error rejecting quote:", error);
      alert("Failed to reject quote request");
    }
  };

  // Effects
  useEffect(() => {
    fetchProjects();
    fetchQuoteRequests();
    fetchPlots();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [projects, plots, quoteRequests]);

  useEffect(() => {
    if (selectedProject) {
      fetchPlots(selectedProject);
    } else {
      fetchPlots();
    }
  }, [selectedProject]);

  const getStatusColor = (status) => {
    const colors = {
      available: "var(--success-500)",
      requested: "var(--warning-500)",
      confirmed: "var(--sage-500)",
      sold: "var(--error-500)",
      planning: "var(--text-muted)",
      ready: "var(--success-500)",
      verified: "var(--success-500)",
      pending_verification: "var(--warning-500)",
      expired: "var(--error-500)",
    };
    return colors[status] || "var(--text-muted)";
  };

  const formatPrice = (price) => {
    return `KSh ${price.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Component definitions using CSS classes instead of inline styles
  const StatusChip = ({ status, label }) => (
    <span
      className={`status-${status}`}
      style={{
        display: "inline-block",
        backgroundColor: getStatusColor(status),
        color: "white",
        padding: "4px 12px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "500",
        fontFamily: "var(--font-primary)",
      }}
    >
      {label || status.replace("_", " ")}
    </span>
  );

  const LoadingSpinner = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div className="loading-spinner"></div>
    </div>
  );

  const EmptyState = ({ title, message, actionLabel, onAction }) => (
    <div
      style={{
        textAlign: "center",
        padding: "60px 20px",
        color: "var(--text-muted)",
      }}
    >
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>📋</div>
      <h3
        style={{
          fontSize: "18px",
          marginBottom: "8px",
          color: "var(--text-secondary)",
          fontFamily: "var(--font-primary)",
          fontWeight: "600",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "14px",
          marginBottom: "24px",
          fontFamily: "var(--font-primary)",
        }}
      >
        {message}
      </p>
      {actionLabel && onAction && (
        <button className="admin-button-primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );

  const ErrorState = ({ message, onRetry }) => (
    <div
      style={{
        textAlign: "center",
        padding: "40px 20px",
        color: "var(--error-500)",
      }}
    >
      <div style={{ fontSize: "32px", marginBottom: "16px" }}>⚠️</div>
      <p style={{ fontSize: "14px", marginBottom: "16px" }}>{message}</p>
      {onRetry && (
        <button className="admin-button-secondary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );

  const renderDashboard = () => (
    <div>
      <h2
        style={{
          marginBottom: "24px",
          color: "var(--text-primary)",
          fontFamily: "var(--font-geist-sans)",
          fontWeight: "600",
          fontSize: "32px",
        }}
      >
        Dashboard Overview
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        <div className="admin-card" style={{ padding: "20px" }}>
          <div
            style={{
              color: "var(--text-secondary)",
              fontSize: "14px",
              marginBottom: "8px",
            }}
          >
            Total Projects
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "var(--sage-600)",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            {stats.totalProjects}
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            {projects.filter((p) => p.status === "ready").length} Active,{" "}
            {projects.filter((p) => p.status === "planning").length} Planning
          </div>
        </div>

        <div className="admin-card" style={{ padding: "20px" }}>
          <div
            style={{
              color: "var(--text-secondary)",
              fontSize: "14px",
              marginBottom: "8px",
            }}
          >
            Total Plots
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "var(--success-500)",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            {stats.totalPlots}
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            {plots.filter((p) => p.status === "available").length} Available for
            sale
          </div>
        </div>

        <div className="admin-card" style={{ padding: "20px" }}>
          <div
            style={{
              color: "var(--text-secondary)",
              fontSize: "14px",
              marginBottom: "8px",
            }}
          >
            Quote Requests
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "var(--warning-500)",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            {stats.totalQuotes}
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            {stats.pendingQuotes} Pending verification
          </div>
        </div>

        <div className="admin-card" style={{ padding: "20px" }}>
          <div
            style={{
              color: "var(--text-secondary)",
              fontSize: "14px",
              marginBottom: "8px",
            }}
          >
            Revenue Potential
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "var(--sage-700)",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            {stats.revenuePotential > 0
              ? Math.round(stats.revenuePotential / 1000000) + "M"
              : "0"}
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            From available plots
          </div>
        </div>
      </div>

      <div className="admin-card" style={{ padding: "20px" }}>
        <h3
          style={{
            marginBottom: "20px",
            color: "var(--text-primary)",
            fontFamily: "var(--font-geist-sans)",
            fontWeight: "600",
          }}
        >
          Recent Quote Requests
        </h3>

        {loading.quotes ? (
          <LoadingSpinner />
        ) : errors.quotes ? (
          <ErrorState message={errors.quotes} onRetry={fetchQuoteRequests} />
        ) : quoteRequests.length === 0 ? (
          <EmptyState
            title="No Quote Requests"
            message="No quote requests have been submitted yet. They will appear here once customers start requesting quotes."
          />
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Plots</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {quoteRequests.slice(0, 5).map((request) => (
                  <tr key={request._id}>
                    <td>{request.customerName}</td>
                    <td>{request.email}</td>
                    <td>{request.plotIds?.length || 0} plots</td>
                    <td>{formatPrice(request.totalPrice)}</td>
                    <td>
                      <StatusChip status={request.status} />
                    </td>
                    <td>{formatDate(request.createdAt)}</td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          className="admin-button-primary"
                          style={{ fontSize: "12px", padding: "6px 12px" }}
                          onClick={() => confirmQuoteRequest(request._id)}
                          disabled={request.status !== "verified"}
                        >
                          Confirm
                        </button>
                        <button
                          className="admin-button-secondary"
                          style={{ fontSize: "12px", padding: "4px 10px" }}
                          onClick={() => rejectQuoteRequest(request._id)}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return renderDashboard();
      case "projects":
        return (
          <EmptyState
            title="Projects"
            message="Project management will be implemented here."
          />
        );
      case "plots":
        return (
          <EmptyState
            title="Plots"
            message="Plot management will be implemented here."
          />
        );
      case "quotes":
        return (
          <EmptyState
            title="Quote Requests"
            message="Quote request management will be implemented here."
          />
        );
      case "users":
        return (
          <EmptyState
            title="Users"
            message="User management will be implemented here."
          />
        );
      case "settings":
        return (
          <EmptyState
            title="Settings"
            message="Settings will be implemented here."
          />
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div
      className="admin-dashboard"
      style={{ display: "flex", minHeight: "100vh" }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "280px",
          backgroundColor: "var(--sage-600)",
          color: "var(--text-on-dark)",
          position: "fixed",
          height: "100vh",
          left: mobileMenuOpen
            ? "0"
            : typeof window !== "undefined" && window.innerWidth < 768
            ? "-280px"
            : "0",
          transition: "left 0.3s ease",
          zIndex: 1000,
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <div
          style={{
            padding: "20px",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            backgroundColor: "var(--sage-700)",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "24px",
              fontFamily: "var(--font-geist-sans)",
              fontWeight: "600",
              color: "var(--text-on-dark)",
            }}
          >
            Nestline Admin
          </h2>
        </div>

        <div style={{ padding: "20px 0" }}>
          {menuItems.map((item) => (
            <div
              key={item.key}
              onClick={() => {
                setCurrentView(item.key);
                setMobileMenuOpen(false);
              }}
              style={{
                padding: "12px 20px",
                cursor: "pointer",
                backgroundColor:
                  currentView === item.key ? "var(--sage-500)" : "transparent",
                borderLeft:
                  currentView === item.key
                    ? "4px solid var(--text-on-dark)"
                    : "4px solid transparent",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "14px",
                fontFamily: "var(--font-geist-sans)",
                fontWeight: currentView === item.key ? "500" : "400",
                color: "var(--text-on-dark)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (currentView !== item.key) {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (currentView !== item.key) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              <span style={{ fontSize: "18px" }}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <div
        style={{
          marginLeft:
            typeof window !== "undefined" && window.innerWidth < 768
              ? "0"
              : "280px",
          width:
            typeof window !== "undefined" && window.innerWidth < 768
              ? "100%"
              : "calc(100% - 280px)",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "var(--background-card)",
            padding: "16px 24px",
            boxShadow: "var(--shadow-sm)",
            borderBottom: "1px solid var(--border-light)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {typeof window !== "undefined" && window.innerWidth < 768 && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  padding: "8px",
                  border: "none",
                  backgroundColor: "transparent",
                  fontSize: "18px",
                  cursor: "pointer",
                  color: "var(--text-primary)",
                }}
              >
                ☰
              </button>
            )}
            <h1
              style={{
                margin: 0,
                fontSize: "24px",
                fontFamily: "var(--font-geist-sans)",
                color: "var(--text-primary)",
                fontWeight: "600",
              }}
            >
              Nestline Capital - Admin Dashboard
            </h1>
          </div>
          <div
            style={{
              fontSize: "14px",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            Welcome, Admin
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "24px" }}>{renderContent()}</div>
      </div>
    </div>
  );
}
