import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ResearchType {
    id: number;
    name: string;
}

export default function Create({ researchTypes }: { researchTypes: ResearchType[] }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        abstract: '',
        research_type_id: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('research.admin.proposals.store'));
    };

    return (
        <AppLayout>
            <Head title="Create Proposal" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('research.admin.proposals.index')}>
                        <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Create Proposal</h1>
                </div>

                <Card className="max-w-3xl">
                    <CardHeader><CardTitle>Proposal Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Thesis/Research title" />
                                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                            </div>
                            <div>
                                <Label htmlFor="research_type_id">Research Type</Label>
                                <Select value={data.research_type_id} onValueChange={(v) => setData('research_type_id', v)}>
                                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                                    <SelectContent>
                                        {researchTypes.map((rt) => (
                                            <SelectItem key={rt.id} value={String(rt.id)}>{rt.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.research_type_id && <p className="mt-1 text-sm text-red-600">{errors.research_type_id}</p>}
                            </div>
                            <div>
                                <Label htmlFor="abstract">Abstract</Label>
                                <Textarea id="abstract" value={data.abstract} onChange={(e) => setData('abstract', e.target.value)} rows={6} placeholder="Brief description of the research" />
                                {errors.abstract && <p className="mt-1 text-sm text-red-600">{errors.abstract}</p>}
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('research.admin.proposals.index')}>
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