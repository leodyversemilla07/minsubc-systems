import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';


import { type PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import {
    ArrowLeft,
    Shield,
    ShieldCheck,
    ShieldAlert,
    Search,
} from 'lucide-react';
import { useState } from 'react';

interface VerificationResult {
    verified: boolean;
    message: string;
    student_id: string;
    name: string;
    total_semesters: number;
    last_updated: string | null;
    course: string;
    cumulative_gpa: number;
}

interface VerifyPageProps extends PageProps {
    verification?: VerificationResult;
}

export default function TranscriptVerify({ verification }: VerifyPageProps) {
    const [searchId, setSearchId] = useState('');

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admission.admin.transcripts.verify'), { student_id: searchId });
    };

    return (
        <>
            <Head title="Verify Transcript" />

            <div className="space-y-6 max-w-3xl mx-auto">
                <div>
                    <Link
                        href={route('admission.admin.transcripts.index')}
                        className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Transcripts
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">Verify Transcript</h1>
                    <p className="text-muted-foreground">Verify the authenticity of a student's transcript</p>
                </div>

                {/* Verify Form */}
                <Card>
                    <CardContent className="p-6">
                        <form onSubmit={handleVerify} className="flex gap-4">
                            <div className="flex-1">
                                <Input
                                    type="text"
                                    placeholder="Enter Student ID (e.g., MSU2024-0001)"
                                    value={searchId}
                                    onChange={(e) => setSearchId(e.target.value)}
                                    className="text-lg"
                                    required
                                />
                            </div>
                            <Button type="submit">
                                <Search className="mr-2 h-4 w-4" />
                                Verify
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {verification && verification.verified && (
                    <Card>
                        <div className="border-b border-green-200 bg-green-50 px-6 py-4 dark:border-green-900 dark:bg-green-950/30">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="h-8 w-8 text-green-600" />
                                <div>
                                    <h3 className="text-lg font-bold text-green-800 dark:text-green-200">Transcript Verified</h3>
                                    <p className="text-sm text-green-600 dark:text-green-400">{verification.message}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <dl className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Student ID</dt>
                                    <dd className="text-lg font-semibold">{verification.student_id}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Student Name</dt>
                                    <dd className="text-lg font-semibold">{verification.name}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Course</dt>
                                    <dd className="text-lg font-semibold">{verification.course || 'N/A'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Cumulative GPA</dt>
                                    <dd className="text-lg font-semibold">{verification.cumulative_gpa?.toFixed(2) ?? 'N/A'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Total Semesters</dt>
                                    <dd className="text-lg font-semibold">{verification.total_semesters}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Last Updated</dt>
                                    <dd className="text-lg font-semibold">
                                        {verification.last_updated
                                            ? new Date(verification.last_updated).toLocaleDateString('en-US', {
                                                  year: 'numeric',
                                                  month: 'short',
                                                  day: 'numeric',
                                              })
                                            : 'N/A'}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        <div className="border-t bg-muted/30 px-6 py-4">
                            <p className="text-xs text-muted-foreground">
                                <Shield className="mr-1 inline h-4 w-4" />
                                Verification timestamp: {new Date().toLocaleString()}
                            </p>
                        </div>
                    </Card>
                )}

                {verification && !verification.verified && (
                    <div className="rounded-xl border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30">
                        <div className="p-6">
                            <div className="flex items-center gap-3">
                                <ShieldAlert className="h-8 w-8 text-red-600" />
                                <div>
                                    <h3 className="text-lg font-bold text-red-800 dark:text-red-200">Verification Failed</h3>
                                    <p className="text-sm text-red-600 dark:text-red-400">{verification.message}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {!verification && (
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="mb-4 text-lg font-medium">How to Verify</h3>
                            <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                                <li>Enter the student's official ID number in the field above</li>
                                <li>Click the "Verify" button</li>
                                <li>The system will confirm if the transcript is valid and show student details</li>
                            </ol>
                            <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
                                <p className="text-sm text-blue-800 dark:text-blue-200">
                                    <strong>Note:</strong> This verification system confirms that the transcript was generated
                                    by MinSU BC Systems and has not been tampered with.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}

TranscriptVerify.layout = (page: React.ReactNode) => <AppLayout children={page} />;