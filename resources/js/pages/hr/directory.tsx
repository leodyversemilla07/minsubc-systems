import { Head, Link } from '@inertiajs/react';
import { Users, Search, Eye, Mail, Phone } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Directory({ employees }: { employees: any[] }) {
    return (
        <AppLayout>
            <Head title="Employee Directory" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><Users className="mr-2 inline h-6 w-6" />Employee Directory</h1>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="w-16">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {employees.map((e: any) => (
                                    <TableRow key={e.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">{e.first_name?.[0]}{e.last_name?.[0]}</span>
                                                <span className="font-medium">{e.first_name} {e.last_name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{e.department?.name ?? '—'}</TableCell>
                                        <TableCell>{e.position?.title ?? '—'}</TableCell>
                                        <TableCell className="text-muted-foreground">{e.email}</TableCell>
                                        <TableCell>
                                            <Link href={route('hr.employees.show', e.id)}>
                                                <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {employees.length === 0 && <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">No employees found.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}