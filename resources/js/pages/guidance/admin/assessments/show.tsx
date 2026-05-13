import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Printer, FileText } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';

export default function AssessmentShow({ assessment }: { assessment: any }) {
    const { data, setData, post, processing } = useForm({ review_notes: '' });
    const submitReview = (e: React.FormEvent) => { e.preventDefault(); post(route('guidance.admin.assessments.review', assessment.id)); };

    return (
        <AppLayout>
            <Head title="Assessment Details" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('guidance.admin.assessments.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Assessment Details</h1>
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        assessment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        assessment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        assessment.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                    }`}>{assessment.status}</span>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold"><FileText className="mr-2 inline h-5 w-5" />Assessment Info</h2>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between"><dt className="text-muted-foreground">Student</dt><dd className="font-medium">{assessment.student?.name ?? assessment.student_id ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Type</dt><dd className="capitalize">{assessment.assessment_type ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Submitted</dt><dd>{assessment.submitted_at ?? 'Not yet'}</dd></div>
                        </dl>
                    </Card>

                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Actions</h2>
                        <div className="flex gap-2">
                            <Link href={route('guidance.admin.assessments.print', assessment.id)}>
                                <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Print Report</Button>
                            </Link>
                        </div>
                    </Card>
                </div>

                {assessment.responses && (
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Responses</h2>
                        {typeof assessment.responses === 'object' ? (
                            <div className="space-y-2 text-sm">
                                {Object.entries(assessment.responses).map(([key, value]) => (
                                    <div key={key} className="flex gap-2">
                                        <span className="font-medium min-w-32">{key}:</span>
                                        <span className="text-muted-foreground">{String(value)}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground text-sm whitespace-pre-wrap">{assessment.responses}</p>
                        )}
                    </Card>
                )}

                {assessment.review_notes && (
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Review Notes</h2>
                        <p className="text-muted-foreground text-sm">{assessment.review_notes}</p>
                    </Card>
                )}

                {assessment.status === 'pending' && (
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Review Assessment</h2>
                        <form onSubmit={submitReview} className="space-y-4">
                            <Textarea value={data.review_notes} onChange={(e) => setData('review_notes', e.target.value)} rows={3} placeholder="Add review notes..." />
                            <Button type="submit" disabled={processing}>Submit Review</Button>
                        </form>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}