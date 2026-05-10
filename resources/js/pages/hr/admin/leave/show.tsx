import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';

interface LeaveRequest {
    id: number;
    leave_code: string;
    employee: { id: number; employee_id: string; first_name: string; last_name: string; department?: { name: string } };
    leaveType: { name: string; code: string; is_paid: boolean };
    start_date: string;
    end_date: string;
    total_days: number;
    reason: string;
    status: string;
    approver?: { first_name: string; last_name: string };
    approved_at: string;
    approval_notes: string;
}

export default function Show({ leaveRequest }: { leaveRequest: LeaveRequest }) {
    const [approvalNotes, setApprovalNotes] = useState('');

    const handleApprove = () => {
        router.post(route('hr.admin.leave.approve', leaveRequest.id), { approval_notes: approvalNotes });
    };

    const handleReject = () => {
        if (!approvalNotes) { alert('Please provide notes for rejection.'); return; }
        router.post(route('hr.admin.leave.reject', leaveRequest.id), { approval_notes: approvalNotes });
    };

    return (
        <AppLayout>
            <Head title="Leave Request" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('hr.admin.leave.index')}><Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Leave Request: {leaveRequest.leave_code}</h1>
                    <Badge variant={
                        leaveRequest.status === 'approved' ? 'default' :
                        leaveRequest.status === 'rejected' ? 'destructive' : 'secondary'
                    }>{leaveRequest.status}</Badge>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-4 text-lg font-semibold">Employee Details</h2>
                        <dl className="space-y-3">
                            <div className="flex justify-between"><dt className="text-muted-foreground">Name</dt><dd className="font-medium">{leaveRequest.employee?.first_name} {leaveRequest.employee?.last_name}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">ID</dt><dd>{leaveRequest.employee?.employee_id}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Department</dt><dd>{leaveRequest.employee?.department?.name || '—'}</dd></div>
                        </dl>
                    </Card>
                    <Card className="p-6">
                        <h2 className="mb-4 text-lg font-semibold">Leave Details</h2>
                        <dl className="space-y-3">
                            <div className="flex justify-between"><dt className="text-muted-foreground">Type</dt><dd>{leaveRequest.leaveType?.name}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Paid Leave</dt><dd>{leaveRequest.leaveType?.is_paid ? 'Yes' : 'No'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Start</dt><dd>{leaveRequest.start_date}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">End</dt><dd>{leaveRequest.end_date}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Total Days</dt><dd className="font-semibold">{leaveRequest.total_days}</dd></div>
                        </dl>
                    </Card>
                </div>

                <Card className="p-6">
                    <h2 className="mb-4 text-lg font-semibold">Reason</h2>
                    <p>{leaveRequest.reason}</p>
                </Card>

                {leaveRequest.status === 'pending' && (
                    <Card className="p-6">
                        <h2 className="mb-4 text-lg font-semibold">Decision</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-muted-foreground mb-1 block text-sm">Notes (required for rejection)</label>
                                <Textarea value={approvalNotes} onChange={(e) => setApprovalNotes(e.target.value)} placeholder="Approval or rejection notes..." />
                            </div>
                            <div className="flex gap-4">
                                <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">Approve</Button>
                                <Button onClick={handleReject} variant="destructive">Reject</Button>
                            </div>
                        </div>
                    </Card>
                )}

                {leaveRequest.approved_at && (
                    <Card className="p-6">
                        <h2 className="mb-4 text-lg font-semibold">Approval Info</h2>
                        <dl className="space-y-3">
                            <div className="flex justify-between"><dt className="text-muted-foreground">Approved By</dt><dd>{leaveRequest.approver?.first_name} {leaveRequest.approver?.last_name}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Approved At</dt><dd>{leaveRequest.approved_at}</dd></div>
                            {leaveRequest.approval_notes && <div className="flex justify-between"><dt className="text-muted-foreground">Notes</dt><dd>{leaveRequest.approval_notes}</dd></div>}
                        </dl>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}