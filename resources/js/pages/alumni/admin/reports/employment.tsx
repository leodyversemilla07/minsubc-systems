import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Briefcase } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function EmploymentReport({ stats }: { stats: any }) {
    return (
        <AppLayout>
            <Head title="Employment Report" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('alumni.admin.reports.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold"><Briefcase className="mr-2 inline h-6 w-6" />Employment Report</h1>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="p-4"><p className="text-sm text-muted-foreground">Employment Rate</p><p className="text-2xl font-bold">{stats.employment_rate ?? 0}%</p></Card>
                    <Card className="p-4"><p className="text-sm text-muted-foreground">Employed</p><p className="text-2xl font-bold text-green-600">{stats.employed ?? 0}</p></Card>
                    <Card className="p-4"><p className="text-sm text-muted-foreground">Unemployed</p><p className="text-2xl font-bold text-red-600">{stats.unemployed ?? 0}</p></Card>
                </div>
                <Card className="p-6">
                    <h2 className="mb-4 text-lg font-semibold">By Industry</h2>
                    <Table>
                        <TableHeader>
                            <TableRow><TableHead>Industry</TableHead><TableHead className="text-right">Count</TableHead></TableRow>
                        </TableHeader>
                        <TableBody>
                            {Object.entries(stats.by_industry ?? {}).map(([industry, count]) => (
                                <TableRow key={industry}>
                                    <TableCell className="font-medium capitalize">{industry}</TableCell>
                                    <TableCell className="text-right font-bold">{count as number}</TableCell>
                                </TableRow>
                            ))}
                            {(!stats.by_industry || Object.keys(stats.by_industry).length === 0) && <TableRow><TableCell colSpan={2} className="py-4 text-center text-muted-foreground">No data available.</TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AppLayout>
    );
}