import { Head, Link } from '@inertiajs/react';
import { CalendarRange } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function AcademicSchedulesIndex({ schedules }: { schedules: any }) {
    return (
        <AppLayout>
            <Head title="Academic Schedules" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><CalendarRange className="mr-2 inline h-6 w-6" />Academic Schedule</h1>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Academic Year</TableHead>
                                    <TableHead>Term</TableHead>
                                    <TableHead>Event</TableHead>
                                    <TableHead>Start</TableHead>
                                    <TableHead>End</TableHead>
                                    <TableHead>Type</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {schedules.data?.map((s: any) => (
                                    <TableRow key={s.id}>
                                        <TableCell>{s.academic_year}</TableCell>
                                        <TableCell>{s.term}</TableCell>
                                        <TableCell className="font-medium">{s.event_name}</TableCell>
                                        <TableCell>{s.start_date}</TableCell>
                                        <TableCell>{s.end_date}</TableCell>
                                        <TableCell>{s.is_holiday ? <Badge className="bg-red-100 text-red-800">Holiday</Badge> : <Badge variant="secondary">Academic</Badge>}</TableCell>
                                    </TableRow>
                                ))}
                                {(!schedules.data || schedules.data.length === 0) && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No schedules.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}