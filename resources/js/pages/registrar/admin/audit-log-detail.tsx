import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft, ClipboardList, User } from 'lucide-react';

interface Props extends PageProps {
    auditLog: {
        id: number; action: string; model_type: string; model_id: string | number | null;
        description: string | null; old_values: any; new_values: any;
        ip_address: string | null; user_agent: string | null;
        created_at: string;
        user: { id: number; name: string; email: string } | null;
    };
}

export default function AuditLogDetail({ auditLog }: Props) {
    return (
        <AppLayout>
            <Head title="Audit Log Detail" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('registrar.admin.audit-logs')}><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
                    <h1 className="text-2xl font-bold flex items-center gap-2"><ClipboardList className="h-6 w-6" /> Audit Log Detail</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-2">
                                <div><span className="text-sm text-muted-foreground">Action</span><p><Badge variant="outline">{auditLog.action}</Badge></p></div>
                                <div><span className="text-sm text-muted-foreground">Date</span><p>{auditLog.created_at}</p></div>
                                <div><span className="text-sm text-muted-foreground">Model</span><p>{auditLog.model_type?.split('\\').pop()}</p></div>
                                <div><span className="text-sm text-muted-foreground">Model ID</span><p>{auditLog.model_id ?? '-'}</p></div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle><User className="inline h-4 w-4 mr-2" />User</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                            <p><span className="text-muted-foreground">Name:</span> {auditLog.user?.name ?? 'System'}</p>
                            <p><span className="text-muted-foreground">Email:</span> {auditLog.user?.email ?? '-'}</p>
                            <p><span className="text-muted-foreground">IP:</span> <code className="text-sm">{auditLog.ip_address ?? '-'}</code></p>
                            {auditLog.user_agent && <p className="text-xs text-muted-foreground truncate">{auditLog.user_agent}</p>}
                        </CardContent>
                    </Card>

                    {auditLog.description && (
                        <Card>
                            <CardHeader><CardTitle>Description</CardTitle></CardHeader>
                            <CardContent><p>{auditLog.description}</p></CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}