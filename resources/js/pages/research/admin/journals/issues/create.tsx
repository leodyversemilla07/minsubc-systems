import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Create({ journal }: { journal: any }) {
    const { data, setData, post, processing, errors } = useForm({
        volume: '',
        issue_number: '',
        publication_date: '',
        status: 'draft',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('research.admin.journals.issues.store', journal.id));
    };

    return (
        <AppLayout>
            <Head title="Add Issue" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('research.admin.journals.show', journal.id)}>
                        <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Add Issue to {journal.title}</h1>
                </div>

                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Issue Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="volume">Volume</Label>
                                    <Input id="volume" value={data.volume} onChange={(e) => setData('volume', e.target.value)} placeholder="e.g. 1" />
                                    {errors.volume && <p className="mt-1 text-sm text-red-600">{errors.volume}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="issue_number">Issue Number</Label>
                                    <Input id="issue_number" value={data.issue_number} onChange={(e) => setData('issue_number', e.target.value)} placeholder="e.g. 1" />
                                    {errors.issue_number && <p className="mt-1 text-sm text-red-600">{errors.issue_number}</p>}
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="publication_date">Publication Date</Label>
                                <Input id="publication_date" type="date" value={data.publication_date} onChange={(e) => setData('publication_date', e.target.value)} />
                                {errors.publication_date && <p className="mt-1 text-sm text-red-600">{errors.publication_date}</p>}
                            </div>
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Select value={data.status} onValueChange={(v) => setData('status', v)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('research.admin.journals.show', journal.id)}>
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