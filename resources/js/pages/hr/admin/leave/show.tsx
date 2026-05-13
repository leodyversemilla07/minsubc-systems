import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CalendarCheck } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function LeaveShow({ leaveRequest }: { leaveRequest: any }) {
    return (
        <AppLayout>
            <Head title="Leave Request" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('hr.admin.leave.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold"><CalendarCheck className="mr-2 inline h-6 w-6" />Leave Request</h1>
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${leaveRequest.status === 'approved' ? 'bg-green-100 text-green-800' : leaveRequest.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{leaveRequest.status}</span>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Details</h2>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between"><dt className="text-muted-foreground">Employee</dt><dd className="font-medium">{leaveRequest.employee?.first_name} {leaveRequest.employee?.last_name}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Type</dt><dd className="capitalize">{leaveRequest.leave_type?.name ?? leaveRequest.type ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Start Date</dt><dd>{leaveRequest.start_date}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">End Date</dt><dd>{leaveRequest.end_date ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Total Days</dt><dd>{leaveRequest.total_days ?? '—'}</dd></div>
                        </dl>
                    </Card>

                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Actions</h2>
                        <div className="flex gap-2">
                            {leaveRequest.status === 'pending' && (
                                <>
                                    <Link as="button" method="post" href={route('hr.admin.leave.approve', leaveRequest.id)}>
                                        <Button className="bg-green-600 hover:bg-green-700">Approve</Button>
                                    </Link>
                                    <Link as="button" method="post" href={route('hr.admin.leave.reject', leaveRequest.id)}>
                                        <Button variant="outline" className="text-red-600">Reject</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </Card>
                </div>

                {leaveRequest.reason && (
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Reason</h2>
                        <p className="text-muted-foreground text-sm whitespace-pre-wrap">{leaveRequest.reason}</p>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}