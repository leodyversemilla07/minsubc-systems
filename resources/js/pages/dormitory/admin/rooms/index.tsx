import { Head } from '@inertiajs/react';
import { DoorOpen } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
export default function RoomsIndex({ rooms, halls }: { rooms: any; halls: any }) {
    return (<AppLayout><Head title="Dorm Rooms" />
        <div className="space-y-6 p-6">
            <h1 className="text-2xl font-bold"><DoorOpen className="mr-2 inline h-6 w-6" />Dorm Rooms</h1>
            <Card><CardContent className="p-0"><Table>
                <TableHeader><TableRow>
                    <TableHead>Room</TableHead><TableHead>Hall</TableHead><TableHead>Floor</TableHead><TableHead>Type</TableHead><TableHead>Capacity</TableHead><TableHead>Beds</TableHead><TableHead>Status</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                    {rooms.data?.map((r: any) => (
                        <TableRow key={r.id}>
                            <TableCell className="font-medium">{r.room_number}</TableCell>
                            <TableCell>{r.hall?.name ?? '—'}</TableCell>
                            <TableCell>{r.floor}</TableCell>
                            <TableCell className="capitalize">{r.room_type}</TableCell>
                            <TableCell>{r.capacity}</TableCell>
                            <TableCell>{r.beds_count}</TableCell>
                            <TableCell><Badge className={r.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>{r.is_active ? 'Active' : 'Inactive'}</Badge></TableCell>
                        </TableRow>
                    ))}
                    {(!rooms.data || rooms.data.length === 0) && <TableRow><TableCell colSpan={7} className="py-8 text-center text-muted-foreground">No rooms.</TableCell></TableRow>}
                </TableBody>
            </Table></CardContent></Card>
        </div></AppLayout>
    );
}