import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Users,
    Shield,
    Activity,
    Settings,
    BarChart3,
    Database,
    TrendingUp,
    UserCheck,
    Eye,
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { users, systemSettings, auditLogs, reports, systemConfig } from '@/routes/super-admin';

interface DashboardProps {
    stats: {
        total_users: number;
        active_users: number;
        total_roles: number;
        system_admins: number;
        total_audit_logs: number;
        recent_audit_logs: number;
        system_settings_count: number;
    };
    recentAuditLogs: Array<{
        id: number;
        action: string;
        description: string;
        user: {
            first_name: string;
            last_name: string;
            email: string;
        } | null;
        created_at: string;
    }>;
    userActivity: {
        new_users: number;
        active_users_30d: number;
        login_attempts: number;
    };
}

export default function Dashboard({ stats, recentAuditLogs, userActivity }: DashboardProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Super Admin Dashboard',
            href: '#',
        },
    ];

    const quickActions = [
        {
            title: 'User Management',
            description: 'Manage users, roles, and permissions',
            href: users.url(),
            icon: Users,
            color: 'text-blue-600',
        },
        {
            title: 'System Settings',
            description: 'Configure global system parameters',
            href: systemSettings.url(),
            icon: Settings,
            color: 'text-green-600',
        },
        {
            title: 'Audit Logs',
            description: 'View system activity and changes',
            href: auditLogs.url(),
            icon: Activity,
            color: 'text-orange-600',
        },
        {
            title: 'Reports',
            description: 'Generate system-wide analytics',
            href: reports.url(),
            icon: BarChart3,
            color: 'text-purple-600',
        },
        {
            title: 'System Config',
            description: 'Manage modules and features',
            href: systemConfig.url(),
            icon: Database,
            color: 'text-red-600',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Super Admin Dashboard" />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header */}
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Super Admin Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Complete system oversight and administration
                    </p>
                </div>

                {/* System Overview Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_users}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.active_users} active users
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">System Admins</CardTitle>
                            <Shield className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.system_admins}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.total_roles} total roles
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Audit Logs</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_audit_logs}</div>
                            <p className="text-xs text-muted-foreground">
                                +{stats.recent_audit_logs} this week
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">System Settings</CardTitle>
                            <Settings className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.system_settings_count}</div>
                            <p className="text-xs text-muted-foreground">
                                Configuration items
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* User Activity Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">New Users (30d)</CardTitle>
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{userActivity.new_users}</div>
                            <p className="text-xs text-muted-foreground">
                                Recent registrations
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Users (30d)</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{userActivity.active_users_30d}</div>
                            <p className="text-xs text-muted-foreground">
                                Users with recent activity
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Login Attempts (30d)</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{userActivity.login_attempts}</div>
                            <p className="text-xs text-muted-foreground">
                                Authentication events
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {quickActions.map((action) => (
                                <Link key={action.title} href={action.href}>
                                    <Card className="cursor-pointer transition-colors hover:bg-muted/50">
                                        <CardContent className="flex items-center space-x-4 p-4">
                                            <action.icon className={`h-8 w-8 ${action.color}`} />
                                            <div>
                                                <h3 className="font-medium">{action.title}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {action.description}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Audit Logs */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Recent Activity</CardTitle>
                        <Link href={auditLogs.url()}>
                            <Button variant="outline" size="sm">
                                View All
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentAuditLogs.length === 0 ? (
                                <p className="text-center text-muted-foreground py-4">
                                    No recent activity
                                </p>
                            ) : (
                                recentAuditLogs.map((log) => (
                                    <div key={log.id} className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <Activity className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">
                                                {log.description}
                                            </p>
                                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                                <span>{log.action}</span>
                                                {log.user && (
                                                    <>
                                                        <span>•</span>
                                                        <span>{log.user.first_name} {log.user.last_name}</span>
                                                    </>
                                                )}
                                                <span>•</span>
                                                <span>{new Date(log.created_at).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}