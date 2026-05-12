import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, BookOpen, Edit } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Author {
    id: number;
    name: string;
    email?: string;
    affiliation?: string;
}

export default function Show({ publication }: { publication: any }) {
    return (
        <AppLayout>
            <Head title={publication.title} />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('research.admin.publications.index')}>
                        <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
                    </Link>
                    <h1 className="text-2xl font-bold">{publication.title}</h1>
                    <span className="inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 capitalize">{publication.type}</span>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Details</h2>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between"><dt className="text-muted-foreground">Type</dt><dd className="capitalize">{publication.type ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Year</dt><dd>{publication.publication_year ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">DOI</dt><dd>{publication.doi ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Publisher</dt><dd>{publication.publisher ?? '—'}</dd></div>
                        </dl>
                    </Card>

                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold"><BookOpen className="mr-2 inline h-5 w-5" />Authors ({publication.authors?.length ?? 0})</h2>
                        {publication.authors?.length ? (
                            <ul className="space-y-2 text-sm">
                                {publication.authors.map((a: Author) => (
                                    <li key={a.id} className="flex items-center gap-2">
                                        <span className="font-medium">{a.name}</span>
                                        {a.affiliation && <span className="text-muted-foreground">({a.affiliation})</span>}
                                    </li>
                                ))}
                            </ul>
                        ) : <p className="text-muted-foreground text-sm">No authors added.</p>}
                    </Card>
                </div>

                <Card className="p-6">
                    <h2 className="mb-2 text-lg font-semibold">Abstract</h2>
                    <p className="text-muted-foreground text-sm">{publication.abstract ?? 'No abstract provided.'}</p>
                </Card>
            </div>
        </AppLayout>
    );
}