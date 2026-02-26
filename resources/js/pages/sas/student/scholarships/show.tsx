import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import sas from '@/routes/sas';
import { ScholarshipRecipient } from '@/types/sas';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Award,
    Calendar,
    CheckCircle2,
    Clock,
    FileText,
    Upload,
} from 'lucide-react';
import { useState } from 'react';

interface Props {
    recipient: ScholarshipRecipient & {
        scholarship: {
            id: number;
            scholarship_name: string;
            scholarship_type: string;
            description?: string;
            requirements?: string;
            amount?: number;
            status: string;
        };
    };
}

const statusColors = {
    Active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    Suspended:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    Revoked: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    Cancelled: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
};

export default function Show({ recipient }: Props) {
    const [selectedRequirement, setSelectedRequirement] = useState<
        number | null
    >(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        requirement_id: 0,
        file: null as File | null,
    });

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.file || !selectedRequirement) return;

        post(
            sas.student.scholarships.uploadRequirement.url({
                id: recipient.id,
            }),
            {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                    setSelectedRequirement(null);
                },
            },
        );
    };

    const openUploadDialog = (requirementId: number) => {
        setSelectedRequirement(requirementId);
        setData('requirement_id', requirementId);
        setIsDialogOpen(true);
    };

    const completedRequirements =
        recipient.requirements?.filter((r) => r.is_submitted).length || 0;
    const totalRequirements = recipient.requirements?.length || 0;

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                {
                    title: 'My Scholarships',
                    href: sas.student.scholarships.index.url(),
                },
                { title: recipient.scholarship.scholarship_name, href: '#' },
            ]}
        >
            <Head
                title={`${recipient.scholarship.scholarship_name} - My Scholarships`}
            />

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-blue-50 to-white px-4 py-12 sm:px-6 lg:px-8 dark:from-gray-900 dark:to-gray-800">
                <div className="mx-auto max-w-5xl">
                    <Link href={sas.student.scholarships.index.url()}>
                        <Button variant="ghost" className="mb-4">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Scholarships
                        </Button>
                    </Link>

                    <div className="flex items-start gap-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                            <Award className="h-8 w-8 text-blue-700 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                {recipient.scholarship.scholarship_name}
                            </h1>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                <Badge variant="outline">
                                    {recipient.scholarship.scholarship_type}
                                </Badge>
                                <Badge
                                    className={statusColors[recipient.status]}
                                >
                                    {recipient.status}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-white px-4 py-8 sm:px-6 lg:px-8 dark:bg-gray-900">
                <div className="mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Main Info - Left Column */}
                        <div className="space-y-6 lg:col-span-2">
                            {/* Scholarship Details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Scholarship Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {recipient.scholarship.description && (
                                        <div>
                                            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Description
                                            </Label>
                                            <p className="mt-1 text-gray-600 dark:text-gray-400">
                                                {
                                                    recipient.scholarship
                                                        .description
                                                }
                                            </p>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Award Date
                                            </Label>
                                            <p className="mt-1 text-gray-600 dark:text-gray-400">
                                                {recipient.date_awarded
                                                    ? new Date(
                                                          recipient.date_awarded,
                                                      ).toLocaleDateString()
                                                    : 'N/A'}
                                            </p>
                                        </div>

                                        {recipient.scholarship.amount && (
                                            <div>
                                                <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                    Amount
                                                </Label>
                                                <p className="mt-1 text-gray-600 dark:text-gray-400">
                                                    ₱
                                                    {recipient.scholarship.amount.toLocaleString()}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {recipient.scholarship.requirements && (
                                        <div>
                                            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                General Requirements
                                            </Label>
                                            <p className="mt-1 text-sm whitespace-pre-line text-gray-600 dark:text-gray-400">
                                                {
                                                    recipient.scholarship
                                                        .requirements
                                                }
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Requirements Checklist */}
                            {recipient.requirements &&
                                recipient.requirements.length > 0 && (
                                    <Card>
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <CardTitle>
                                                    Required Documents
                                                </CardTitle>
                                                <Link
                                                    href={sas.student.scholarships.requirements.url(
                                                        { id: recipient.id },
                                                    )}
                                                >
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        <FileText className="mr-2 h-4 w-4" />
                                                        View Full Requirements
                                                    </Button>
                                                </Link>
                                            </div>
                                            <div className="mt-2">
                                                <span className="text-sm text-muted-foreground">
                                                    {completedRequirements} of{' '}
                                                    {totalRequirements}{' '}
                                                    completed
                                                </span>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {recipient.requirements.map(
                                                    (req) => (
                                                        <div
                                                            key={req.id}
                                                            className="flex items-start gap-4 rounded-lg border p-4 dark:border-gray-700"
                                                        >
                                                            <div className="flex-shrink-0">
                                                                {req.is_submitted ? (
                                                                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                                                                ) : req.deadline ? (
                                                                    <Clock className="h-6 w-6 text-orange-600" />
                                                                ) : (
                                                                    <Clock className="h-6 w-6 text-gray-400" />
                                                                )}
                                                            </div>

                                                            <div className="flex-1">
                                                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                                                    {
                                                                        req.requirement_name
                                                                    }
                                                                </h4>
                                                                {req.remarks && (
                                                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                                        {
                                                                            req.remarks
                                                                        }
                                                                    </p>
                                                                )}

                                                                {req.is_submitted ? (
                                                                    <div className="mt-2">
                                                                        <Badge
                                                                            variant="outline"
                                                                            className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                                                                        >
                                                                            <CheckCircle2 className="mr-1 h-3 w-3" />
                                                                            Submitted
                                                                            {req.submission_date && (
                                                                                <>
                                                                                    {' '}
                                                                                    on{' '}
                                                                                    {new Date(
                                                                                        req.submission_date,
                                                                                    ).toLocaleDateString()}
                                                                                </>
                                                                            )}
                                                                        </Badge>
                                                                    </div>
                                                                ) : (
                                                                    <Button
                                                                        size="sm"
                                                                        variant="outline"
                                                                        className="mt-2"
                                                                        onClick={() =>
                                                                            openUploadDialog(
                                                                                req.id,
                                                                            )
                                                                        }
                                                                    >
                                                                        <Upload className="mr-2 h-4 w-4" />
                                                                        Upload
                                                                        Document
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                        </div>

                        {/* Sidebar - Right Column */}
                        <div className="space-y-6">
                            {/* Progress Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Progress Overview
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-blue-700 dark:text-blue-400">
                                            {totalRequirements > 0
                                                ? Math.round(
                                                      (completedRequirements /
                                                          totalRequirements) *
                                                          100,
                                                  )
                                                : 0}
                                            %
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Requirements Complete
                                        </p>
                                    </div>

                                    <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                                        <div
                                            className="h-2 rounded-full bg-blue-700 transition-all dark:bg-blue-500"
                                            style={{
                                                width: `${totalRequirements > 0 ? (completedRequirements / totalRequirements) * 100 : 0}%`,
                                            }}
                                        />
                                    </div>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">
                                                Completed:
                                            </span>
                                            <span className="font-semibold">
                                                {completedRequirements}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">
                                                Pending:
                                            </span>
                                            <span className="font-semibold">
                                                {totalRequirements -
                                                    completedRequirements}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">
                                                Total:
                                            </span>
                                            <span className="font-semibold">
                                                {totalRequirements}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Quick Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                Awarded On
                                            </p>
                                            <p className="font-semibold">
                                                {recipient.date_awarded
                                                    ? new Date(
                                                          recipient.date_awarded,
                                                      ).toLocaleDateString(
                                                          'en-US',
                                                          {
                                                              year: 'numeric',
                                                              month: 'long',
                                                              day: 'numeric',
                                                          },
                                                      )
                                                    : 'N/A'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                Student ID
                                            </p>
                                            <p className="font-semibold">
                                                {recipient.student_id || 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Upload Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <form onSubmit={handleUpload}>
                        <DialogHeader>
                            <DialogTitle>Upload Requirement</DialogTitle>
                            <DialogDescription>
                                Upload the required document. Accepted formats:
                                PDF, JPG, JPEG, PNG (Max 10MB)
                            </DialogDescription>
                        </DialogHeader>

                        <div className="my-6">
                            <Label htmlFor="file">Select File</Label>
                            <Input
                                id="file"
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) =>
                                    setData('file', e.target.files?.[0] || null)
                                }
                                className="mt-2"
                            />
                            {errors.file && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.file}
                                </p>
                            )}
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                                disabled={processing}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Uploading...' : 'Upload'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
