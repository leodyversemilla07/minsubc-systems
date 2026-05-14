import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, ArrowLeft, Save, Briefcase } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function EmploymentRecordsIndex({ records }: { records: any }) {
    return (
        <AppLayout>
            <Head title="Employment Records" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold"><Briefcase className="mr-2 inline h-6 w-6" />Employment Records</h1>
                    <Link href={route('alumni.admin.employment-records.create')}><Button><Plus className="mr-2 h-4 w-4" /> Add Record</Button></Link>
                </div>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Alumnus</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Industry</TableHead>
                                    <TableHead className="text-center">Current</TableHead>
                                    <TableHead className="w-28">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {records.data?.map((r: any) => (
                                    <TableRow key={r.id}>
                                        <TableCell className="font-medium">{r.alumnus?.first_name} {r.alumnus?.last_name}</TableCell>
                                        <TableCell>{r.company_name}</TableCell>
                                        <TableCell>{r.position ?? '—'}</TableCell>
                                        <TableCell>{r.industry ?? '—'}</TableCell>
                                        <TableCell className="text-center">{r.is_current ? '✅' : '—'}</TableCell>
                                        <TableCell>
                                            <Link href={route('alumni.admin.employment-records.edit', r.id)}><Button variant="ghost" size="sm">Edit</Button></Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {(!records.data || records.data.length === 0) && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No employment records found.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}