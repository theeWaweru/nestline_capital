// =============================================================================
// 5. components/admin/StatsCard.js - Statistics display card
// =============================================================================
export default function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  color = "sage",
}) {
  const colorClasses = {
    sage: "text-sage-600",
    success: "text-success-600",
    warning: "text-warning-600",
    error: "text-error-600",
  };

  return (
    <div className="stat-card">
      <div className="stat-header">
        <div className="stat-icon">{icon}</div>
        {trend && trendValue && (
          <div className={`stat-trend ${trend}`}>
            <span>{trend === "positive" ? "↗" : "↘"}</span>
            {trendValue}
          </div>
        )}
      </div>

      <div className="stat-label">{title}</div>
      <div className={`stat-value ${colorClasses[color]}`}>{value}</div>
      <div className="stat-description">{description}</div>
    </div>
  );
}
