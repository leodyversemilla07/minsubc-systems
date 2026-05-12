import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Edit({ publication }: { publication: any }) {
    const { data, setData, put, processing, errors } = useForm({
        title: publication.title,
        type: publication.type ?? '',
        publication_year: String(publication.publication_year ?? ''),
        abstract: publication.abstract ?? '',
        doi: publication.doi ?? '',
        publisher: publication.publisher ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('research.admin.publications.update', publication.id));
    };

    return (
        <AppLayout>
            <Head title="Edit Publication" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('research.admin.publications.index')}>
                        <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Edit Publication</h1>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader><CardTitle>Publication Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="type">Type</Label>
                                    <Select value={data.type} onValueChange={(v) => setData('type', v)}>
                                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="journal">Journal</SelectItem>
                                            <SelectItem value="conference">Conference</SelectItem>
                                            <SelectItem value="book">Book Chapter</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="publication_year">Year</Label>
                                    <Input id="publication_year" type="number" value={data.publication_year} onChange={(e) => setData('publication_year', e.target.value)} />
                                    {errors.publication_year && <p className="mt-1 text-sm text-red-600">{errors.publication_year}</p>}
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="abstract">Abstract</Label>
                                <Textarea id="abstract" value={data.abstract} onChange={(e) => setData('abstract', e.target.value)} rows={4} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="doi">DOI</Label>
                                    <Input id="doi" value={data.doi} onChange={(e) => setData('doi', e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="publisher">Publisher</Label>
                                    <Input id="publisher" value={data.publisher} onChange={(e) => setData('publisher', e.target.value)} />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Update</Button>
                                <Link href={route('research.admin.publications.index')}>
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