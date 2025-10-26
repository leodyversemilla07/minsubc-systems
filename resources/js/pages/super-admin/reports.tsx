import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { reports } from '@/routes/super-admin';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Activity,
    Calendar,
    Database,
    Settings,
    Shield,
    TrendingUp,
    UserCheck,
    Users,
} from 'lucide-react';

interface ReportsProps {
    userStats: {
        total_users: number;
        verified_users: number;
        unverified_users: number;
        users_with_2fa: number;
        new_users_30d: number;
        new_users_7d: number;
    };
    roleStats: Array<{
        name: string;
        count: number;
    }>;
    auditStats: {
        total_logs: number;
        logs_30d: number;
        logs_7d: number;
        top_actions: Array<{
            action: string;
            count: number;
        }>;
    };
    settingsStats: {
        total_settings: number;
        recently_updated: number;
    };
}

export default function Reports({
    userStats,
    roleStats,
    auditStats,
    settingsStats,
}: ReportsProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Super Admin',
            href: reports.url(),
        },
        {
            title: 'Reports',
            href: '#',
        },
    ];

    const userVerificationRate =
        userStats.total_users > 0
            ? (userStats.verified_users / userStats.total_users) * 100
            : 0;

    const twoFactorRate =
        userStats.total_users > 0
            ? (userStats.users_with_2fa / userStats.total_users) * 100
            : 0;

    const totalRoles = roleStats.reduce((sum, role) => sum + role.count, 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="System Reports" />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header */}
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                        System Reports
                    </h1>
                    <p className="text-muted-foreground">
                        Comprehensive analytics and system statistics
                    </p>
                </div>

                {/* User Statistics */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Users
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {userStats.total_users.toLocaleString()}
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                <TrendingUp className="h-3 w-3" />
                                <span>
                                    +{userStats.new_users_30d} in last 30 days
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                User Verification
                            </CardTitle>
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {userVerificationRate.toFixed(1)}%
                            </div>
                            <Progress
                                value={userVerificationRate}
                                className="mt-2"
                            />
                            <p className="mt-2 text-xs text-muted-foreground">
                                {userStats.verified_users} of{' '}
                                {userStats.total_users} verified
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Two-Factor Auth
                            </CardTitle>
                            <Shield className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {twoFactorRate.toFixed(1)}%
                            </div>
                            <Progress value={twoFactorRate} className="mt-2" />
                            <p className="mt-2 text-xs text-muted-foreground">
                                {userStats.users_with_2fa} users enabled
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Role Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Role Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {roleStats.map((role) => {
                                const percentage =
                                    totalRoles > 0
                                        ? (role.count / totalRoles) * 100
                                        : 0;
                                return (
                                    <div
                                        key={role.name}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <Badge variant="outline">
                                                {role.name}
                                            </Badge>
                                            <span className="text-sm text-muted-foreground">
                                                {role.count} users
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Progress
                                                value={percentage}
                                                className="w-24"
                                            />
                                            <span className="w-12 text-right text-sm font-medium">
                                                {percentage.toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Audit Statistics */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Audit Activity</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Activity className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">Total Logs</span>
                                </div>
                                <span className="font-bold">
                                    {auditStats.total_logs.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">
                                        Last 30 Days
                                    </span>
                                </div>
                                <span className="font-bold">
                                    {auditStats.logs_30d.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">Last 7 Days</span>
                                </div>
                                <span className="font-bold">
                                    {auditStats.logs_7d.toLocaleString()}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Top Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {auditStats.top_actions
                                    .slice(0, 5)
                                    .map((action, index) => (
                                        <div
                                            key={action.action}
                                            className="flex items-center justify-between"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <Badge
                                                    variant="secondary"
                                                    className="text-xs"
                                                >
                                                    {index + 1}
                                                </Badge>
                                                <span className="text-sm capitalize">
                                                    {action.action}
                                                </span>
                                            </div>
                                            <span className="font-medium">
                                                {action.count}
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* System Settings Overview */}
                <Card>
                    <CardHeader>
                        <CardTitle>System Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="flex items-center space-x-3">
                                    <Settings className="h-8 w-8 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">
                                            Total Settings
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            System configuration items
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold">
                                        {settingsStats.total_settings}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="flex items-center space-x-3">
                                    <Database className="h-8 w-8 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">
                                            Recently Updated
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Last 7 days
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold">
                                        {settingsStats.recently_updated}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle>Activity Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="rounded-lg border p-4 text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {userStats.new_users_7d}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    New users this week
                                </p>
                            </div>
                            <div className="rounded-lg border p-4 text-center">
                                <div className="text-2xl font-bold text-blue-600">
                                    {auditStats.logs_7d}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Audit logs this week
                                </p>
                            </div>
                            <div className="rounded-lg border p-4 text-center">
                                <div className="text-2xl font-bold text-orange-600">
                                    {settingsStats.recently_updated}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Settings updated this week
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
