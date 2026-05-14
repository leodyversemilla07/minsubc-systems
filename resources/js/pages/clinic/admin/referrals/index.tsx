import { Head, Link } from '@inertiajs/react';
import { Share2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ReferralsIndex({ referrals }: { referrals: any }) {
    return (
        <AppLayout>
            <Head title="Referrals" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold"><Share2 className="mr-2 inline h-6 w-6" />Referrals</h1>
                    <Link href={route('clinic.admin.referrals.create')}><Button>New Referral</Button></Link>
                </div>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Referred To</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-28">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {referrals.data?.map((r: any) => (
                                    <TableRow key={r.id}>
                                        <TableCell className="font-medium">{r.medical_record?.first_name} {r.medical_record?.last_name}</TableCell>
                                        <TableCell>{r.referred_to}</TableCell>
                                        <TableCell>{r.referral_date ?? '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${r.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : r.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{r.status}</span>
                                        </TableCell>
                                        <TableCell><Link href={route('clinic.admin.referrals.show', r.id)}><Button variant="ghost" size="sm">View</Button></Link></TableCell>
                                    </TableRow>
                                ))}
                                {(!referrals.data || referrals.data.length === 0) && <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">No referrals.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}