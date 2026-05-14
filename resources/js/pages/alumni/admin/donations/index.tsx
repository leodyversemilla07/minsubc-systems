import { Head, Link } from '@inertiajs/react';
import { DollarSign } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function DonationIndex({ donations }: { donations: any }) {
    return (
        <AppLayout>
            <Head title="Donations" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold"><DollarSign className="mr-2 inline h-6 w-6" />Donations</h1>
                    <Link href={route('alumni.admin.donations.create')}><Button>Record Donation</Button></Link>
                </div>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Donor</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Purpose</TableHead>
                                    <TableHead>Method</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="w-20">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {donations.data?.map((d: any) => (
                                    <TableRow key={d.id}>
                                        <TableCell className="font-medium">{d.alumnus?.first_name} {d.alumnus?.last_name}</TableCell>
                                        <TableCell className="font-bold">₱{Number(d.amount).toLocaleString()}</TableCell>
                                        <TableCell className="capitalize">{d.purpose ?? '—'}</TableCell>
                                        <TableCell>{d.payment_method ?? '—'}</TableCell>
                                        <TableCell>{d.donated_at ?? '—'}</TableCell>
                                        <TableCell><Link href={route('alumni.admin.donations.show', d.id)}><Button variant="ghost" size="sm">View</Button></Link></TableCell>
                                    </TableRow>
                                ))}
                                {(!donations.data || donations.data.length === 0) && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No donations recorded.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}