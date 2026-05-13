import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ClipboardList, Clock } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StudentProfile({ student, sessions }: { student: any; sessions: any[] }) {
    return (
        <AppLayout>
            <Head title={student?.name ?? 'Student Profile'} />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('guidance.counselor.students')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">{student?.name ?? 'Student Profile'}</h1>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Student Info</h2>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between"><dt className="text-muted-foreground">ID</dt><dd className="font-mono">{student?.student_id ?? student?.id}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Name</dt><dd>{student?.name}</dd></div>
                            {student?.email && <div className="flex justify-between"><dt className="text-muted-foreground">Email</dt><dd>{student.email}</dd></div>}
                            <div className="flex justify-between"><dt className="text-muted-foreground">Sessions</dt><dd>{sessions?.length ?? 0}</dd></div>
                        </dl>
                    </Card>

                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold"><ClipboardList className="mr-2 inline h-5 w-5" />Session History</h2>
                        {sessions?.length ? (
                            <ul className="space-y-2 text-sm">
                                {sessions.map((s: any) => (
                                    <li key={s.id} className="flex items-center justify-between rounded border p-2">
                                        <div>
                                            <p className="font-medium capitalize">{s.session_type ?? 'Session'}</p>
                                            <p className="text-muted-foreground text-xs">{s.session_date ?? s.created_at}</p>
                                        </div>
                                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                            s.risk_level === 'critical' ? 'bg-red-100 text-red-800' :
                                            s.risk_level === 'high' ? 'bg-orange-100 text-orange-800' :
                                            s.risk_level === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-green-100 text-green-800'
                                        }`}>{s.risk_level}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : <p className="text-muted-foreground text-sm">No session history.</p>}
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}