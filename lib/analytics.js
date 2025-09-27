// lib/analytics.js - Dashboard calculations
export async function calculateDashboardStats() {
  const Project = (await import("./models/Project.js")).default;
  const Plot = (await import("./models/Plot.js")).default;
  const QuoteRequest = (await import("./models/QuoteRequest.js")).default;

  // Get all data
  const [projects, plots, quotes] = await Promise.all([
    Project.find({}),
    Plot.find({}),
    QuoteRequest.find({}),
  ]);

  // Calculate portfolio metrics
  const totalPortfolioValue = plots.reduce((sum, plot) => sum + plot.price, 0);
  const soldPlots = plots.filter((p) => p.status === "sold");
  const monthlyRevenue = soldPlots
    .filter((plot) => {
      const soldDate = new Date(plot.soldDate);
      const currentMonth = new Date();
      return (
        soldDate.getMonth() === currentMonth.getMonth() &&
        soldDate.getFullYear() === currentMonth.getFullYear()
      );
    })
    .reduce((sum, plot) => sum + plot.price, 0);

  // Calculate conversion rate
  const totalInquiries = quotes.length;
  const confirmedSales = quotes.filter((q) => q.status === "confirmed").length;
  const conversionRate =
    totalInquiries > 0 ? (confirmedSales / totalInquiries) * 100 : 0;

  // Calculate average days to sale
  const plotsWithSaleData = soldPlots.filter((p) => p.daysToSale);
  const averageDaysToSale =
    plotsWithSaleData.length > 0
      ? plotsWithSaleData.reduce((sum, plot) => sum + plot.daysToSale, 0) /
        plotsWithSaleData.length
      : 0;

  return {
    totalProjects: projects.length,
    activeProjects: projects.filter((p) => p.status === "ready").length,
    planningProjects: projects.filter((p) => p.status === "planning").length,
    totalPlots: plots.length,
    availablePlots: plots.filter((p) => p.status === "available").length,
    plotsOnHold: plots.filter((p) => p.status === "requested").length,
    soldPlots: soldPlots.length,
    totalQuotes: quotes.length,
    pendingQuotes: quotes.filter((q) => q.status === "pending_verification")
      .length,
    verifiedQuotes: quotes.filter((q) => q.status === "verified").length,
    totalPortfolioValue,
    monthlyRevenue,
    conversionRate: Math.round(conversionRate * 10) / 10,
    averageDaysToSale: Math.round(averageDaysToSale),
  };
}

export async function calculateProjectPerformance() {
  const Project = (await import("./models/Project.js")).default;
  const Plot = (await import("./models/Plot.js")).default;

  const projects = await Project.find({});
  const projectPerformance = [];

  for (const project of projects) {
    const plots = await Plot.find({ projectId: project._id });
    const soldPlots = plots.filter((p) => p.status === "sold");
    const revenue = soldPlots.reduce((sum, plot) => sum + plot.price, 0);
    const completionRate =
      plots.length > 0 ? (soldPlots.length / plots.length) * 100 : 0;

    projectPerformance.push({
      _id: project._id,
      name: project.name,
      location: project.location,
      totalPlots: plots.length,
      soldPlots: soldPlots.length,
      availablePlots: plots.filter((p) => p.status === "available").length,
      revenue,
      completionRate: Math.round(completionRate),
      status: project.status,
      expectedCompletion: project.expectedCompletion,
    });
  }

  return projectPerformance;
}
