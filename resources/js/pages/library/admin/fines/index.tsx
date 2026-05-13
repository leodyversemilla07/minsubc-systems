import { Head, Link } from '@inertiajs/react';
import { DollarSign, CheckCircle } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function FineIndex({ fines }: { fines: any[] }) {
    return (
        <AppLayout>
            <Head title="Fines" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><DollarSign className="mr-2 inline h-6 w-6" />Fines</h1>
                <Card>
                    <CardHeader><CardTitle>All Fines</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Book</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Paid</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-28">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {fines.map((f: any) => (
                                    <TableRow key={f.id}>
                                        <TableCell className="font-medium">{f.borrowing?.user?.name ?? f.student_id ?? '—'}</TableCell>
                                        <TableCell className="max-w-xs truncate">{f.borrowing?.book?.title ?? '—'}</TableCell>
                                        <TableCell className="font-bold">₱{Number(f.amount).toLocaleString()}</TableCell>
                                        <TableCell>{f.paid_amount ? `₱${Number(f.paid_amount).toLocaleString()}` : '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${f.status === 'paid' ? 'bg-green-100 text-green-800' : f.status === 'waived' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'}`}>{f.status}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                {f.status === 'unpaid' && (
                                                    <>
                                                        <Link as="button" method="post" href={route('library.admin.fines.pay', f.id)}>
                                                            <Button variant="ghost" size="icon" title="Pay"><CheckCircle className="h-4 w-4 text-green-600" /></Button>
                                                        </Link>
                                                        <Link as="button" method="post" href={route('library.admin.fines.waive', f.id)}>
                                                            <Button variant="ghost" size="icon" title="Waive" className="text-gray-500"><DollarSign className="h-4 w-4" /></Button>
                                                        </Link>
                                                    </>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {fines.length === 0 && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No fines found.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}