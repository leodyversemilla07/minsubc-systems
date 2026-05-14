import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Briefcase, DollarSign, GraduationCap } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AlumniShow({ alumnus }: { alumnus: any }) {
    return (
        <AppLayout>
            <Head title={`${alumnus.first_name} ${alumnus.last_name}`} />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('alumni.admin.alumni.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">{alumnus.first_name} {alumnus.last_name}</h1>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Details</h2>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between"><dt className="text-muted-foreground">Email</dt><dd>{alumnus.email}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Student ID</dt><dd className="font-mono">{alumnus.student_id ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Graduation Year</dt><dd>{alumnus.graduation_year ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Program</dt><dd>{alumnus.degree_program ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">College</dt><dd>{alumnus.college ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Employed</dt><dd>{alumnus.is_employed ? '✅ Yes' : '❌ No'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Verified</dt><dd>{alumnus.is_verified ? '✅' : '❌'}</dd></div>
                        </dl>
                    </Card>
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Actions</h2>
                        <div className="flex flex-wrap gap-2">
                            <Link href={route('alumni.admin.alumni.edit', alumnus.id)}><Button variant="outline">Edit Alumnus</Button></Link>
                        </div>
                    </Card>
                </div>

                {alumnus.employment_records?.length > 0 && (
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold"><Briefcase className="mr-2 inline h-5 w-5" />Employment History</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Industry</TableHead>
                                    <TableHead>Current</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {alumnus.employment_records.map((r: any) => (
                                    <TableRow key={r.id}>
                                        <TableCell className="font-medium">{r.company_name}</TableCell>
                                        <TableCell>{r.position ?? '—'}</TableCell>
                                        <TableCell>{r.industry ?? '—'}</TableCell>
                                        <TableCell>{r.is_current ? '✅' : '—'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                )}

                {alumnus.donations?.length > 0 && (
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold"><DollarSign className="mr-2 inline h-5 w-5" />Donations</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Purpose</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Type</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {alumnus.donations.map((d: any) => (
                                    <TableRow key={d.id}>
                                        <TableCell className="font-bold">₱{Number(d.amount).toLocaleString()}</TableCell>
                                        <TableCell>{d.purpose ?? '—'}</TableCell>
                                        <TableCell>{d.donated_at ?? '—'}</TableCell>
                                        <TableCell>{d.donation_type}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}