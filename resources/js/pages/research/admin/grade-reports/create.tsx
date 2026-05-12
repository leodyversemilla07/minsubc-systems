import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProposalOption {
    id: number;
    title: string;
}

export default function Create({ proposals }: { proposals: ProposalOption[] }) {
    const { data, setData, post, processing, errors } = useForm({
        proposal_id: '',
        grade: '',
        remarks: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('research.admin.grade-reports.store'));
    };

    return (
        <AppLayout>
            <Head title="Add Grade Report" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('research.admin.grade-reports.index')}>
                        <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Add Grade Report</h1>
                </div>

                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Grade Report Details</CardTitle></CardHeader>
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
                                <Label htmlFor="grade">Grade</Label>
                                <Input id="grade" type="number" step="0.5" min="1.0" max="5.0" value={data.grade} onChange={(e) => setData('grade', e.target.value)} placeholder="e.g. 1.5" />
                                {errors.grade && <p className="mt-1 text-sm text-red-600">{errors.grade}</p>}
                            </div>
                            <div>
                                <Label htmlFor="remarks">Remarks</Label>
                                <Textarea id="remarks" value={data.remarks} onChange={(e) => setData('remarks', e.target.value)} placeholder="Optional remarks" />
                                {errors.remarks && <p className="mt-1 text-sm text-red-600">{errors.remarks}</p>}
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('research.admin.grade-reports.index')}>
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