import { Head, Link } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Tags } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ResearchType {
    id: number;
    name: string;
    description: string | null;
    proposals_count?: number;
}

export default function Index({ researchTypes }: { researchTypes: ResearchType[] }) {
    return (
        <AppLayout>
            <Head title="Research Types" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Research Types</h1>
                    <Link href={route('research.admin.research-types.create')}>
                        <Button><Plus className="mr-2 h-4 w-4" /> Add Research Type</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader><CardTitle><Tags className="mr-2 inline h-5 w-5" />All Research Types</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Proposals</TableHead>
                                    <TableHead className="w-24">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {researchTypes.map((rt) => (
                                    <TableRow key={rt.id}>
                                        <TableCell className="font-medium">{rt.name}</TableCell>
                                        <TableCell className="text-muted-foreground max-w-xs truncate">{rt.description ?? '—'}</TableCell>
                                        <TableCell>{rt.proposals_count ?? 0}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Link href={route('research.admin.research-types.edit', rt.id)}>
                                                    <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                                                </Link>
                                                <Button variant="ghost" size="icon" className="text-red-600" onClick={() => { if (confirm('Delete this research type?')) { /* handle delete */ } }}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {researchTypes.length === 0 && (
                                    <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No research types found.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}