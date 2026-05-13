import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function EmployeeCreate({ departments, positions }: { departments: any[]; positions: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        employee_id: '', first_name: '', last_name: '', email: '', phone: '', department_id: '',
        position_id: '', employment_status: 'active', hire_date: '', salary: '', address: '',
    });
    const submit = (e: React.FormEvent) => { e.preventDefault(); post(route('hr.admin.employees.store')); };

    return (
        <AppLayout>
            <Head title="Add Employee" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('hr.admin.employees.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Add Employee</h1>
                </div>
                <Card className="max-w-2xl">
                    <CardHeader><CardTitle>Employee Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div><Label>Employee ID</Label><Input value={data.employee_id} onChange={(e) => setData('employee_id', e.target.value)} placeholder="e.g. EMP-001" />{errors.employee_id && <p className="text-sm text-red-600">{errors.employee_id}</p>}</div>
                                <div><Label>First Name</Label><Input value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} />{errors.first_name && <p className="text-sm text-red-600">{errors.first_name}</p>}</div>
                                <div><Label>Last Name</Label><Input value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} />{errors.last_name && <p className="text-sm text-red-600">{errors.last_name}</p>}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Email</Label><Input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />{errors.email && <p className="text-sm text-red-600">{errors.email}</p>}</div>
                                <div><Label>Phone</Label><Input value={data.phone} onChange={(e) => setData('phone', e.target.value)} /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Department</Label>
                                    <Select value={data.department_id} onValueChange={(v) => setData('department_id', v)}>
                                        <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                                        <SelectContent>{departments.map((d: any) => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)}</SelectContent>
                                    </Select>
                                    {errors.department_id && <p className="text-sm text-red-600">{errors.department_id}</p>}
                                </div>
                                <div>
                                    <Label>Position</Label>
                                    <Select value={data.position_id} onValueChange={(v) => setData('position_id', v)}>
                                        <SelectTrigger><SelectValue placeholder="Select position" /></SelectTrigger>
                                        <SelectContent>{positions.map((p: any) => <SelectItem key={p.id} value={String(p.id)}>{p.title}</SelectItem>)}</SelectContent>
                                    </Select>
                                    {errors.position_id && <p className="text-sm text-red-600">{errors.position_id}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <Label>Status</Label>
                                    <Select value={data.employment_status} onValueChange={(v) => setData('employment_status', v)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="on-leave">On Leave</SelectItem>
                                            <SelectItem value="terminated">Terminated</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div><Label>Hire Date</Label><Input type="date" value={data.hire_date} onChange={(e) => setData('hire_date', e.target.value)} /></div>
                                <div><Label>Salary</Label><Input type="number" value={data.salary} onChange={(e) => setData('salary', e.target.value)} /></div>
                            </div>
                            <div><Label>Address</Label><Textarea value={data.address} onChange={(e) => setData('address', e.target.value)} rows={2} /></div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('hr.admin.employees.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}