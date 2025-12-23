import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import sas from '@/routes/sas';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    CheckCircle,
    FileText,
    Shield,
    User,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';

interface Student {
    id: number;
    student_id: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    email: string;
    course?: string;
    year_level?: string;
}

interface ReviewedBy {
    id: number;
    first_name: string;
    last_name: string;
}

interface Insurance {
    id: number;
    student_id: number;
    insurance_provider: string;
    policy_number: string;
    policy_type: string;
    coverage_amount: string;
    effective_date: string;
    expiration_date: string;
    status: string;
    beneficiary_name?: string;
    beneficiary_relationship?: string;
    policy_document_path?: string;
    submission_date: string;
    reviewed_by?: number;
    reviewed_at?: string;
    review_notes?: string;
    student: Student;
    reviewed_by_user?: ReviewedBy;
}

interface Props {
    insurance: Insurance;
}

export default function InsuranceShow({ insurance }: Props) {
    const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        review_notes: '',
    });

    function handleApprove() {
        router.post(
            `/sas/admin/insurance/${insurance.id}/approve`,
            {},
            {
                onSuccess: () => {
                    // Success message handled by backend
                },
            },
        );
    }

    function handleReject(e: React.FormEvent) {
        e.preventDefault();
        post(`/sas/admin/insurance/${insurance.id}/reject`, {
            onSuccess: () => {
                reset();
                setIsRejectDialogOpen(false);
            },
        });
    }

    function getStatusBadge(status: string) {
        const variants: Record<
            string,
            { variant: 'default' | 'secondary' | 'destructive' }
        > = {
            Pending: { variant: 'secondary' },
            Approved: { variant: 'default' },
            Rejected: { variant: 'destructive' },
        };

        const config = variants[status] || { variant: 'secondary' as const };

        return <Badge variant={config.variant}>{status}</Badge>;
    }

    function formatCurrency(amount: string) {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
        }).format(parseFloat(amount));
    }

    const daysUntilExpiration = Math.ceil(
        (new Date(insurance.expiration_date).getTime() - Date.now()) /
        (1000 * 60 * 60 * 24),
    );

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'SAS Admin', href: '/sas/admin/dashboard' },
                { title: 'Insurance', href: '/sas/admin/insurance' },
                { title: insurance.policy_number, href: '#' },
            ]}
        >
            <Head title={`Insurance - ${insurance.policy_number}`} />

            <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between lg:items-center">
                    <div className="space-y-1">
                        <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
                            Insurance Review
                        </h1>
                        <p className="text-sm text-muted-foreground sm:text-base">
                            Policy #{insurance.policy_number}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {insurance.status === 'Pending' && (
                            <>
                                <Button
                                    variant="default"
                                    onClick={handleApprove}
                                    disabled={processing}
                                >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Approve
                                </Button>
                                <Dialog
                                    open={isRejectDialogOpen}
                                    onOpenChange={setIsRejectDialogOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button variant="destructive">
                                            <XCircle className="mr-2 h-4 w-4" />
                                            Reject
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Reject Insurance Submission
                                            </DialogTitle>
                                            <DialogDescription>
                                                Please provide a reason for
                                                rejecting this insurance
                                                submission.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={handleReject}>
                                            <div className="space-y-4 py-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="review_notes">
                                                        Rejection Reason *
                                                    </Label>
                                                    <Textarea
                                                        id="review_notes"
                                                        value={
                                                            data.review_notes
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                'review_notes',
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="Explain why this submission is being rejected..."
                                                        rows={4}
                                                        required
                                                    />
                                                    {errors.review_notes && (
                                                        <p className="text-sm text-destructive">
                                                            {
                                                                errors.review_notes
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() =>
                                                        setIsRejectDialogOpen(
                                                            false,
                                                        )
                                                    }
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="destructive"
                                                    disabled={processing}
                                                >
                                                    {processing
                                                        ? 'Rejecting...'
                                                        : 'Reject Submission'}
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </>
                        )}
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Status Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Submission Status</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        Current Status
                                    </span>
                                    {getStatusBadge(insurance.status)}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        Submitted On
                                    </span>
                                    <span className="font-medium">
                                        {new Date(
                                            insurance.submission_date,
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                                {insurance.reviewed_at && (
                                    <>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">
                                                Reviewed On
                                            </span>
                                            <span className="font-medium">
                                                {new Date(
                                                    insurance.reviewed_at,
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                        {insurance.reviewed_by_user && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-muted-foreground">
                                                    Reviewed By
                                                </span>
                                                <span className="font-medium">
                                                    {
                                                        insurance.reviewed_by_user
                                                            .first_name
                                                    }{' '}
                                                    {
                                                        insurance.reviewed_by_user
                                                            .last_name
                                                    }
                                                </span>
                                            </div>
                                        )}
                                    </>
                                )}
                                {insurance.review_notes && (
                                    <div className="rounded-lg bg-muted p-4">
                                        <p className="text-sm font-medium text-foreground">
                                            Review Notes
                                        </p>
                                        <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                                            {insurance.review_notes}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Policy Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5" />
                                    Policy Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Insurance Provider
                                        </p>
                                        <p className="font-medium">
                                            {insurance.insurance_provider}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Policy Number
                                        </p>
                                        <p className="font-mono font-medium">
                                            {insurance.policy_number}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Policy Type
                                        </p>
                                        <Badge variant="outline">
                                            {insurance.policy_type}
                                        </Badge>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Coverage Amount
                                        </p>
                                        <p className="font-medium">
                                            {formatCurrency(
                                                insurance.coverage_amount,
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <p className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Calendar className="h-4 w-4" />
                                                Effective Date
                                            </p>
                                            <p className="font-medium">
                                                {new Date(
                                                    insurance.effective_date,
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Calendar className="h-4 w-4" />
                                                Expiration Date
                                            </p>
                                            <p className="font-medium">
                                                {new Date(
                                                    insurance.expiration_date,
                                                ).toLocaleDateString()}
                                            </p>
                                            {daysUntilExpiration > 0 &&
                                                daysUntilExpiration < 30 && (
                                                    <p className="mt-1 text-xs text-yellow-600">
                                                        Expires in{' '}
                                                        {daysUntilExpiration} days
                                                    </p>
                                                )}
                                            {daysUntilExpiration < 0 && (
                                                <p className="mt-1 text-xs text-red-600">
                                                    Expired
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {(insurance.beneficiary_name ||
                                    insurance.beneficiary_relationship) && (
                                        <div className="border-t pt-4">
                                            <p className="mb-2 text-sm font-medium">
                                                Beneficiary Information
                                            </p>
                                            <div className="grid gap-4 md:grid-cols-2">
                                                {insurance.beneficiary_name && (
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">
                                                            Name
                                                        </p>
                                                        <p className="font-medium">
                                                            {insurance.beneficiary_name}
                                                        </p>
                                                    </div>
                                                )}
                                                {insurance.beneficiary_relationship && (
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">
                                                            Relationship
                                                        </p>
                                                        <p className="font-medium">
                                                            {
                                                                insurance.beneficiary_relationship
                                                            }
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                            </CardContent>
                        </Card>

                        {/* Policy Document */}
                        {insurance.policy_document_path && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="h-5 w-5" />
                                        Policy Document
                                    </CardTitle>
                                    <CardDescription>
                                        Uploaded insurance policy document
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="outline" asChild>
                                        <a
                                            href={`/storage/${insurance.policy_document_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FileText className="mr-2 h-4 w-4" />
                                            View Document
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Student Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Student Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="text-sm text-muted-foreground">Name</p>
                                    <p className="font-medium">
                                        {insurance.student.first_name}{' '}
                                        {insurance.student.middle_name &&
                                            insurance.student.middle_name[0] +
                                            '.'}{' '}
                                        {insurance.student.last_name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Student ID
                                    </p>
                                    <p className="font-mono font-medium">
                                        {insurance.student.student_id}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="text-sm">
                                        {insurance.student.email}
                                    </p>
                                </div>
                                {insurance.student.course && (
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Course
                                        </p>
                                        <p className="font-medium">
                                            {insurance.student.course}
                                        </p>
                                    </div>
                                )}
                                {insurance.student.year_level && (
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Year Level
                                        </p>
                                        <p className="font-medium">
                                            {insurance.student.year_level}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
