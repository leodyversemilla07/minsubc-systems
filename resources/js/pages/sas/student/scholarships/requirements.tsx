import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { formatDate } from '@/lib/utils';
import sas from '@/routes/sas';
import { ScholarshipRecipient, ScholarshipRequirement } from '@/types/sas';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowLeft,
    CheckCircle2,
    Clock,
    Download,
    FileText,
    Upload,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';

interface Props {
    recipient: ScholarshipRecipient;
    requirements: ScholarshipRequirement[];
    stats: {
        total: number;
        submitted: number;
        pending: number;
        completion_percentage: number;
    };
}

export default function Requirements({
    recipient,
    requirements,
    stats,
}: Props) {
    const [uploadingId, setUploadingId] = useState<number | null>(null);
    const { setData, post, processing, errors, reset } = useForm({
        requirement_id: 0,
        file: null as File | null,
    });

    const handleFileUpload = (requirementId: number, file: File) => {
        setUploadingId(requirementId);
        setData({
            requirement_id: requirementId,
            file: file,
        });

        post(
            sas.student.scholarships.uploadRequirement.url({
                id: recipient.id,
            }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setUploadingId(null);
                },
                onError: () => {
                    setUploadingId(null);
                },
            },
        );
    };

    const getStatusIcon = (requirement: ScholarshipRequirement) => {
        if (requirement.is_submitted) {
            return <CheckCircle2 className="h-5 w-5 text-green-600" />;
        }

        if (
            requirement.deadline &&
            new Date(requirement.deadline) < new Date()
        ) {
            return <XCircle className="h-5 w-5 text-red-600" />;
        }

        return <Clock className="h-5 w-5 text-yellow-600" />;
    };

    const getStatusBadge = (requirement: ScholarshipRequirement) => {
        if (requirement.is_submitted) {
            return (
                <Badge variant="default" className="bg-green-600">
                    Submitted
                </Badge>
            );
        }

        if (
            requirement.deadline &&
            new Date(requirement.deadline) < new Date()
        ) {
            return <Badge variant="destructive">Overdue</Badge>;
        }

        return <Badge variant="secondary">Pending</Badge>;
    };

    const isOverdue = (requirement: ScholarshipRequirement) => {
        return (
            requirement.deadline &&
            new Date(requirement.deadline) < new Date() &&
            !requirement.is_submitted
        );
    };

    return (
        <AppLayout>
            <Head
                title={`Requirements - ${recipient.scholarship?.scholarship_name}`}
            />

            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <div className="mb-6">
                    <Link
                        href={sas.student.scholarships.show.url({
                            id: recipient.id,
                        })}
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Scholarship Details
                    </Link>
                </div>

                {/* Header */}
                <div className="mb-6">
                    <h1 className="mb-2 text-3xl font-bold">
                        Scholarship Requirements
                    </h1>
                    <p className="text-muted-foreground">
                        {recipient.scholarship?.scholarship_name} -{' '}
                        {recipient.academic_year} ({recipient.semester}{' '}
                        Semester)
                    </p>
                </div>

                {/* Completion Progress */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Completion Progress</CardTitle>
                        <CardDescription>
                            Track your progress in submitting required documents
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="mb-2 flex justify-between">
                                    <span className="text-sm font-medium">
                                        Overall Progress
                                    </span>
                                    <span className="text-sm font-medium">
                                        {stats.completion_percentage}%
                                    </span>
                                </div>
                                <Progress
                                    value={stats.completion_percentage}
                                    className="h-2"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4 pt-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">
                                        {stats.total}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Total Requirements
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">
                                        {stats.submitted}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Submitted
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-600">
                                        {stats.pending}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Pending
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Requirements List */}
                <div className="space-y-4">
                    {requirements.length === 0 ? (
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                No requirements have been set for this
                                scholarship yet.
                            </AlertDescription>
                        </Alert>
                    ) : (
                        requirements.map((requirement) => (
                            <Card
                                key={requirement.id}
                                className={
                                    isOverdue(requirement)
                                        ? 'border-red-500'
                                        : ''
                                }
                            >
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex flex-1 items-start gap-3">
                                            {getStatusIcon(requirement)}
                                            <div className="flex-1">
                                                <CardTitle className="mb-1 text-lg">
                                                    {
                                                        requirement.requirement_name
                                                    }
                                                </CardTitle>
                                                {requirement.deadline && (
                                                    <CardDescription>
                                                        Deadline:{' '}
                                                        {formatDate(
                                                            requirement.deadline,
                                                        )}
                                                        {isOverdue(
                                                            requirement,
                                                        ) && (
                                                            <span className="ml-2 font-medium text-red-600">
                                                                (Overdue)
                                                            </span>
                                                        )}
                                                    </CardDescription>
                                                )}
                                                {requirement.remarks && (
                                                    <p className="mt-2 text-sm text-muted-foreground">
                                                        {requirement.remarks}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div>{getStatusBadge(requirement)}</div>
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    {requirement.is_submitted ? (
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-sm text-green-600">
                                                <CheckCircle2 className="h-4 w-4" />
                                                Submitted on{' '}
                                                {formatDate(
                                                    requirement.submission_date!,
                                                )}
                                            </div>

                                            {requirement.file_path && (
                                                <div className="flex items-center gap-2 rounded-md bg-muted p-3">
                                                    <FileText className="h-5 w-5 text-muted-foreground" />
                                                    <span className="flex-1 text-sm">
                                                        {requirement.file_path
                                                            .split('/')
                                                            .pop()}
                                                    </span>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() =>
                                                            window.open(
                                                                requirement.file_path,
                                                                '_blank',
                                                            )
                                                        }
                                                    >
                                                        <Download className="mr-1 h-4 w-4" />
                                                        View
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <Label
                                                htmlFor={`file-${requirement.id}`}
                                                className="text-sm"
                                            >
                                                Upload Document (PDF, JPG, PNG -
                                                Max 10MB)
                                            </Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    id={`file-${requirement.id}`}
                                                    type="file"
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    onChange={(e) => {
                                                        const file =
                                                            e.target.files?.[0];
                                                        if (file) {
                                                            handleFileUpload(
                                                                requirement.id,
                                                                file,
                                                            );
                                                        }
                                                    }}
                                                    disabled={
                                                        processing &&
                                                        uploadingId ===
                                                            requirement.id
                                                    }
                                                    className="flex-1"
                                                />
                                                <Button
                                                    type="button"
                                                    disabled={
                                                        processing &&
                                                        uploadingId ===
                                                            requirement.id
                                                    }
                                                    onClick={() => {
                                                        document
                                                            .getElementById(
                                                                `file-${requirement.id}`,
                                                            )
                                                            ?.click();
                                                    }}
                                                >
                                                    <Upload className="mr-2 h-4 w-4" />
                                                    {uploadingId ===
                                                        requirement.id &&
                                                    processing
                                                        ? 'Uploading...'
                                                        : 'Upload'}
                                                </Button>
                                            </div>
                                            {errors.file && (
                                                <p className="text-sm text-red-600">
                                                    {errors.file}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                {/* Instructions */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle className="text-lg">
                            Important Instructions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
                            <li>
                                Upload clear and legible copies of all required
                                documents
                            </li>
                            <li>
                                Accepted file formats: PDF, JPG, PNG (Maximum
                                10MB per file)
                            </li>
                            <li>
                                Ensure all documents are complete and properly
                                signed where required
                            </li>
                            <li>
                                Submit documents before the deadline to avoid
                                scholarship suspension
                            </li>
                            <li>
                                Contact the SAS Office if you have questions
                                about any requirement
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
