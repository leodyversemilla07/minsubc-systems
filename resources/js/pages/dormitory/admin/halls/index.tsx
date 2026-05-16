import { Head, Link } from '@inertiajs/react';
import { Building2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
export default function HallsIndex({ halls }: { halls: any }) {
    return (<AppLayout><Head title="Dorm Halls" />
        <div className="space-y-6 p-6">
            <h1 className="text-2xl font-bold"><Building2 className="mr-2 inline h-6 w-6" />Dorm Halls</h1>
            <Card><CardContent className="p-0"><Table>
                <TableHeader><TableRow>
                    <TableHead>Name</TableHead><TableHead>Code</TableHead><TableHead>Gender</TableHead><TableHead>Floors</TableHead><TableHead>Rooms</TableHead><TableHead>Warden</TableHead><TableHead>Status</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                    {halls.data?.map((h: any) => (
                        <TableRow key={h.id}>
                            <TableCell className="font-medium">{h.name}</TableCell>
                            <TableCell className="font-mono">{h.code}</TableCell>
                            <TableCell><Badge variant="outline" className="capitalize">{h.gender}</Badge></TableCell>
                            <TableCell>{h.floors}</TableCell>
                            <TableCell>{h.rooms_count ?? 0}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{h.warden_name ?? '—'}</TableCell>
                            <TableCell><Badge className={h.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>{h.is_active ? 'Active' : 'Inactive'}</Badge></TableCell>
                        </TableRow>
                    ))}
                    {(!halls.data || halls.data.length === 0) && <TableRow><TableCell colSpan={7} className="py-8 text-center text-muted-foreground">No halls.</TableCell></TableRow>}
                </TableBody>
            </Table></CardContent></Card>
        </div></AppLayout>
    );
}