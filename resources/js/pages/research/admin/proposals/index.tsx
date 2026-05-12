import { Head, Link, useForm } from '@inertiajs/react';
import { FileText, Eye, Edit, Plus, ArrowLeft, Save, Search, CheckCircle, Send, UserCheck } from 'lucide-react';
import { useState } from 'react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ResearchType {
    id: number;
    name: string;
}

export default function Index({ proposals, researchTypes }: { proposals: any[]; researchTypes: ResearchType[] }) {
    return (
        <AppLayout>
            <Head title="Proposals" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Proposals / Theses</h1>
                    <Link href={route('research.admin.proposals.create')}>
                        <Button><Plus className="mr-2 h-4 w-4" /> New Proposal</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader><CardTitle><FileText className="mr-2 inline h-5 w-5" />All Proposals</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Adviser</TableHead>
                                    <TableHead>Authors</TableHead>
                                    <TableHead className="w-32">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {proposals.map((p: any) => (
                                    <TableRow key={p.id}>
                                        <TableCell className="max-w-xs truncate font-medium">{p.title}</TableCell>
                                        <TableCell>{p.research_type?.name ?? '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                                p.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                p.status === 'submitted' ? 'bg-yellow-100 text-yellow-800' :
                                                p.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                                p.status === 'completed' ? 'bg-purple-100 text-purple-800' :
                                                p.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>{p.status}</span>
                                        </TableCell>
                                        <TableCell>{p.adviser?.name ?? '—'}</TableCell>
                                        <TableCell>{p.authors?.length ?? 0}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Link href={route('research.admin.proposals.show', p.id)}>
                                                    <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                                                </Link>
                                                <Link href={route('research.admin.proposals.edit', p.id)}>
                                                    <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {proposals.length === 0 && (
                                    <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No proposals found.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}