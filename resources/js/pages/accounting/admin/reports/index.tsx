import { Head, Link } from '@inertiajs/react';
import { BarChart3 } from 'lucide-react';

import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

const reports = [
    {
        title: 'Collections',
        description: 'Daily collections and breakdown by payment method.',
        href: 'accounting.admin.reports.collections',
    },
    {
        title: 'Aging of Receivables',
        description: 'Outstanding balances bucketed by due-date age.',
        href: 'accounting.admin.reports.aging',
    },
];

export default function Index() {
    return (
        <AppLayout>
            <Head title="Accounting Reports" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">
                    <BarChart3 className="mr-2 inline h-6 w-6" />
                    Reports
                </h1>
                <div className="grid gap-6 md:grid-cols-2">
                    {reports.map((r) => (
                        <Link key={r.href} href={route(r.href)}>
                            <Card className="p-6 transition hover:shadow-md">
                                <h2 className="text-lg font-semibold">
                                    {r.title}
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {r.description}
                                </p>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
