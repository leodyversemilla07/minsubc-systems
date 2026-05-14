import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, DollarSign } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function DonationShow({ donation }: { donation: any }) {
    return (
        <AppLayout>
            <Head title="Donation Details" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('alumni.admin.donations.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Donation Details</h1>
                </div>
                <Card className="max-w-xl p-6">
                    <dl className="space-y-3 text-sm">
                        <div className="flex justify-between"><dt className="text-muted-foreground">Donor</dt><dd className="font-medium">{donation.alumnus?.first_name} {donation.alumnus?.last_name}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground"><DollarSign className="mr-1 inline h-3 w-3" /> Amount</dt><dd className="text-lg font-bold">₱{Number(donation.amount).toLocaleString()}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Type</dt><dd className="capitalize">{donation.donation_type}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Purpose</dt><dd className="capitalize">{donation.purpose ?? '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Payment Method</dt><dd>{donation.payment_method ?? '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Date</dt><dd>{donation.donated_at ?? '—'}</dd></div>
                        {donation.is_anonymous && <div className="flex justify-between"><dt className="text-muted-foreground">Anonymous</dt><dd>✅</dd></div>}
                    </dl>
                </Card>
            </div>
        </AppLayout>
    );
}