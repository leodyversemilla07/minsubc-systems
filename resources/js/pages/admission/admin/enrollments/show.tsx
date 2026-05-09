import { Head, Link, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft, Edit, Trash2, CheckCircle, XCircle, Plus, CreditCard } from 'lucide-react';
import { useState } from 'react';

interface EnrollmentData {
    id: number;
    student_id: string | null;
    academic_year: string;
    semester: string;
    year_level: string;
    status: string;
    notes: string | null;
    confirmed_at: string | null;
    enrolled_at: string | null;
    gpa: number | null;
    applicant: { application_number: string; first_name: string; last_name: string; program: { course: { code: string; name: string } } } | null;
    user: { id: number; name: string; email: string } | null;
    section: { id: number; name: string; course: { id: number; code: string; name: string } } | null;
    academic_term: { id: number; academic_year: string; semester: string; status: string } | null;
    subjects: Array<{ id: number; subject: { id: number; code: string; name: string; units: number }; grade: number | null; status: string; section: { name: string } | null }>;
    payments: Array<{ id: number; payment_number: string; amount: number; method: string; reference_number: string | null; status: string; created_at: string }>;
}

interface FeeItem { id: number; name: string; type: string; amount: number; is_required: boolean }
interface SubjectItem { id: number; code: string; name: string; units: number }

interface Props extends PageProps {
    enrollment: EnrollmentData;
    feesBreakdown: { fees: FeeItem[]; total_amount: number; total_paid: number; balance: number; total_units: number };
    availableSubjects: SubjectItem[];
}

export default function EnrollmentShow({ enrollment, feesBreakdown, availableSubjects }: Props) {
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [showSubjectForm, setShowSubjectForm] = useState(false);

    const { data: paymentData, setData: setPaymentData, post: postPayment, processing: processingPayment } = useForm({ amount: '', method: 'cash', reference_number: '', notes: '' });
    const { data: subjectData, setData: setSubjectData, post: postSubject, processing: processingSubject } = useForm({ subject_ids: [] as string[] });

    const handleConfirm = () => router.post(route('admission.admin.enrollments.confirm', enrollment.id));
    const handleDelete = () => { if (confirm('Delete this enrollment?')) router.delete(route('admission.admin.enrollments.destroy', enrollment.id)); };
    const handleVerify = (paymentId: number) => router.post(route('admission.admin.enrollments.payments.verify', paymentId));
    const handleReject = (paymentId: number) => { const reason = prompt('Rejection reason:'); if (reason) router.post(route('admission.admin.enrollments.payments.reject', paymentId), { reason }); };

    return (
        <>
            <Head title={`Enrollment: ${enrollment.student_id ?? enrollment.id}`} />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('admission.admin.enrollments.index')} className="p-2 hover:bg-accent rounded-md"><ArrowLeft className="h-5 w-5" /></Link>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">{enrollment.applicant ? `${enrollment.applicant.first_name} ${enrollment.applicant.last_name}` : enrollment.user?.name ?? 'Enrollment'}</h1>
                            <p className="text-muted-foreground">{enrollment.student_id ?? 'No ID'} — {enrollment.section?.course?.code ?? ''} {enrollment.section?.name ?? ''}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {enrollment.status === 'pending' && <Button onClick={handleConfirm}><CheckCircle className="mr-2 h-4 w-4" /> Confirm</Button>}
                        <Link href={route('admission.admin.enrollments.edit', enrollment.id)} className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"><Edit className="mr-2 h-4 w-4" /> Edit</Link>
                        <Button variant="destructive" onClick={handleDelete}><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Status</CardTitle></CardHeader><CardContent><Badge variant={enrollment.status === 'enrolled' ? 'default' : 'secondary'} className="text-sm">{enrollment.status}</Badge></CardContent></Card>
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Section</CardTitle></CardHeader><CardContent><p className="font-medium">{enrollment.section?.name ?? 'Not assigned'}</p></CardContent></Card>
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Year / Term</CardTitle></CardHeader><CardContent><p className="font-medium">Year {enrollment.year_level} — {enrollment.academic_year} {enrollment.semester}</p></CardContent></Card>
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">GPA</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{enrollment.gpa?.toFixed(2) ?? 'N/A'}</p></CardContent></Card>
                </div>

                {/* Subjects */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Subjects ({enrollment.subjects?.length ?? 0})</CardTitle>
                        <Button variant="outline" size="sm" onClick={() => setShowSubjectForm(!showSubjectForm)}><Plus className="mr-1 h-3 w-3" /> Assign</Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        {showSubjectForm && availableSubjects.length > 0 && (
                            <div className="border-b px-6 py-4">
                                <p className="text-sm mb-2">Available subjects:</p>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {availableSubjects.map((s) => {
                                        const alreadyAssigned = enrollment.subjects?.some((es) => es.subject?.id === s.id);
                                        return (
                                            <button key={s.id} onClick={() => {
                                                const current = subjectData.subject_ids;
                                                if (current.includes(String(s.id))) {
                                                    setSubjectData('subject_ids', current.filter((id: string) => id !== String(s.id)));
                                                } else {
                                                    setSubjectData('subject_ids', [...current, String(s.id)]);
                                                }
                                            }} className={`px-3 py-1.5 rounded-md text-xs border transition ${alreadyAssigned ? 'bg-green-100 border-green-300 dark:bg-green-900/30' : subjectData.subject_ids.includes(String(s.id)) ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}>
                                                {s.code} {alreadyAssigned ? '(assigned)' : ''}
                                            </button>
                                        );
                                    })}
                                </div>
                                {subjectData.subject_ids.length > 0 && (
                                    <div className="flex gap-2">
                                        <Button size="sm" onClick={() => postSubject(route('admission.admin.enrollments.assign-subjects', enrollment.id))} disabled={processingSubject}>Assign Selected</Button>
                                        <Button size="sm" variant="outline" onClick={() => setShowSubjectForm(false)}>Cancel</Button>
                                    </div>
                                )}
                            </div>
                        )}
                        {!enrollment.subjects || enrollment.subjects.length === 0 ? (
                            <div className="px-6 pb-6 pt-2 text-sm text-muted-foreground">No subjects assigned.</div>
                        ) : (
                            <Table>
                                <TableHeader><TableRow><TableHead>Code</TableHead><TableHead>Name</TableHead><TableHead className="text-center">Units</TableHead><TableHead className="text-center">Grade</TableHead><TableHead className="text-center">Status</TableHead></TableRow></TableHeader>
                                <TableBody>{enrollment.subjects.map((es: any) => (
                                    <TableRow key={es.id}>
                                        <TableCell className="font-mono text-sm">{es.subject?.code ?? '-'}</TableCell>
                                        <TableCell className="text-sm">{es.subject?.name}</TableCell>
                                        <TableCell className="text-center">{es.subject?.units ?? '-'}</TableCell>
                                        <TableCell className="text-center font-medium">{es.grade ?? '-'}</TableCell>
                                        <TableCell className="text-center"><Badge variant={es.status === 'enrolled' ? 'default' : 'secondary'}>{es.status}</Badge></TableCell>
                                    </TableRow>
                                ))}</TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                {/* Fees & Payments */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader><CardTitle>Fee Breakdown</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            {feesBreakdown.fees.map((fee: any) => (
                                <div key={fee.id} className="flex justify-between text-sm"><span>{fee.name}</span><span>₱{Number(fee.amount).toLocaleString()}</span></div>
                            ))}
                            <div className="border-t pt-2 flex justify-between font-semibold"><span>Total</span><span>₱{feesBreakdown.total_amount.toLocaleString()}</span></div>
                            <div className="flex justify-between text-sm text-green-600"><span>Paid</span><span>₱{feesBreakdown.total_paid.toLocaleString()}</span></div>
                            <div className="flex justify-between text-sm text-orange-600 font-semibold"><span>Balance</span><span>₱{feesBreakdown.balance.toLocaleString()}</span></div>
                            <div className="text-xs text-muted-foreground">{feesBreakdown.total_units} total units</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Payments ({enrollment.payments?.length ?? 0})</CardTitle>
                            <Button variant="outline" size="sm" onClick={() => setShowPaymentForm(!showPaymentForm)}><CreditCard className="mr-1 h-3 w-3" /> Record</Button>
                        </CardHeader>
                        <CardContent>
                            {showPaymentForm && (
                                <div className="mb-4 space-y-3 rounded-md border p-4">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div><Input type="number" step="0.01" placeholder="Amount" value={paymentData.amount} onChange={(e) => setPaymentData('amount', e.target.value)} /></div>
                                        <Select value={paymentData.method} onValueChange={(v: string | null) => setPaymentData('method', v ?? 'cash')}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent><SelectItem value="cash">Cash</SelectItem><SelectItem value="bank_transfer">Bank Transfer</SelectItem><SelectItem value="gcash">GCash</SelectItem></SelectContent>
                                        </Select>
                                    </div>
                                    <Input placeholder="Reference number" value={paymentData.reference_number} onChange={(e) => setPaymentData('reference_number', e.target.value)} />
                                    <div className="flex gap-2">
                                        <Button size="sm" onClick={() => postPayment(route('admission.admin.enrollments.record-payment', enrollment.id))} disabled={processingPayment}>Record</Button>
                                        <Button size="sm" variant="outline" onClick={() => setShowPaymentForm(false)}>Cancel</Button>
                                    </div>
                                </div>
                            )}
                            {!enrollment.payments || enrollment.payments.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No payments recorded.</p>
                            ) : (
                                <div className="space-y-2">
                                    {enrollment.payments.map((p: any) => (
                                        <div key={p.id} className="flex items-center justify-between rounded-md border p-2 text-sm">
                                            <div>
                                                <p className="font-mono text-xs">{p.payment_number}</p>
                                                <p className="font-medium">₱{Number(p.amount).toLocaleString()} — {p.method}</p>
                                                {p.reference_number && <p className="text-xs text-muted-foreground">Ref: {p.reference_number}</p>}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant={p.status === 'verified' ? 'default' : p.status === 'rejected' ? 'secondary' : 'secondary'}>{p.status}</Badge>
                                                {p.status === 'pending' && (
                                                    <>
                                                        <button onClick={() => handleVerify(p.id)} className="p-1 text-green-600 hover:bg-green-100 rounded"><CheckCircle className="h-4 w-4" /></button>
                                                        <button onClick={() => handleReject(p.id)} className="p-1 text-red-600 hover:bg-red-100 rounded"><XCircle className="h-4 w-4" /></button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

EnrollmentShow.layout = (page: React.ReactNode) => <AppLayout children={page} />;