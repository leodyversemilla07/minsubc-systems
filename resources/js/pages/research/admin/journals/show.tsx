import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, BookCheck, Plus } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface JournalIssue {
    id: number;
    volume: string | null;
    issue_number: string | null;
    publication_date: string | null;
    status: string;
}

export default function Show({ journal, issues }: { journal: any; issues: JournalIssue[] }) {
    return (
        <AppLayout>
            <Head title={journal.title} />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('research.admin.journals.index')}>
                        <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
                    </Link>
                    <h1 className="text-2xl font-bold">{journal.title}</h1>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Details</h2>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between"><dt className="text-muted-foreground">ISSN</dt><dd className="font-mono">{journal.issn ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Description</dt><dd>{journal.description ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Issues</dt><dd>{issues.length}</dd></div>
                        </dl>
                    </Card>

                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Actions</h2>
                        <Link href={route('research.admin.journals.issues.create', journal.id)}>
                            <Button size="sm"><Plus className="mr-2 h-4 w-4" /> Add Issue</Button>
                        </Link>
                    </Card>
                </div>

                <Card className="p-6">
                    <CardTitle className="mb-4 text-lg"><BookCheck className="mr-2 inline h-5 w-5" />Issues</CardTitle>
                    {issues.length ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Volume</TableHead>
                                    <TableHead>Issue</TableHead>
                                    <TableHead>Publication Date</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {issues.map((i) => (
                                    <TableRow key={i.id}>
                                        <TableCell>{i.volume ?? '—'}</TableCell>
                                        <TableCell>{i.issue_number ?? '—'}</TableCell>
                                        <TableCell>{i.publication_date ?? '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                                i.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>{i.status}</span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : <p className="text-muted-foreground text-sm">No issues yet.</p>}
                </Card>
            </div>
        </AppLayout>
    );
}