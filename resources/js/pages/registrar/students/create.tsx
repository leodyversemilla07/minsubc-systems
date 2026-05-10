import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft, Save, GraduationCap } from 'lucide-react';
import { useState } from 'react';

interface Props extends PageProps {}

export default function StudentCreate() {
    const [form, setForm] = useState({
        student_id: '', first_name: '', last_name: '', middle_name: '',
        course: '', year_level: '1', campus: 'Main', status: 'active',
        email: '', contact_number: '', address: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('registrar.students.store'), form);
    };

    return (
        <AppLayout>
            <Head title="Add Student" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('registrar.students.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
                    <h1 className="text-2xl font-bold flex items-center gap-2"><GraduationCap className="h-6 w-6" /> Add Student</h1>
                </div>

                <Card>
                    <CardHeader><CardTitle>Student Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="student_id">Student ID *</Label>
                                    <Input id="student_id" value={form.student_id} onChange={e => setForm(f => ({ ...f, student_id: e.target.value }))} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="first_name">First Name *</Label>
                                    <Input id="first_name" value={form.first_name} onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last_name">Last Name *</Label>
                                    <Input id="last_name" value={form.last_name} onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="middle_name">Middle Name</Label>
                                    <Input id="middle_name" value={form.middle_name} onChange={e => setForm(f => ({ ...f, middle_name: e.target.value }))} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="contact_number">Contact Number</Label>
                                    <Input id="contact_number" value={form.contact_number} onChange={e => setForm(f => ({ ...f, contact_number: e.target.value }))} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="course">Course *</Label>
                                    <Input id="course" value={form.course} onChange={e => setForm(f => ({ ...f, course: e.target.value }))} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="year_level">Year Level</Label>
                                    <Select value={form.year_level} onValueChange={v => setForm(f => ({ ...f, year_level: v }))}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {[1,2,3,4].map(y => <SelectItem key={y} value={y.toString()}>{y}st/nd/rd/th</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="campus">Campus</Label>
                                    <Select value={form.campus} onValueChange={v => setForm(f => ({ ...f, campus: v }))}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Main">Main</SelectItem>
                                            <SelectItem value="BC">BC</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 pt-4">
                                <Link href={route('registrar.students.index')}><Button type="button" variant="outline">Cancel</Button></Link>
                                <Button type="submit"><Save className="mr-2 h-4 w-4" /> Save Student</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}