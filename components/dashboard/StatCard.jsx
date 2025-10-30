// components/dashboard/StatCard.jsx
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

export default function StatCard({
    title,
    value,
    icon: Icon,
    change,
    changeLabel,
    description,
    color = "blue",
    onClick,
}) {
    const colorClasses = {
        blue: "bg-blue-100 text-blue-600",
        green: "bg-green-100 text-green-600",
        yellow: "bg-yellow-100 text-yellow-600",
        purple: "bg-purple-100 text-purple-600",
        red: "bg-red-100 text-red-600",
    };

    const getTrendIcon = () => {
        if (!change || change === 0) return <Minus className="w-4 h-4" />;
        return change > 0 ? (
            <ArrowUpRight className="w-4 h-4" />
        ) : (
            <ArrowDownRight className="w-4 h-4" />
        );
    };

    const getTrendColor = () => {
        if (!change || change === 0) return "text-gray-500";
        return change > 0 ? "text-green-600" : "text-red-600";
    };

    return (
        <Card
            className={`hover:shadow-lg transition-shadow ${onClick ? "cursor-pointer" : ""
                }`}
            onClick={onClick}
        >
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600">{title}</p>
                        <div className="mt-2 flex items-baseline gap-2">
                            <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
                            {change !== undefined && change !== null && (
                                <div className={`flex items-center gap-1 ${getTrendColor()}`}>
                                    {getTrendIcon()}
                                    <span className="text-sm font-medium">
                                        {Math.abs(change)}%
                                    </span>
                                </div>
                            )}
                        </div>
                        {description && (
                            <p className="mt-1 text-sm text-gray-500">{description}</p>
                        )}
                        {changeLabel && (
                            <p className="mt-1 text-xs text-gray-500">{changeLabel}</p>
                        )}
                    </div>
                    {Icon && (
                        <div className={`rounded-lg p-3 ${colorClasses[color]}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}