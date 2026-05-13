import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Printer, ClipboardList } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function SessionShow({ session }: { session: any }) {
    return (
        <AppLayout>
            <Head title="Session Details" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('guidance.admin.sessions.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Session Details</h1>
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        session.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>{session.status}</span>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold"><ClipboardList className="mr-2 inline h-5 w-5" />Session Info</h2>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between"><dt className="text-muted-foreground">Student</dt><dd className="font-medium">{session.student?.name ?? session.student_id ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Counselor</dt><dd>{session.counselor?.full_name ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Date</dt><dd>{session.session_date ?? session.created_at ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Type</dt><dd className="capitalize">{session.session_type ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Risk Level</dt><dd className="capitalize">{session.risk_level ?? '—'}</dd></div>
                        </dl>
                    </Card>

                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Actions</h2>
                        <Link href={route('guidance.admin.sessions.print', session.id)}>
                            <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Print Report</Button>
                        </Link>
                    </Card>
                </div>

                {session.notes && (
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Notes</h2>
                        <p className="text-muted-foreground text-sm whitespace-pre-wrap">{session.notes}</p>
                    </Card>
                )}

                {session.recommendations && (
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Recommendations</h2>
                        <p className="text-muted-foreground text-sm whitespace-pre-wrap">{session.recommendations}</p>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}