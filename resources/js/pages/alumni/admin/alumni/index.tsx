import { Head, Link } from '@inertiajs/react';
import { Plus, Users } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Alumnus {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    graduation_year: number | null;
    degree_program: string | null;
    is_employed: boolean;
    is_verified: boolean;
}

export default function AlumniIndex({ alumni }: { alumni: { data: Alumnus[] } }) {
    return (
        <AppLayout>
            <Head title="Alumni" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold"><Users className="mr-2 inline h-6 w-6" />Alumni</h1>
                    <Link href={route('alumni.admin.alumni.create')}><Button><Plus className="mr-2 h-4 w-4" /> Add Alumnus</Button></Link>
                </div>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Graduation Year</TableHead>
                                    <TableHead>Program</TableHead>
                                    <TableHead className="text-center">Employed</TableHead>
                                    <TableHead className="text-center">Verified</TableHead>
                                    <TableHead className="w-24">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {alumni.data?.map((a) => (
                                    <TableRow key={a.id}>
                                        <TableCell className="font-medium">{a.first_name} {a.last_name}</TableCell>
                                        <TableCell>{a.email}</TableCell>
                                        <TableCell>{a.graduation_year ?? '—'}</TableCell>
                                        <TableCell>{a.degree_program ?? '—'}</TableCell>
                                        <TableCell className="text-center">{a.is_employed ? '✅' : '❌'}</TableCell>
                                        <TableCell className="text-center">{a.is_verified ? '✅' : '—'}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Link href={route('alumni.admin.alumni.show', a.id)}><Button variant="ghost" size="sm">View</Button></Link>
                                                <Link href={route('alumni.admin.alumni.edit', a.id)}><Button variant="ghost" size="sm">Edit</Button></Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {(!alumni.data || alumni.data.length === 0) && <TableRow><TableCell colSpan={7} className="py-8 text-center text-muted-foreground">No alumni found.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}