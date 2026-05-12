import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProposalOption {
    id: number;
    title: string;
}

export default function Create({ proposals }: { proposals: ProposalOption[] }) {
    const { data, setData, post, processing, errors } = useForm({
        proposal_id: '',
        scheduled_date: '',
        room: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('research.admin.defenses.store'));
    };

    return (
        <AppLayout>
            <Head title="Schedule Defense" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('research.admin.defenses.index')}>
                        <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Schedule Defense</h1>
                </div>

                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Defense Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="proposal_id">Proposal</Label>
                                <Select value={data.proposal_id} onValueChange={(v) => setData('proposal_id', v)}>
                                    <SelectTrigger><SelectValue placeholder="Select proposal" /></SelectTrigger>
                                    <SelectContent>
                                        {proposals.map((p) => (
                                            <SelectItem key={p.id} value={String(p.id)}>{p.title}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.proposal_id && <p className="mt-1 text-sm text-red-600">{errors.proposal_id}</p>}
                            </div>
                            <div>
                                <Label htmlFor="scheduled_date">Scheduled Date</Label>
                                <Input id="scheduled_date" type="datetime-local" value={data.scheduled_date} onChange={(e) => setData('scheduled_date', e.target.value)} />
                                {errors.scheduled_date && <p className="mt-1 text-sm text-red-600">{errors.scheduled_date}</p>}
                            </div>
                            <div>
                                <Label htmlFor="room">Room</Label>
                                <Input id="room" value={data.room} onChange={(e) => setData('room', e.target.value)} placeholder="e.g. Room 301" />
                                {errors.room && <p className="mt-1 text-sm text-red-600">{errors.room}</p>}
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('research.admin.defenses.index')}>
                                    <Button variant="outline">Cancel</Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}