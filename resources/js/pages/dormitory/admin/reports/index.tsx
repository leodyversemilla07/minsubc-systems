import { Head } from '@inertiajs/react';
import { BarChart3 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
export default function ReportsIndex({ halls, occupancy }: { halls: any; occupancy: any }) {
    return (<AppLayout><Head title="Dormitory Reports" />
        <div className="space-y-6 p-6">
            <h1 className="text-2xl font-bold"><BarChart3 className="mr-2 inline h-6 w-6" />Reports</h1>
            <div className="grid gap-6 md:grid-cols-2">
                <Card><CardHeader><CardTitle className="text-base">Halls Overview</CardTitle></CardHeader>
                    <CardContent>
                        {halls?.map((h: any) => (
                            <div key={h.id} className="mb-2 flex items-center justify-between">
                                <span>{h.name} ({h.code})</span>
                                <span className="font-bold">{h.rooms_count} rooms</span>
                            </div>
                        ))}
                        {(!halls || halls.length === 0) && <p className="text-sm text-muted-foreground">No halls.</p>}
                    </CardContent></Card>
                <Card><CardHeader><CardTitle className="text-base">Occupancy by Hall</CardTitle></CardHeader>
                    <CardContent>
                        {occupancy?.map((o: any) => {
                            const rate = o.total_capacity > 0 ? Math.round((o.occupied / o.total_capacity) * 100) : 0;
                            return (<div key={o.hall_id} className="mb-2">
                                <div className="flex justify-between text-sm"><span>Hall #{o.hall_id}</span><span className="font-bold">{rate}% ({o.occupied}/{o.total_capacity})</span></div>
                                <div className="mt-1 h-2 w-full rounded-full bg-gray-200"><div className="h-2 rounded-full bg-blue-500 transition-all" style={{ width: `${rate}%` }} /></div>
                            </div>);
                        })}
                        {(!occupancy || occupancy.length === 0) && <p className="text-sm text-muted-foreground">No data.</p>}
                    </CardContent></Card>
            </div>
        </div></AppLayout>
    );
}