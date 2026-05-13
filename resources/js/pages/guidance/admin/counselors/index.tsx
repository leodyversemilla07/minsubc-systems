import { Head, Link } from '@inertiajs/react';
import { Plus, Edit, Trash2, Users } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function CounselorIndex({ counselors }: { counselors: any[] }) {
    return (
        <AppLayout>
            <Head title="Counselors" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Counselors</h1>
                    <Link href={route('guidance.admin.counselors.create')}>
                        <Button><Plus className="mr-2 h-4 w-4" /> Add Counselor</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader><CardTitle><Users className="mr-2 inline h-5 w-5" />All Counselors</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Specialization</TableHead>
                                    <TableHead>Available</TableHead>
                                    <TableHead>Appointments</TableHead>
                                    <TableHead className="w-24">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {counselors.map((c: any) => (
                                    <TableRow key={c.id}>
                                        <TableCell className="font-medium">{c.full_name ?? `${c.first_name} ${c.last_name}`}</TableCell>
                                        <TableCell>{c.email}</TableCell>
                                        <TableCell className="max-w-xs truncate">{c.specialization ?? '—'}</TableCell>
                                        <TableCell><span className={`inline-block h-2.5 w-2.5 rounded-full ${c.is_available ? 'bg-green-500' : 'bg-red-400'}`} /></TableCell>
                                        <TableCell>{c.appointments_count ?? c.appointments?.length ?? 0}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Link href={route('guidance.admin.counselors.edit', c.id)}>
                                                    <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                                                </Link>
                                                <Link as="button" method="delete" href={route('guidance.admin.counselors.destroy', c.id)} onClick={(e: any) => { if (!confirm('Delete this counselor?')) e.preventDefault(); }}>
                                                    <Button variant="ghost" size="icon" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {counselors.length === 0 && (
                                    <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No counselors found.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}