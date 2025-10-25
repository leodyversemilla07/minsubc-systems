import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    User,
    Database,
    FileText,
    Code,
    Clock,
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

interface AuditLog {
    id: number;
    action: string;
    description: string;
    model_type: string | null;
    model_id: number | null;
    user_id: number | null;
    old_values: Record<string, unknown> | null;
    new_values: Record<string, unknown> | null;
    metadata: Record<string, unknown> | null;
    ip_address: string | null;
    user_agent: string | null;
    created_at: string;
    updated_at: string;
    user?: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
    };
}

interface AuditLogDetailProps {
    auditLog: AuditLog;
}

export default function AuditLogDetail({ auditLog }: AuditLogDetailProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Super Admin',
            href: '/super-admin/dashboard',
        },
        {
            title: 'Audit Logs',
            href: '/super-admin/audit-logs',
        },
        {
            title: `Log #${auditLog.id}`,
            href: '#',
        },
    ];

    const getActionBadgeVariant = (action: string) => {
        const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
            'created': 'default',
            'updated': 'secondary',
            'deleted': 'destructive',
            'login': 'outline',
            'logout': 'outline',
        };
        return variants[action] || 'outline';
    };

    const formatModelType = (modelType: string | null) => {
        if (!modelType) return '-';
        return modelType.split('\\').pop()?.replace(/([A-Z])/g, ' $1').trim() || modelType;
    };

    const formatJson = (data: Record<string, unknown> | null) => {
        if (!data) return null;
        return JSON.stringify(data, null, 2);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Audit Log #${auditLog.id}`} />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header */}
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Audit Log Details
                    </h1>
                    <p className="text-muted-foreground">
                        Log ID: {auditLog.id}
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <FileText className="h-5 w-5" />
                                <span>Basic Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Action</label>
                                <div className="mt-1">
                                    <Badge variant={getActionBadgeVariant(auditLog.action)}>
                                        {auditLog.action}
                                    </Badge>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Description</label>
                                <p className="mt-1 text-sm">{auditLog.description}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Timestamp</label>
                                <div className="mt-1 flex items-center space-x-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">
                                        {new Date(auditLog.created_at).toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {auditLog.ip_address && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">IP Address</label>
                                    <p className="mt-1 text-sm font-mono">{auditLog.ip_address}</p>
                                </div>
                            )}

                            {auditLog.user_agent && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">User Agent</label>
                                    <p className="mt-1 text-sm break-all">{auditLog.user_agent}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* User Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <User className="h-5 w-5" />
                                <span>User Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {auditLog.user ? (
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Name</label>
                                        <p className="mt-1 font-medium">
                                            {auditLog.user.first_name} {auditLog.user.last_name}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                                        <p className="mt-1 text-sm">{auditLog.user.email}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">User ID</label>
                                        <p className="mt-1 text-sm font-mono">{auditLog.user.id}</p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-muted-foreground">System action (no user)</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Model Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Database className="h-5 w-5" />
                                <span>Model Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {auditLog.model_type ? (
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Model Type</label>
                                        <p className="mt-1 font-medium">
                                            {formatModelType(auditLog.model_type)}
                                        </p>
                                    </div>
                                    {auditLog.model_id && (
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Model ID</label>
                                            <p className="mt-1 text-sm font-mono">{auditLog.model_id}</p>
                                        </div>
                                    )}
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Full Model Type</label>
                                        <p className="mt-1 text-sm font-mono break-all">{auditLog.model_type}</p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-muted-foreground">No model associated</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Metadata */}
                    {auditLog.metadata && Object.keys(auditLog.metadata).length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Code className="h-5 w-5" />
                                    <span>Additional Metadata</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto">
                                    {formatJson(auditLog.metadata)}
                                </pre>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Changes */}
                {(auditLog.old_values || auditLog.new_values) && (
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Old Values */}
                        {auditLog.old_values && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-red-600">Old Values</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <pre className="text-xs bg-red-50 dark:bg-red-950 p-3 rounded-md overflow-x-auto">
                                        {formatJson(auditLog.old_values)}
                                    </pre>
                                </CardContent>
                            </Card>
                        )}

                        {/* New Values */}
                        {auditLog.new_values && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-green-600">New Values</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <pre className="text-xs bg-green-50 dark:bg-green-950 p-3 rounded-md overflow-x-auto">
                                        {formatJson(auditLog.new_values)}
                                    </pre>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}