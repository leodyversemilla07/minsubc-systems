import { Head, Link } from '@inertiajs/react';
import { BookOpen, Plus, Edit, Trash2 } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ProgramIndex({ programs }: { programs: any[] }) {
    return (
        <AppLayout>
            <Head title="Programs" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Programs</h1>
                    <Link href={route('curriculum.admin.programs.create')}><Button><Plus className="mr-2 h-4 w-4" /> Add Program</Button></Link>
                </div>
                <Card>
                    <CardHeader><CardTitle><BookOpen className="mr-2 inline h-5 w-5" />All Programs</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Active</TableHead>
                                    <TableHead className="text-right">Curricula</TableHead>
                                    <TableHead className="text-right">Outcomes</TableHead>
                                    <TableHead className="w-24">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {programs.map((p: any) => (
                                    <TableRow key={p.id}>
                                        <TableCell className="font-mono text-sm">{p.code}</TableCell>
                                        <TableCell className="font-medium">{p.name}</TableCell>
                                        <TableCell><span className={`inline-block h-2.5 w-2.5 rounded-full ${p.is_active ? 'bg-green-500' : 'bg-red-400'}`} /></TableCell>
                                        <TableCell className="text-right">{p.curricula_count ?? p.curricula?.length ?? 0}</TableCell>
                                        <TableCell className="text-right">{p.outcomes_count ?? p.outcomes?.length ?? 0}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Link href={route('curriculum.admin.programs.edit', p.id)}><Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button></Link>
                                                <Link as="button" method="delete" href={route('curriculum.admin.programs.destroy', p.id)} onClick={(e: any) => { if (!confirm('Delete this program?')) e.preventDefault(); }}>
                                                    <Button variant="ghost" size="icon" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {programs.length === 0 && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No programs found.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}