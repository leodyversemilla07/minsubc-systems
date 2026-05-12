import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, Send, CheckCircle, UserPlus, Users } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Author {
    id: number;
    name: string;
    email?: string;
}

interface Panel {
    id: number;
    panelist: { id: number; name: string } | null;
    role: string;
}

export default function Show({ proposal }: { proposal: any }) {
    return (
        <AppLayout>
            <Head title={proposal.title} />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('research.admin.proposals.index')}>
                        <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
                    </Link>
                    <h1 className="text-2xl font-bold">{proposal.title}</h1>
                    <Badge className={proposal.status === 'approved' ? 'bg-green-100 text-green-800' : proposal.status === 'submitted' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}>{proposal.status}</Badge>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Details</h2>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between"><dt className="text-muted-foreground">Research Type</dt><dd>{proposal.research_type?.name ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Adviser</dt><dd>{proposal.adviser?.name ?? 'Not assigned'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Status</dt><dd>{proposal.status}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Created</dt><dd>{proposal.created_at}</dd></div>
                        </dl>
                    </Card>

                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Actions</h2>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm"><Send className="mr-2 h-4 w-4" /> Submit</Button>
                            <Button variant="outline" size="sm"><CheckCircle className="mr-2 h-4 w-4" /> Approve</Button>
                            <Button variant="outline" size="sm"><UserPlus className="mr-2 h-4 w-4" /> Assign Adviser</Button>
                            <Link href={route('research.admin.proposals.edit', proposal.id)}>
                                <Button variant="outline" size="sm"><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                            </Link>
                        </div>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Abstract</h2>
                        <p className="text-muted-foreground text-sm">{proposal.abstract ?? 'No abstract provided.'}</p>
                    </Card>

                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold"><Users className="mr-2 inline h-5 w-5" />Authors ({proposal.authors?.length ?? 0})</h2>
                        {proposal.authors?.length ? (
                            <ul className="space-y-1 text-sm">
                                {proposal.authors.map((a: Author) => (
                                    <li key={a.id} className="flex items-center gap-2">
                                        <span>{a.name}</span>
                                        {a.email && <span className="text-muted-foreground">({a.email})</span>}
                                    </li>
                                ))}
                            </ul>
                        ) : <p className="text-muted-foreground text-sm">No authors added yet.</p>}
                    </Card>
                </div>

                <Card className="p-6">
                    <CardTitle className="mb-4 text-lg">Panels</CardTitle>
                    {proposal.panels?.length ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Panelist</TableHead>
                                    <TableHead>Role</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {proposal.panels.map((p: Panel) => (
                                    <TableRow key={p.id}>
                                        <TableCell>{p.panelist?.name ?? '—'}</TableCell>
                                        <TableCell className="capitalize">{p.role ?? 'Member'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : <p className="text-muted-foreground text-sm">No panels assigned yet.</p>}
                </Card>
            </div>
        </AppLayout>
    );
}