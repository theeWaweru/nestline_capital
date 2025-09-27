// components/admin/StatsCard.js
"use client";

export default function StatsCard({
  title,
  value,
  icon,
  type = "primary",
  change,
}) {
  return (
    <div className="stat-card">
      <div className={`stat-card-icon ${type}`}>{icon}</div>
      <h3 className="stat-value">{value}</h3>
      <p className="stat-label">{title}</p>
      {change && (
        <div className={`stat-change ${change >= 0 ? "positive" : "negative"}`}>
          {change >= 0 ? "+" : ""}
          {change}% vs last quarter
        </div>
      )}
    </div>
  );
}
