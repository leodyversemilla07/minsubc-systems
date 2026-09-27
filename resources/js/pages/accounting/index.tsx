import { Head } from '@inertiajs/react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

interface AccountingHomeStats {
    total_assessments: number;
    total_collected: number;
    pending_payments: number;
    fee_items: number;
}

export default function Index({ stats }: { stats: AccountingHomeStats }) {
    return (
        <AppLayout>
            <Head title="Accounting" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Accounting Overview</h1>
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Assessments</CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-bold">
                            {stats.total_assessments}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Collected</CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-bold text-green-700">
                            ₱{(stats.total_collected ?? 0).toLocaleString()}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Pending Balance</CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-bold text-yellow-700">
                            ₱{(stats.pending_payments ?? 0).toLocaleString()}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Fee Items</CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-bold">
                            {stats.fee_items}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
