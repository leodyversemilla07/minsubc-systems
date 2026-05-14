import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function FacilityEdit({ facility }: { facility: any }) {
    const { data, setData, put, processing } = useForm({
        name: facility.name, code: facility.code, type: facility.type,
        location: facility.location ?? '', capacity: String(facility.capacity ?? ''),
        building: facility.building ?? '', floor: facility.floor ?? '',
        description: facility.description ?? '', operating_hours: facility.operating_hours ?? '',
        is_available: facility.is_available,
    });
    const submit = (e: React.FormEvent) => { e.preventDefault(); put(route('facilities.admin.facilities.update', facility.id)); };
    return (
        <AppLayout>
            <Head title="Edit Facility" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('facilities.admin.facilities.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Edit {facility.name}</h1>
                </div>
                <Card className="max-w-2xl">
                    <CardHeader><CardTitle>Facility Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2"><Label>Name</Label><Input value={data.name} onChange={(e) => setData('name', e.target.value)} /></div>
                                <div><Label>Code</Label><Input value={data.code} onChange={(e) => setData('code', e.target.value)} /></div>
                                <div><Label>Type</Label>
                                    <Select value={data.type} onValueChange={(v) => setData('type', v)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="classroom">Classroom</SelectItem>
                                            <SelectItem value="laboratory">Laboratory</SelectItem>
                                            <SelectItem value="hall">Hall</SelectItem>
                                            <SelectItem value="auditorium">Auditorium</SelectItem>
                                            <SelectItem value="gym">Gymnasium</SelectItem>
                                            <SelectItem value="meeting-room">Meeting Room</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div><Label>Capacity</Label><Input type="number" value={data.capacity} onChange={(e) => setData('capacity', e.target.value)} /></div>
                                <div><Label>Location</Label><Input value={data.location} onChange={(e) => setData('location', e.target.value)} /></div>
                                <div><Label>Building</Label><Input value={data.building} onChange={(e) => setData('building', e.target.value)} /></div>
                                <div><Label>Floor</Label><Input value={data.floor} onChange={(e) => setData('floor', e.target.value)} /></div>
                                <div><Label>Operating Hours</Label><Input value={data.operating_hours} onChange={(e) => setData('operating_hours', e.target.value)} /></div>
                            </div>
                            <div><Label>Description</Label><Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={2} /></div>
                            <div className="flex items-center gap-2"><input type="checkbox" id="available" checked={data.is_available} onChange={(e) => setData('is_available', e.target.checked)} /><Label htmlFor="available">Available for booking</Label></div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Update</Button>
                                <Link href={route('facilities.admin.facilities.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}