import { Head } from '@inertiajs/react';
import { DollarSign, FileText, PiggyBank, Users } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

interface Stat {
    total_assessments: number;
    total_amount_assessed: number;
    total_collected: number;
    pending_balance: number;
    total_students_assessed: number;
    payment_methods: Record<string, number>;
    recent_payments: Array<{
        id: number;
        payment_code: string;
        amount: number;
        payment_method: string;
        payment_date: string;
        assessment: { assessment_code: string };
    }>;
}

export default function Dashboard({ stats }: { stats: Stat }) {
    const cards = [
        { title: 'Total Assessments', value: stats.total_assessments, icon: FileText },
        { title: 'Amount Assessed', value: `₱${(stats.total_amount_assessed ?? 0).toLocaleString()}`, icon: PiggyBank },
        { title: 'Total Collected', value: `₱${(stats.total_collected ?? 0).toLocaleString()}`, icon: DollarSign },
        { title: 'Pending Balance', value: `₱${(stats.pending_balance ?? 0).toLocaleString()}`, icon: DollarSign },
        { title: 'Students Assessed', value: stats.total_students_assessed, icon: Users },
    ];

    return (
        <AppLayout>
            <Head title="Accounting Dashboard" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Accounting Dashboard</h1>

                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
                    {cards.map((card) => (
                        <Card key={card.title}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                                <card.icon className="text-muted-foreground h-4 w-4" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{card.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-4 text-lg font-semibold">Payment Methods</h2>
                        {stats.payment_methods && Object.keys(stats.payment_methods).length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Method</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Object.entries(stats.payment_methods).map(([method, total]) => (
                                        <TableRow key={method}>
                                            <TableCell className="capitalize">{method}</TableCell>
                                            <TableCell className="text-right">₱{(total as number).toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p className="text-muted-foreground">No payment data yet.</p>
                        )}
                    </Card>

                    <Card className="p-6">
                        <h2 className="mb-4 text-lg font-semibold">Recent Payments</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Assessment</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stats.recent_payments?.map((p) => (
                                    <TableRow key={p.id}>
                                        <TableCell className="font-mono text-sm">{p.payment_code}</TableCell>
                                        <TableCell>{p.assessment?.assessment_code}</TableCell>
                                        <TableCell className="text-right">₱{p.amount.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}