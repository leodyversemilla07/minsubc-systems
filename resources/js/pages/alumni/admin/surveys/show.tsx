import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, FileText, ListChecks } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function SurveyShow({ survey }: { survey: any }) {
    return (
        <AppLayout>
            <Head title={survey.title} />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('alumni.admin.surveys.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">{survey.title}</h1>
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${survey.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{survey.is_active ? 'Active' : 'Inactive'}</span>
                </div>
                <Card className="p-6">
                    <h2 className="mb-2 text-lg font-semibold"><ListChecks className="mr-2 inline h-5 w-5" />Questions</h2>
                    {survey.questions?.length > 0 ? (
                        <ul className="space-y-3">
                            {survey.questions.map((q: any, i: number) => (
                                <li key={q.id} className="rounded-lg border p-3 text-sm">
                                    <span className="font-medium">Q{i + 1}.</span> {q.question_text}
                                    <span className="ml-2 text-xs text-muted-foreground">({q.question_type})</span>
                                </li>
                            ))}
                        </ul>
                    ) : <p className="text-sm text-muted-foreground">No questions added yet.</p>}
                </Card>
            </div>
        </AppLayout>
    );
}