import { Head, Link } from '@inertiajs/react';
import { Users, ShieldCheck, CalendarCheck } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Counselors({ counselors }: { counselors: any[] }) {
    return (
        <AppLayout>
            <Head title="Counselors" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><Users className="mr-2 inline h-6 w-6" />Available Counselors</h1>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {counselors.map((c: any) => (
                        <Card key={c.id} className="p-6">
                            <CardTitle className="flex items-center gap-2">
                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-lg">
                                    {c.first_name?.[0]}{c.last_name?.[0]}
                                </span>
                                <span>{c.full_name ?? `${c.first_name} ${c.last_name}`}</span>
                                {c.is_available && <ShieldCheck className="h-4 w-4 text-green-500" />}
                            </CardTitle>
                            <CardContent className="px-0 pt-4">
                                <div className="space-y-1 text-sm">
                                    {c.specialization && <p><span className="text-muted-foreground">Specialization:</span> {c.specialization}</p>}
                                    {c.bio && <p className="text-muted-foreground line-clamp-2">{c.bio}</p>}
                                </div>
                                <Link href={route('guidance.my.appointments.create')}>
                                    <span className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 hover:underline">
                                        <CalendarCheck className="mr-1 h-4 w-4" /> Book Appointment
                                    </span>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                    {counselors.length === 0 && (
                        <p className="text-muted-foreground col-span-full py-8 text-center">No counselors available at this time.</p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}