import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { type PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import {
    ArrowLeft,
    User,
    BookOpen,
    CreditCard,
    Calendar,
    CheckCircle,
    Clock,
    XCircle,
    AlertCircle,
    DollarSign,
    Users,
    Edit,
    Trash2,
    RefreshCw,
} from 'lucide-react';

interface Subject {
    id: number;
    code: string;
    name: string;
    units: number;
    status: string;
    grade: number | null;
}

interface Payment {
    id: number;
    payment_number: string;
    amount: number;
    method: string;
    status: string;
    reference_number: string | null;
    paid_at: string | null;
    verified_by: { first_name: string; last_name: string } | null;
}

interface EnrollmentDetail {
    id: number;
    application_number: string;
    full_name: string;
    student_id: string | null;
    email: string;
    phone: string;
    program: string;
    academic_year: string;
    semester: string;
    year_level: string;
    status: string;
    enrolled_at: string | null;
    confirmed_at: string | null;
    applicant: {
        id: number;
        application_number: string;
        full_name: string;
        email: string;
        phone: string;
    };
    section: {
        id: number;
        name: string;
        max_students: number;
        current_students: number;
    } | null;
    academic_term: {
        id: number;
        academic_year: string;
        semester: string;
        status: string;
    } | null;
    subjects: Subject[];
    payments: Payment[];
}

interface FeesBreakdown {
    fees: Array<{ id: number; name: string; type: string; amount: number; unit: string; is_required: boolean }>;
    total_units: number;
    total_amount: number;
    total_paid: number;
    balance: number;
}

interface EnrollmentShowPageProps extends PageProps {
    enrollment: EnrollmentDetail;
    feesBreakdown: FeesBreakdown;
    availableSubjects: Subject[];
}

export default function EnrollmentShow({ enrollment, feesBreakdown, availableSubjects }: EnrollmentShowPageProps) {
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [showSubjectForm, setShowSubjectForm] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [referenceNumber, setReferenceNumber] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleRecordPayment = () => {
        if (!paymentAmount || parseFloat(paymentAmount) <= 0) return;

        setSubmitting(true);
        router.post(
            route('admission.admin.enrollments.record-payment', enrollment.id),
            {
                amount: parseFloat(paymentAmount),
                method: paymentMethod,
                reference_number: referenceNumber || null,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowPaymentForm(false);
                    setPaymentAmount('');
                    setReferenceNumber('');
                    setSubmitting(false);
                },
                onError: () => setSubmitting(false),
            }
        );
    };

    const handleVerifyPayment = (paymentId: number) => {
        router.post(route('admission.admin.enrollments.payments.verify', paymentId), {}, {
            preserveScroll: true,
        });
    };

    const handleRejectPayment = (paymentId: number) => {
        const reason = prompt('Enter rejection reason:');
        if (reason) {
            router.post(
                route('admission.admin.enrollments.payments.reject', paymentId),
                { reason },
                { preserveScroll: true }
            );
        }
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-400',
            confirmed: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-400',
            enrolled: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-400',
            dropped: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-400',
            cancelled: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-400',
        };

        return (
            <span className={`rounded-full px-3 py-1 text-sm font-medium ${styles[status] || ''}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
    };

    const getPaymentStatusIcon = (status: string) => {
        switch (status) {
            case 'verified':
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'rejected':
                return <XCircle className="h-4 w-4 text-red-500" />;
            default:
                return <Clock className="h-4 w-4 text-yellow-500" />;
        }
    };

    return (
        <>
            <Head title={`Enrollment - ${enrollment.full_name}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <Link
                            href={route('admission.admin.enrollments.index')}
                            className="mb-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                            <ArrowLeft className="mr-1 h-4 w-4" />
                            Back to Enrollments
                        </Link>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {enrollment.full_name}
                        </h1>
                        <p className="text-sm text-gray-500">
                            {enrollment.student_id || enrollment.application_number}
                        </p>
                    </div>
                    {getStatusBadge(enrollment.status)}
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        <Tabs defaultValue="details" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="details">Details</TabsTrigger>
                                <TabsTrigger value="subjects">Subjects</TabsTrigger>
                                <TabsTrigger value="payments">Payments</TabsTrigger>
                                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                            </TabsList>

                            {/* Details Tab */}
                            <TabsContent value="details" className="mt-4 space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Student Information</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div>
                                                <p className="text-sm text-gray-500">Full Name</p>
                                                <p className="font-medium">{enrollment.full_name}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Email</p>
                                                <p className="font-medium">{enrollment.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Phone</p>
                                                <p className="font-medium">{enrollment.phone}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Student ID</p>
                                                <p className="font-medium font-mono">{enrollment.student_id || '—'}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Enrollment Information</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div>
                                                <p className="text-sm text-gray-500">Program</p>
                                                <p className="font-medium">{enrollment.program}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Academic Year</p>
                                                <p className="font-medium">{enrollment.academic_year} ({enrollment.semester})</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Year Level</p>
                                                <p className="font-medium">{enrollment.year_level}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Section</p>
                                                <p className="font-medium">{enrollment.section?.name || 'Not assigned'}</p>
                                            </div>
                                        </div>

                                        <Separator className="my-4" />

                                        <div className="grid gap-4 sm:grid-cols-3">
                                            <div>
                                                <p className="text-sm text-gray-500">Enrolled At</p>
                                                <p className="font-medium">{enrollment.enrolled_at || '—'}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Confirmed At</p>
                                                <p className="font-medium">{enrollment.confirmed_at || '—'}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Application #</p>
                                                <p className="font-medium">{enrollment.application_number}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Fee Summary */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Fee Summary</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            {feesBreakdown.fees.map((fee) => (
                                                <div key={fee.id} className="flex items-center justify-between text-sm">
                                                    <span>{fee.name}</span>
                                                    <span className="font-medium">{formatCurrency(fee.amount)}</span>
                                                </div>
                                            ))}
                                            <Separator />
                                            <div className="flex items-center justify-between">
                                                <span>Total Units</span>
                                                <span className="font-medium">{feesBreakdown.total_units}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>Total Fees</span>
                                                <span className="font-medium">{formatCurrency(feesBreakdown.total_amount)}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-green-600">
                                                <span>Total Paid</span>
                                                <span className="font-medium">{formatCurrency(feesBreakdown.total_paid)}</span>
                                            </div>
                                            <div className={`flex items-center justify-between font-bold ${feesBreakdown.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                                <span>Balance</span>
                                                <span>{formatCurrency(feesBreakdown.balance)}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Subjects Tab */}
                            <TabsContent value="subjects" className="mt-4">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle>Enrolled Subjects</CardTitle>
                                            <CardDescription>
                                                {enrollment.subjects.length} subject(s), {feesBreakdown.total_units} total units
                                            </CardDescription>
                                        </div>
                                        <Button variant="outline" size="sm" onClick={() => setShowSubjectForm(!showSubjectForm)}>
                                            <Edit className="mr-1 h-4 w-4" />
                                            Manage Subjects
                                        </Button>
                                    </CardHeader>
                                    <CardContent>
                                        {enrollment.subjects.length === 0 ? (
                                            <div className="py-8 text-center">
                                                <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                                                <p className="mt-2 text-sm text-gray-500">No subjects enrolled yet.</p>
                                                <Button className="mt-4" onClick={() => setShowSubjectForm(true)}>
                                                    Add Subjects
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                {enrollment.subjects.map((subject) => (
                                                    <div key={subject.id} className="flex items-center justify-between rounded-lg border p-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="rounded bg-blue-100 px-2 py-1 font-mono text-xs font-bold text-blue-700">
                                                                {subject.code}
                                                            </div>
                                                            <div>
                                                                <p className="font-medium">{subject.name}</p>
                                                                <p className="text-xs text-gray-500">{subject.units} units</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            {subject.grade && (
                                                                <Badge variant="outline">{subject.grade}</Badge>
                                                            )}
                                                            <Badge
                                                                variant={subject.status === 'enrolled' ? 'default' : 'secondary'}
                                                            >
                                                                {subject.status}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Payments Tab */}
                            <TabsContent value="payments" className="mt-4">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle>Payment History</CardTitle>
                                            <CardDescription>
                                                Total paid: {formatCurrency(feesBreakdown.total_paid)} / {formatCurrency(feesBreakdown.total_amount)}
                                            </CardDescription>
                                        </div>
                                        <Button variant="outline" size="sm" onClick={() => setShowPaymentForm(!showPaymentForm)}>
                                            <CreditCard className="mr-1 h-4 w-4" />
                                            Record Payment
                                        </Button>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {showPaymentForm && (
                                            <div className="rounded-lg border bg-gray-50 p-4 dark:bg-gray-800">
                                                <h4 className="mb-3 font-medium">Record New Payment</h4>
                                                <div className="grid gap-3 sm:grid-cols-2">
                                                    <div>
                                                        <label className="text-sm">Amount (Balance: {formatCurrency(feesBreakdown.balance)})</label>
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            value={paymentAmount}
                                                            onChange={(e) => setPaymentAmount(e.target.value)}
                                                            className="mt-1 w-full rounded-md border px-3 py-2"
                                                            placeholder="0.00"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-sm">Method</label>
                                                        <select
                                                            value={paymentMethod}
                                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                                            className="mt-1 w-full rounded-md border px-3 py-2"
                                                        >
                                                            <option value="cash">Cash</option>
                                                            <option value="bank_transfer">Bank Transfer</option>
                                                            <option value="gcash">GCash</option>
                                                            <option value="paymaya">PayMaya</option>
                                                            <option value="card">Card</option>
                                                        </select>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <label className="text-sm">Reference Number</label>
                                                        <input
                                                            type="text"
                                                            value={referenceNumber}
                                                            onChange={(e) => setReferenceNumber(e.target.value)}
                                                            className="mt-1 w-full rounded-md border px-3 py-2"
                                                            placeholder="Optional"
                                                        />
                                                    </div>
                                                    <div className="flex gap-2 sm:col-span-2">
                                                        <Button onClick={handleRecordPayment} disabled={submitting}>
                                                            {submitting ? 'Recording...' : 'Record Payment'}
                                                        </Button>
                                                        <Button variant="outline" onClick={() => setShowPaymentForm(false)}>
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {enrollment.payments.length === 0 ? (
                                            <div className="py-8 text-center">
                                                <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
                                                <p className="mt-2 text-sm text-gray-500">No payments recorded yet.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                {enrollment.payments.map((payment) => (
                                                    <div key={payment.id} className="flex items-center justify-between rounded-lg border p-3">
                                                        <div>
                                                            <p className="font-medium">{formatCurrency(payment.amount)}</p>
                                                            <p className="text-xs text-gray-500">
                                                                {payment.payment_number} • {payment.method} • {payment.paid_at}
                                                            </p>
                                                            {payment.reference_number && (
                                                                <p className="text-xs text-gray-400">Ref: {payment.reference_number}</p>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            {getPaymentStatusIcon(payment.status)}
                                                            {payment.status === 'pending' && (
                                                                <>
                                                                    <Button size="sm" variant="outline" onClick={() => handleVerifyPayment(payment.id)}>
                                                                        Verify
                                                                    </Button>
                                                                    <Button size="sm" variant="ghost" onClick={() => handleRejectPayment(payment.id)}>
                                                                        Reject
                                                                    </Button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Schedule Tab */}
                            <TabsContent value="schedule" className="mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Class Schedule</CardTitle>
                                        <CardDescription>
                                            {enrollment.section?.name ? `Section: ${enrollment.section.name}` : 'No section assigned'}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {enrollment.section ? (
                                            <p className="text-sm text-gray-500">
                                                Schedule viewer will be displayed here with the class timetable.
                                            </p>
                                        ) : (
                                            <div className="py-8 text-center">
                                                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                                                <p className="mt-2 text-sm text-gray-500">
                                                    Assign a section to view the schedule.
                                                </p>
                                                <Link href={route('admission.admin.sections.index')}>
                                                    <Button className="mt-4" variant="outline">
                                                        Browse Sections
                                                    </Button>
                                                </Link>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Link href={route('admission.admin.enrollments.edit', enrollment.id)} className="block">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Enrollment
                                    </Button>
                                </Link>
                                {enrollment.status === 'pending' && (
                                    <form action={route('admission.admin.enrollments.confirm', enrollment.id)} method="POST">
                                        <Button type="submit" className="w-full justify-start">
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                            Confirm Enrollment
                                        </Button>
                                    </form>
                                )}
                                <Link href={route('admission.admin.enrollments.re-enroll', enrollment.id)} className="block">
                                    <Button variant="outline" className="w-full justify-start">
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        Re-enroll for Next Semester
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Section Info */}
                        {enrollment.section && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Section</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">Section</span>
                                            <span className="font-medium">{enrollment.section.name}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">Enrollment</span>
                                            <span className="font-medium">
                                                {enrollment.section.current_students}/{enrollment.section.max_students}
                                            </span>
                                        </div>
                                        <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                                            <div
                                                className="h-2 rounded-full bg-blue-500"
                                                style={{
                                                    width: `${(enrollment.section.current_students / enrollment.section.max_students) * 100}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Applicant Quick View */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Applicant</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div>
                                        <p className="text-sm text-gray-500">Name</p>
                                        <p className="font-medium">{enrollment.applicant.full_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-medium">{enrollment.applicant.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="font-medium">{enrollment.applicant.phone}</p>
                                    </div>
                                    <Link href={route('admission.admin.applicants.show', enrollment.applicant.id)}>
                                        <Button variant="ghost" className="mt-2 w-full">
                                            View Application
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

EnrollmentShow.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;