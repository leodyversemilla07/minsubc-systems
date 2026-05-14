import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, DollarSign, Users } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function DonationReport({ summary }: { summary: any }) {
    return (
        <AppLayout>
            <Head title="Donations Summary" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('alumni.admin.reports.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold"><DollarSign className="mr-2 inline h-6 w-6" />Donations Summary</h1>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="p-4"><p className="text-sm text-muted-foreground">Total Donations</p><p className="text-2xl font-bold">₱{Number(summary.total ?? 0).toLocaleString()}</p></Card>
                    <Card className="p-4"><p className="text-sm text-muted-foreground"><Users className="mr-1 inline h-4 w-4" />Donors</p><p className="text-2xl font-bold">{summary.donors_count ?? 0}</p></Card>
                </div>
                <Card className="p-6">
                    <h2 className="mb-4 text-lg font-semibold">By Purpose</h2>
                    <Table>
                        <TableHeader>
                            <TableRow><TableHead>Purpose</TableHead><TableHead className="text-right">Total</TableHead></TableRow>
                        </TableHeader>
                        <TableBody>
                            {Object.entries(summary.by_purpose ?? {}).map(([purpose, total]) => (
                                <TableRow key={purpose}>
                                    <TableCell className="font-medium capitalize">{purpose}</TableCell>
                                    <TableCell className="text-right font-bold">₱{Number(total).toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                            {(!summary.by_purpose || Object.keys(summary.by_purpose).length === 0) && <TableRow><TableCell colSpan={2} className="py-4 text-center text-muted-foreground">No data available.</TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AppLayout>
    );
}