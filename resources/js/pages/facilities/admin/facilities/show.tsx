import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Building2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function FacilityShow({ facility }: { facility: any }) {
    return (
        <AppLayout>
            <Head title={facility.name} />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('facilities.admin.facilities.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold"><Building2 className="mr-2 inline h-6 w-6" />{facility.name}</h1>
                    <span className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${facility.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{facility.is_available ? 'Available' : 'Unavailable'}</span>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card className="p-6">
                        <dl className="space-y-3 text-sm">
                            <div className="flex justify-between"><dt className="text-muted-foreground">Code</dt><dd className="font-mono">{facility.code}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Type</dt><dd className="capitalize">{facility.type}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Location</dt><dd>{facility.location ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Building</dt><dd>{facility.building ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Floor</dt><dd>{facility.floor ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Capacity</dt><dd>{facility.capacity ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Operating Hours</dt><dd>{facility.operating_hours ?? '—'}</dd></div>
                        </dl>
                        {facility.description && <div className="mt-4"><h3 className="mb-1 text-sm font-medium">Description</h3><p className="text-sm text-muted-foreground">{facility.description}</p></div>}
                        {facility.amenities?.length > 0 && <div className="mt-4"><h3 className="mb-2 text-sm font-medium">Amenities</h3><div className="flex flex-wrap gap-2">{facility.amenities.map((a: string) => <Badge key={a} variant="secondary">{a}</Badge>)}</div></div>}
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}