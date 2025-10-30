// components/dashboard/ActivityFeed.jsx
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    FolderPlus,
    MapPin,
    UserPlus,
    CheckCircle,
    XCircle,
    Clock,
} from "lucide-react";

const iconMap = {
    project: FolderPlus,
    plot: MapPin,
    investor: UserPlus,
    booking: CheckCircle,
    payment: CheckCircle,
};

const colorMap = {
    project: "text-blue-600 bg-blue-100",
    plot: "text-green-600 bg-green-100",
    investor: "text-purple-600 bg-purple-100",
    booking: "text-yellow-600 bg-yellow-100",
    payment: "text-green-600 bg-green-100",
};

const actionLabels = {
    created: "Created",
    updated: "Updated",
    registered: "Registered",
    verified: "Verified",
    rejected: "Rejected",
    submitted: "Submitted",
};

export default function ActivityFeed({ activities, loading }) {
    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const then = new Date(timestamp);
        const diffInSeconds = Math.floor((now - then) / 1000);

        if (diffInSeconds < 60) return "Just now";
        if (diffInSeconds < 3600)
            return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400)
            return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        if (diffInSeconds < 604800)
            return `${Math.floor(diffInSeconds / 86400)} days ago`;
        return then.toLocaleDateString();
    };

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin w-8 h-8 border-4 border-[#5c8a75] border-t-transparent rounded-full"></div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!activities || activities.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">
                        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500">No recent activity</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity) => {
                        const Icon = iconMap[activity.type] || FolderPlus;
                        const colorClass = colorMap[activity.type] || "text-gray-600 bg-gray-100";

                        return (
                            <Link
                                key={activity.id}
                                href={activity.link}
                                className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className={`rounded-lg p-2 ${colorClass}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900 truncate">
                                                {activity.title}
                                            </p>
                                            <p className="text-sm text-gray-600 truncate">
                                                {actionLabels[activity.action] || activity.action} •{" "}
                                                {activity.description}
                                            </p>
                                        </div>
                                        <span className="text-xs text-gray-500 whitespace-nowrap">
                                            {getTimeAgo(activity.timestamp)}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">by {activity.user}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}