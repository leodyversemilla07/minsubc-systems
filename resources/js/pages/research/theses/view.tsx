import { Head } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ViewThesis({ proposal }: { proposal: any }) {
    return (
        <AppLayout>
            <Head title={proposal?.title ?? 'Thesis Details'} />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">{proposal?.title ?? 'Thesis Details'}</h1>

                {proposal ? (
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="p-6">
                            <h2 className="mb-2 text-lg font-semibold">Details</h2>
                            <dl className="space-y-2 text-sm">
                                <div className="flex justify-between"><dt className="text-muted-foreground">Type</dt><dd>{proposal.research_type?.name ?? '—'}</dd></div>
                                <div className="flex justify-between"><dt className="text-muted-foreground">Status</dt><dd>{proposal.status}</dd></div>
                                <div className="flex justify-between"><dt className="text-muted-foreground">Adviser</dt><dd>{proposal.adviser?.name ?? 'Not assigned'}</dd></div>
                            </dl>
                        </Card>

                        <Card className="p-6">
                            <h2 className="mb-2 text-lg font-semibold">Abstract</h2>
                            <p className="text-muted-foreground text-sm">{proposal.abstract ?? 'No abstract provided.'}</p>
                        </Card>
                    </div>
                ) : (
                    <Card className="p-6">
                        <p className="text-muted-foreground">Thesis not found.</p>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}