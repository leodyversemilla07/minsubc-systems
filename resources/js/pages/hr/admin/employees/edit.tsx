import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';

interface Employee {
    id: number;
    employee_id: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    email: string;
    phone: string;
    address: string;
    birth_date: string;
    gender: string;
    civil_status: string;
    department_id: number;
    position_id: number;
    employment_status: string;
    hire_date: string;
    regularization_date: string;
    resignation_date: string;
    education_level: string;
    specialization: string;
    notes: string;
}

interface Department {
    id: number;
    name: string;
    code: string;
}

interface Position {
    id: number;
    title: string;
    category: string;
}

interface Props {
    employee: Employee;
    departments: Department[];
    positions: Position[];
}

export default function Edit({ employee, departments, positions }: Props) {
    const [form, setForm] = useState({
        employee_id: employee.employee_id,
        first_name: employee.first_name,
        last_name: employee.last_name,
        middle_name: employee.middle_name || '',
        email: employee.email,
        phone: employee.phone || '',
        address: employee.address || '',
        birth_date: employee.birth_date?.split('T')[0] || '',
        gender: employee.gender || '',
        civil_status: employee.civil_status || '',
        department_id: String(employee.department_id || ''),
        position_id: String(employee.position_id || ''),
        employment_status: employee.employment_status,
        hire_date: employee.hire_date?.split('T')[0] || '',
        regularization_date: employee.regularization_date?.split('T')[0] || '',
        resignation_date: employee.resignation_date?.split('T')[0] || '',
        education_level: employee.education_level || '',
        specialization: employee.specialization || '',
        notes: employee.notes || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(route('hr.admin.employees.update', employee.id), form);
    };

    return (
        <AppLayout>
            <Head title="Edit Employee" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('hr.admin.employees.show', employee.id)}><Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Edit Employee</h1>
                </div>

                <Card className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <div className="space-y-2">
                                <Label>Employee ID *</Label>
                                <Input required value={form.employee_id} onChange={(e) => setForm({ ...form, employee_id: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>First Name *</Label>
                                <Input required value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Last Name *</Label><Input required value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Middle Name</Label><Input value={form.middle_name} onChange={(e) => setForm({ ...form, middle_name: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Email *</Label>
                                <Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Gender</Label>
                                <Select value={form.gender} onValueChange={(v) => setForm({ ...form, gender: v ?? "" })}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Civil Status</Label>
                                <Select value={form.civil_status} onValueChange={(v) => setForm({ ...form, civil_status: v ?? "" })}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="single">Single</SelectItem>
                                        <SelectItem value="married">Married</SelectItem>
                                        <SelectItem value="widowed">Widowed</SelectItem>
                                        <SelectItem value="separated">Separated</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Birth Date</Label>
                                <Input type="date" value={form.birth_date} onChange={(e) => setForm({ ...form, birth_date: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Department</Label>
                                <Select value={form.department_id} onValueChange={(v) => setForm({ ...form, department_id: v ?? "" })}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {departments.map((d) => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Position</Label>
                                <Select value={form.position_id} onValueChange={(v) => setForm({ ...form, position_id: v ?? "" })}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {positions.map((p) => <SelectItem key={p.id} value={String(p.id)}>{p.title}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select value={form.employment_status} onValueChange={(v) => setForm({ ...form, employment_status: v ?? "" })}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                        <SelectItem value="on-leave">On Leave</SelectItem>
                                        <SelectItem value="resigned">Resigned</SelectItem>
                                        <SelectItem value="terminated">Terminated</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Hire Date *</Label>
                                <Input type="date" required value={form.hire_date} onChange={(e) => setForm({ ...form, hire_date: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Regularization</Label>
                                <Input type="date" value={form.regularization_date} onChange={(e) => setForm({ ...form, regularization_date: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Resignation Date</Label>
                                <Input type="date" value={form.resignation_date} onChange={(e) => setForm({ ...form, resignation_date: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Education</Label><Input value={form.education_level} onChange={(e) => setForm({ ...form, education_level: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Specialization</Label><Input value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label>Address</Label><Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label>Notes</Label><Input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <Link href={route('hr.admin.employees.show', employee.id)}><Button variant="outline">Cancel</Button></Link>
                            <Button type="submit">Update Employee</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}