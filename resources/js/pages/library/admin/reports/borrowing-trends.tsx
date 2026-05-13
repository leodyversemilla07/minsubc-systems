import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function BorrowingTrends({ monthlyBorrowings }: { monthlyBorrowings: any[] }) {
    return (
        <AppLayout>
            <Head title="Borrowing Trends" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('library.admin.reports.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold"><TrendingUp className="mr-2 inline h-6 w-6" />Borrowing Trends</h1>
                </div>
                <Card className="p-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Month</TableHead>
                                <TableHead className="text-right">Borrowings</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {monthlyBorrowings.map((m: any) => (
                                <TableRow key={m.month}>
                                    <TableCell className="font-medium">{m.month}</TableCell>
                                    <TableCell className="text-right font-bold">{m.total}</TableCell>
                                </TableRow>
                            ))}
                            {monthlyBorrowings.length === 0 && <TableRow><TableCell colSpan={2} className="py-8 text-center text-muted-foreground">No data available.</TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AppLayout>
    );
}