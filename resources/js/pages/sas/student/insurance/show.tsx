import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import sas from '@/routes/sas';
import { InsuranceRecord } from '@/types/sas';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    CheckCircle2,
    Clock,
    DollarSign,
    FileText,
    ShieldCheck,
    User,
    XCircle,
} from 'lucide-react';

interface Props {
    insurance: InsuranceRecord;
}

const statusConfig = {
    Pending: {
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        icon: Clock,
        message: 'Your insurance record is pending review.',
    },
    Approved: {
        color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        icon: CheckCircle2,
        message: 'Your insurance record has been approved.',
    },
    Rejected: {
        color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        icon: XCircle,
        message: 'Your insurance record has been rejected.',
    },
    Expired: {
        color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
        icon: XCircle,
        message: 'This insurance policy has expired.',
    },
};

export default function Show({ insurance }: Props) {
    const config = statusConfig[insurance.status];
    const StatusIcon = config.icon;

    const isExpired = new Date(insurance.expiry_date) < new Date();
    const daysUntilExpiry = Math.ceil(
        (new Date(insurance.expiry_date).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24),
    );

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'My Insurance', href: sas.student.insurance.index.url() },
                { title: insurance.insurance_provider || 'Insurance Details', href: '#' },
            ]}
        >
            <Head
                title={`${insurance.insurance_provider || 'Insurance'} - My Insurance`}
            />

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-purple-50 to-white px-4 py-12 sm:px-6 lg:px-8 dark:from-gray-900 dark:to-gray-800">
                <div className="mx-auto max-w-5xl">
                    <Link href={sas.student.insurance.index.url()}>
                        <Button variant="ghost" className="mb-4">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Insurance
                        </Button>
                    </Link>

                    <div className="flex items-start gap-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                            <ShieldCheck className="h-8 w-8 text-purple-700 dark:text-purple-400" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                {insurance.insurance_provider ||
                                    'Insurance Policy'}
                            </h1>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                {insurance.policy_number && (
                                    <Badge variant="outline">
                                        Policy #{insurance.policy_number}
                                    </Badge>
                                )}
                                <Badge className={config.color}>
                                    <StatusIcon className="mr-1 h-3 w-3" />
                                    {insurance.status}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Status Alert */}
                    <Card
                        className={`mt-6 border-2 ${insurance.status === 'Approved' ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' : insurance.status === 'Rejected' ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20' : 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20'}`}
                    >
                        <CardContent className="flex items-center gap-3 p-4">
                            <StatusIcon
                                className={`h-6 w-6 ${insurance.status === 'Approved' ? 'text-green-700 dark:text-green-400' : insurance.status === 'Rejected' ? 'text-red-700 dark:text-red-400' : 'text-yellow-700 dark:text-yellow-400'}`}
                            />
                            <div className="flex-1">
                                <p
                                    className={`font-semibold ${insurance.status === 'Approved' ? 'text-green-900 dark:text-green-300' : insurance.status === 'Rejected' ? 'text-red-900 dark:text-red-300' : 'text-yellow-900 dark:text-yellow-300'}`}
                                >
                                    {config.message}
                                </p>
                                {!isExpired && daysUntilExpiry <= 30 && (
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        This policy will expire in{' '}
                                        {daysUntilExpiry} days.
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-white px-4 py-8 sm:px-6 lg:px-8 dark:bg-gray-900">
                <div className="mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Main Info - Left Column */}
                        <div className="space-y-6 lg:col-span-2">
                            {/* Policy Details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Policy Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Policy Number
                                            </Label>
                                            <p className="mt-1 text-gray-900 dark:text-white">
                                                {insurance.policy_number ||
                                                    'N/A'}
                                            </p>
                                        </div>

                                        <div>
                                            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Insurance Provider
                                            </Label>
                                            <p className="mt-1 text-gray-900 dark:text-white">
                                                {insurance.insurance_provider ||
                                                    'N/A'}
                                            </p>
                                        </div>

                                        <div>
                                            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Coverage Type
                                            </Label>
                                            <p className="mt-1 text-gray-900 dark:text-white">
                                                {insurance.coverage_type ||
                                                    'N/A'}
                                            </p>
                                        </div>

                                        {insurance.coverage_amount && (
                                            <div>
                                                <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                    Coverage Amount
                                                </Label>
                                                <p className="mt-1 text-gray-900 dark:text-white">
                                                    ₱
                                                    {insurance.coverage_amount.toLocaleString()}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Coverage Period */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Coverage Period</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Start Date
                                            </Label>
                                            <p className="mt-1 flex items-center gap-2 text-gray-900 dark:text-white">
                                                <Calendar className="h-4 w-4 text-gray-500" />
                                                {new Date(
                                                    insurance.start_date,
                                                ).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                        </div>

                                        <div>
                                            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Expiry Date
                                            </Label>
                                            <p className="mt-1 flex items-center gap-2 text-gray-900 dark:text-white">
                                                <Calendar className="h-4 w-4 text-gray-500" />
                                                {new Date(
                                                    insurance.expiry_date,
                                                ).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    {!isExpired && (
                                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                                            <p className="text-sm text-blue-900 dark:text-blue-300">
                                                <strong>
                                                    {daysUntilExpiry} days
                                                </strong>{' '}
                                                remaining until expiry
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Remarks */}
                            {insurance.remarks && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Additional Information
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="whitespace-pre-line text-gray-600 dark:text-gray-400">
                                            {insurance.remarks}
                                        </p>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Review Information */}
                            {insurance.reviewed_at && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Review Information
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div>
                                            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Reviewed On
                                            </Label>
                                            <p className="mt-1 text-gray-900 dark:text-white">
                                                {new Date(
                                                    insurance.reviewed_at,
                                                ).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar - Right Column */}
                        <div className="space-y-6">
                            {/* Quick Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Quick Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <User className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                Student Name
                                            </p>
                                            <p className="font-semibold">
                                                {insurance.student_name}
                                            </p>
                                        </div>
                                    </div>

                                    {insurance.student_id && (
                                        <div className="flex items-center gap-3">
                                            <FileText className="h-5 w-5 text-gray-500" />
                                            <div>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                    Student ID
                                                </p>
                                                <p className="font-semibold">
                                                    {insurance.student_id}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {insurance.coverage_amount && (
                                        <div className="flex items-center gap-3">
                                            <DollarSign className="h-5 w-5 text-gray-500" />
                                            <div>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                    Total Coverage
                                                </p>
                                                <p className="font-semibold">
                                                    ₱
                                                    {insurance.coverage_amount.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Status Summary */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Status Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            Current Status
                                        </span>
                                        <Badge className={config.color}>
                                            {insurance.status}
                                        </Badge>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            Policy Status
                                        </span>
                                        <Badge
                                            variant="outline"
                                            className={
                                                isExpired
                                                    ? 'border-red-600 text-red-600'
                                                    : 'border-green-600 text-green-600'
                                            }
                                        >
                                            {isExpired ? 'Expired' : 'Active'}
                                        </Badge>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            Submitted On
                                        </span>
                                        <span className="text-sm font-semibold">
                                            {new Date(
                                                insurance.created_at,
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
