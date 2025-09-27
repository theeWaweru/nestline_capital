// =============================================================================
// 2. components/admin/PlotStats.js - Plot statistics overview
// =============================================================================
export default function PlotStats({ plots }) {
  const stats = {
    total: plots.length,
    available: plots.filter((p) => p.status === "available").length,
    onHold: plots.filter((p) => p.status === "requested").length,
    sold: plots.filter((p) => p.status === "sold").length,
  };

  const averageDaysToSale = plots
    .filter((p) => p.daysToSale)
    .reduce((sum, plot, _, arr) => sum + plot.daysToSale / arr.length, 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Inventory</p>
            <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
          </div>
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            📊
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Available Plots</p>
            <p className="text-2xl font-bold text-green-600">
              {stats.available}
            </p>
          </div>
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            ✅
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">7-Day Hold</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.onHold}</p>
          </div>
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
            ⏳
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Avg Days to Sale</p>
            <p className="text-2xl font-bold text-purple-600">
              {Math.round(averageDaysToSale) || 45} days
            </p>
          </div>
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            📈
          </div>
        </div>
      </div>
    </div>
  );
}
