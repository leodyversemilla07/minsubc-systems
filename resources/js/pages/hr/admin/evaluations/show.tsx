import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

interface EvaluationShowProps {
    evaluation: {
        id: number;
        type: string;
        period: string;
        rating: number | null;
        comments: string | null;
        status: string;
        submitted_at: string | null;
        employee?: {
            first_name: string;
            last_name: string;
            employee_id: string;
        } | null;
        evaluator?: { first_name: string; last_name: string } | null;
    };
}

export default function EvaluationShow({ evaluation }: EvaluationShowProps) {
    return (
        <AppLayout>
            <Head title={`Evaluation — ${evaluation.period}`} />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('hr.admin.evaluations.index')}>
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">
                        <Star className="mr-2 inline h-6 w-6" />
                        {evaluation.employee?.first_name}{' '}
                        {evaluation.employee?.last_name} — {evaluation.period}
                    </h1>
                    <Badge
                        variant={
                            evaluation.status === 'completed'
                                ? 'default'
                                : 'secondary'
                        }
                    >
                        {evaluation.status}
                    </Badge>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p>
                                <span className="font-medium">
                                    Employee ID:
                                </span>{' '}
                                {evaluation.employee?.employee_id ?? '—'}
                            </p>
                            <p>
                                <span className="font-medium">Type:</span>{' '}
                                {evaluation.type}
                            </p>
                            <p>
                                <span className="font-medium">Period:</span>{' '}
                                {evaluation.period}
                            </p>
                            <p>
                                <span className="font-medium">Evaluator:</span>{' '}
                                {evaluation.evaluator
                                    ? `${evaluation.evaluator.first_name} ${evaluation.evaluator.last_name}`
                                    : '—'}
                            </p>
                            <p>
                                <span className="font-medium">Submitted:</span>{' '}
                                {evaluation.submitted_at ?? '—'}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Result</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p>
                                <span className="font-medium">Rating:</span>{' '}
                                {evaluation.rating != null
                                    ? `${evaluation.rating} / 5`
                                    : '—'}
                            </p>
                            <p>
                                <span className="font-medium">Comments:</span>
                            </p>
                            <p className="text-muted-foreground">
                                {evaluation.comments ?? 'No comments.'}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
