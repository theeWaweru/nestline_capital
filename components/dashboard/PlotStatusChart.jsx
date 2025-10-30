// components/dashboard/PlotStatusChart.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PlotStatusChart({ data }) {
    if (!data) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Plot Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin w-8 h-8 border-4 border-[#5c8a75] border-t-transparent rounded-full"></div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const statusData = [
        {
            label: "Available",
            value: data.available || 0,
            color: "bg-green-500",
            lightColor: "bg-green-100",
            textColor: "text-green-700",
        },
        {
            label: "Booked",
            value: data.booked || 0,
            color: "bg-blue-500",
            lightColor: "bg-blue-100",
            textColor: "text-blue-700",
        },
        {
            label: "Processing",
            value: data.processing || 0,
            color: "bg-yellow-500",
            lightColor: "bg-yellow-100",
            textColor: "text-yellow-700",
        },
        {
            label: "Draft",
            value: data.draft || 0,
            color: "bg-gray-500",
            lightColor: "bg-gray-100",
            textColor: "text-gray-700",
        },
    ];

    const total = statusData.reduce((sum, item) => sum + item.value, 0);

    if (total === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Plot Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">
                        <p className="text-gray-500">No plots added yet</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Plot Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Simple bar chart */}
                <div className="space-y-4">
                    {statusData.map((item) => {
                        const percentage = total > 0 ? (item.value / total) * 100 : 0;
                        return (
                            <div key={item.label} className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className={`font-medium ${item.textColor}`}>
                                        {item.label}
                                    </span>
                                    <span className="text-gray-600">
                                        {item.value} ({percentage.toFixed(0)}%)
                                    </span>
                                </div>
                                <div className={`w-full h-2 rounded-full ${item.lightColor}`}>
                                    <div
                                        className={`h-2 rounded-full ${item.color} transition-all duration-500`}
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Summary */}
                <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">
                            Total Plots
                        </span>
                        <span className="text-2xl font-bold text-gray-900">{total}</span>
                    </div>
                    {data.visible > 0 && (
                        <div className="mt-2 flex items-center justify-between text-sm">
                            <span className="text-gray-600">Visible to Investors</span>
                            <span className="font-medium text-green-600">{data.visible}</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}