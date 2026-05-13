import { Head, Link } from '@inertiajs/react';
import { HeartHandshake, Eye, CheckCircle } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ReferralIndex({ referrals }: { referrals: any[] }) {
    return (
        <AppLayout>
            <Head title="Referrals" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Referrals</h1>
                <Card>
                    <CardHeader><CardTitle><HeartHandshake className="mr-2 inline h-5 w-5" />All Referrals</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Referred By</TableHead>
                                    <TableHead>Referred To</TableHead>
                                    <TableHead>Reason</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-28">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {referrals.map((r: any) => (
                                    <TableRow key={r.id}>
                                        <TableCell className="font-medium">{r.student?.name ?? r.student_id ?? '—'}</TableCell>
                                        <TableCell>{r.referred_by_name ?? '—'}</TableCell>
                                        <TableCell>{r.referred_to_name ?? '—'}</TableCell>
                                        <TableCell className="max-w-xs truncate">{r.reason ?? '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                                r.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                r.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                                                r.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                r.status === 'declined' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>{r.status}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Link href={route('guidance.admin.referrals.show', r.id)}><Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button></Link>
                                                {r.status === 'pending' && (
                                                    <Link as="button" method="post" href={route('guidance.admin.referrals.accept', r.id)}>
                                                        <Button variant="ghost" size="icon" title="Accept"><CheckCircle className="h-4 w-4 text-green-600" /></Button>
                                                    </Link>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {referrals.length === 0 && (
                                    <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No referrals found.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}