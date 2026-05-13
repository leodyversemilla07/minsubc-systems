import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, Activity, Users, Plus } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function InterventionIndex({ interventions }: { interventions: any[] }) {
    return (
        <AppLayout>
            <Head title="Interventions" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Interventions</h1>
                    <Link href={route('guidance.admin.interventions.create')}><Button><Plus className="mr-2 h-4 w-4" /> New Intervention</Button></Link>
                </div>
                <Card>
                    <CardHeader><CardTitle><Activity className="mr-2 inline h-5 w-5" />All Interventions</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Participants</TableHead>
                                    <TableHead>Start Date</TableHead>
                                    <TableHead className="w-24">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {interventions.map((i: any) => (
                                    <TableRow key={i.id}>
                                        <TableCell className="max-w-xs truncate font-medium">{i.title}</TableCell>
                                        <TableCell className="capitalize">{i.intervention_type ?? '—'}</TableCell>
                                        <TableCell>
                                            <Badge className={i.status === 'completed' ? 'bg-green-100 text-green-800' : i.status === 'ongoing' ? 'bg-blue-100 text-blue-800' : i.status === 'planned' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}>{i.status}</Badge>
                                        </TableCell>
                                        <TableCell><Users className="mr-1 inline h-4 w-4" />{i.participants?.length ?? i.participants_count ?? 0}</TableCell>
                                        <TableCell>{i.start_date ?? '—'}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Link href={route('guidance.admin.interventions.show', i.id)}><Button variant="ghost" size="icon"><CheckCircle className="h-4 w-4" /></Button></Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {interventions.length === 0 && (
                                    <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No interventions found.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}