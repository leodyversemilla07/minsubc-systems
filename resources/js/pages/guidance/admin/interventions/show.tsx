import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Users, Activity, Save } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function InterventionShow({ intervention }: { intervention: any }) {
    const { data, setData, post, processing } = useForm({ participant_id: '' });

    const addParticipant = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('guidance.admin.interventions.manage-participants', intervention.id));
    };

    return (
        <AppLayout>
            <Head title={intervention.title} />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('guidance.admin.interventions.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">{intervention.title}</h1>
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        intervention.status === 'completed' ? 'bg-green-100 text-green-800' :
                        intervention.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                    }`}>{intervention.status}</span>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold"><Activity className="mr-2 inline h-5 w-5" />Details</h2>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between"><dt className="text-muted-foreground">Type</dt><dd className="capitalize">{intervention.intervention_type ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Status</dt><dd className="capitalize">{intervention.status}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Start Date</dt><dd>{intervention.start_date ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">End Date</dt><dd>{intervention.end_date ?? '—'}</dd></div>
                        </dl>
                    </Card>

                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Actions</h2>
                        <Link as="button" method="post" href={route('guidance.admin.interventions.manage-participants', intervention.id)}>
                            <Button variant="outline" size="sm"><Users className="mr-2 h-4 w-4" /> Manage Participants</Button>
                        </Link>
                    </Card>
                </div>

                {intervention.description && (
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Description</h2>
                        <p className="text-muted-foreground text-sm whitespace-pre-wrap">{intervention.description}</p>
                    </Card>
                )}

                <Card className="p-6">
                    <CardTitle className="mb-4 text-lg"><Users className="mr-2 inline h-5 w-5" />Participants ({intervention.participants?.length ?? 0})</CardTitle>
                    {intervention.participants?.length ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Participant</TableHead>
                                    <TableHead>Role</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {intervention.participants.map((p: any) => (
                                    <TableRow key={p.id}>
                                        <TableCell className="font-medium">{p.student?.name ?? p.student_id ?? '—'}</TableCell>
                                        <TableCell className="capitalize">{p.role ?? 'Member'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : <p className="text-muted-foreground text-sm">No participants yet.</p>}
                </Card>
            </div>
        </AppLayout>
    );
}