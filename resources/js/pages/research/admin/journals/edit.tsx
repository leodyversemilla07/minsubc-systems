import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Edit({ journal }: { journal: any }) {
    const { data, setData, put, processing, errors } = useForm({
        title: journal.title,
        issn: journal.issn ?? '',
        description: journal.description ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('research.admin.journals.update', journal.id));
    };

    return (
        <AppLayout>
            <Head title="Edit Journal" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('research.admin.journals.index')}>
                        <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Edit Journal</h1>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader><CardTitle>Journal Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                            </div>
                            <div>
                                <Label htmlFor="issn">ISSN</Label>
                                <Input id="issn" value={data.issn} onChange={(e) => setData('issn', e.target.value)} />
                                {errors.issn && <p className="mt-1 text-sm text-red-600">{errors.issn}</p>}
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} rows={4} />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Update</Button>
                                <Link href={route('research.admin.journals.index')}>
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