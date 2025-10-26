import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { systemConfig } from '@/routes/super-admin';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Activity,
    AlertTriangle,
    CheckCircle,
    Database,
    Info,
    Mail,
    Server,
    Settings,
    Shield,
    XCircle,
} from 'lucide-react';

interface SystemConfigProps {
    modules: Array<{
        name: string;
        status: 'active' | 'inactive' | 'error';
        version?: string;
        description?: string;
        last_checked?: string;
    }>;
    system: {
        php_version: string;
        laravel_version: string;
        database_connection: string;
        cache_driver: string;
        session_driver: string;
        queue_connection: string;
        mail_driver: string;
        filesystem_disk: string;
    };
    environment: {
        app_name: string;
        app_env: string;
        app_debug: boolean;
        app_url: string;
        timezone: string;
        locale: string;
    };
}

export default function SystemConfig({
    modules,
    system,
    environment,
}: SystemConfigProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Super Admin',
            href: systemConfig.url(),
        },
        {
            title: 'System Config',
            href: '#',
        },
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active':
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'inactive':
                return <XCircle className="h-4 w-4 text-gray-500" />;
            case 'error':
                return <AlertTriangle className="h-4 w-4 text-red-500" />;
            default:
                return <Info className="h-4 w-4 text-blue-500" />;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return (
                    <Badge className="bg-green-100 text-green-800">
                        Active
                    </Badge>
                );
            case 'inactive':
                return <Badge variant="secondary">Inactive</Badge>;
            case 'error':
                return <Badge variant="destructive">Error</Badge>;
            default:
                return <Badge variant="outline">Unknown</Badge>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="System Configuration" />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header */}
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                        System Configuration
                    </h1>
                    <p className="text-muted-foreground">
                        System modules, environment settings, and configuration
                        overview
                    </p>
                </div>

                {/* Modules Status */}
                <Card>
                    <CardHeader>
                        <CardTitle>Module Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {Array.isArray(modules) &&
                                modules.map((module) => (
                                    <div
                                        key={module.name}
                                        className="flex items-center justify-between rounded-lg border p-4"
                                    >
                                        <div className="flex items-center space-x-3">
                                            {getStatusIcon(module.status)}
                                            <div>
                                                <p className="font-medium">
                                                    {module.name}
                                                </p>
                                                {module.version && (
                                                    <p className="text-sm text-muted-foreground">
                                                        v{module.version}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        {getStatusBadge(module.status)}
                                    </div>
                                ))}
                        </div>
                    </CardContent>
                </Card>

                {/* System Information */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Server className="h-5 w-5" />
                                <span>System Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-sm font-medium">
                                    PHP Version
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    {system?.php_version || 'N/A'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium">
                                    Laravel Version
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    {system?.laravel_version || 'N/A'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium">
                                    Database
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    {system?.database_connection || 'N/A'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium">
                                    Cache Driver
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    {system?.cache_driver || 'N/A'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium">
                                    Session Driver
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    {system?.session_driver || 'N/A'}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Settings className="h-5 w-5" />
                                <span>Services Configuration</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-sm font-medium">
                                    Queue Connection
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    {system?.queue_connection || 'N/A'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium">
                                    Mail Driver
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    {system?.mail_driver || 'N/A'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium">
                                    Filesystem Disk
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    {system?.filesystem_disk || 'N/A'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium">
                                    Timezone
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    {environment?.timezone || 'N/A'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium">
                                    Locale
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    {environment?.locale || 'N/A'}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Environment Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Shield className="h-5 w-5" />
                            <span>Environment Settings</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium">
                                        Application Name
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        {environment?.app_name || 'N/A'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium">
                                        Environment
                                    </span>
                                    <Badge
                                        variant={
                                            environment?.app_env ===
                                            'production'
                                                ? 'destructive'
                                                : 'secondary'
                                        }
                                    >
                                        {environment?.app_env || 'N/A'}
                                    </Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium">
                                        Debug Mode
                                    </span>
                                    <Badge
                                        variant={
                                            environment?.app_debug
                                                ? 'destructive'
                                                : 'secondary'
                                        }
                                    >
                                        {environment?.app_debug
                                            ? 'Enabled'
                                            : 'Disabled'}
                                    </Badge>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium">
                                        Application URL
                                    </span>
                                    <span className="max-w-48 truncate text-sm text-muted-foreground">
                                        {environment?.app_url || 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Module Details */}
                <Card>
                    <CardHeader>
                        <CardTitle>Module Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {Array.isArray(modules) &&
                                modules.map((module) => (
                                    <div
                                        key={module.name}
                                        className="rounded-lg border p-4"
                                    >
                                        <div className="mb-2 flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                {getStatusIcon(module.status)}
                                                <h4 className="font-medium">
                                                    {module.name}
                                                </h4>
                                                {module.version && (
                                                    <Badge variant="outline">
                                                        v{module.version}
                                                    </Badge>
                                                )}
                                            </div>
                                            {getStatusBadge(module.status)}
                                        </div>
                                        {module.description && (
                                            <p className="mb-2 text-sm text-muted-foreground">
                                                {module.description}
                                            </p>
                                        )}
                                        {module.last_checked && (
                                            <p className="text-xs text-muted-foreground">
                                                Last checked:{' '}
                                                {new Date(
                                                    module.last_checked,
                                                ).toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm">
                                <Activity className="mr-2 h-4 w-4" />
                                Run System Check
                            </Button>
                            <Button variant="outline" size="sm">
                                <Database className="mr-2 h-4 w-4" />
                                Clear Cache
                            </Button>
                            <Button variant="outline" size="sm">
                                <Mail className="mr-2 h-4 w-4" />
                                Test Mail Configuration
                            </Button>
                            <Button variant="outline" size="sm">
                                <Settings className="mr-2 h-4 w-4" />
                                View Logs
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
