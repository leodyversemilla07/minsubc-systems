import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft, MessageSquare } from 'lucide-react';

interface Props extends PageProps {
    feedback: {
        id: number; rating: number; comment: string | null; created_at: string;
        voter: { id: number; name: string; student_id?: string } | null;
        election: { id: number; title: string; election_type: string } | null;
    };
}

export default function FeedbackShow({ feedback }: Props) {
    return (
        <AppLayout>
            <Head title="Feedback Detail" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('feedback.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
                    <h1 className="text-2xl font-bold flex items-center gap-2"><MessageSquare className="h-6 w-6" /> Feedback Detail</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader><CardTitle>Feedback</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-2">
                                <p className="text-lg font-medium">Rating:</p>
                                <div className="flex">
                                    {[1,2,3,4,5].map(s => (
                                        <span key={s} className={`text-xl ${s <= feedback.rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                                    ))}
                                </div>
                            </div>
                            <p><span className="text-muted-foreground">Submitted:</span> {feedback.created_at}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Voter Info</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                            <p><span className="text-muted-foreground">Name:</span> {feedback.voter?.name ?? 'Anonymous'}</p>
                            <p><span className="text-muted-foreground">Student ID:</span> {feedback.voter?.student_id ?? '-'}</p>
                        </CardContent>
                    </Card>

                    {feedback.election && (
                        <Card>
                            <CardHeader><CardTitle>Election</CardTitle></CardHeader>
                            <CardContent className="space-y-2">
                                <p><span className="text-muted-foreground">Title:</span> {feedback.election.title}</p>
                                <p><span className="text-muted-foreground">Type:</span> <Badge variant="outline">{feedback.election.election_type}</Badge></p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {feedback.comment && (
                    <Card>
                        <CardHeader><CardTitle>Comment</CardTitle></CardHeader>
                        <CardContent><p className="whitespace-pre-wrap">{feedback.comment}</p></CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}