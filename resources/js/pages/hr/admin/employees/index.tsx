import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
    email: string;
    employment_status: string;
    department?: { id: number; name: string };
    position?: { id: number; title: string };
}

interface Department {
    id: number;
    name: string;
}

interface Props {
    employees: { data: Employee[]; links: any[] };
    departments: Department[];
    filters: { search?: string; department?: string; status?: string };
}

export default function Index({ employees, departments, filters }: Props) {
    return (
        <AppLayout>
            <Head title="Employees" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Employees</h1>
                    <Link href={route('hr.admin.employees.create')}>
                        <Button><Plus className="mr-2 h-4 w-4" />Add Employee</Button>
                    </Link>
                </div>

                <Card className="p-4">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1">
                            <Label>Search</Label>
                            <Input
                                placeholder="Search name, ID, or email..."
                                defaultValue={filters.search}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        router.get(route('hr.admin.employees.index'), { ...filters, search: (e.target as HTMLInputElement).value }, { preserveState: true });
                                    }
                                }}
                            />
                        </div>
                        <div className="w-48">
                            <Label>Department</Label>
                            <Select value={filters.department || ''} onValueChange={(v) => router.get(route('hr.admin.employees.index'), { ...filters, department: v }, { preserveState: true })}>
                                <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All</SelectItem>
                                    {departments.map((d) => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-40">
                            <Label>Status</Label>
                            <Select value={filters.status || ''} onValueChange={(v) => router.get(route('hr.admin.employees.index'), { ...filters, status: v }, { preserveState: true })}>
                                <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                    <SelectItem value="on-leave">On Leave</SelectItem>
                                    <SelectItem value="resigned">Resigned</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </Card>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Employee ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.data.map((emp) => (
                            <TableRow key={emp.id}>
                                <TableCell className="font-mono text-sm">{emp.employee_id}</TableCell>
                                <TableCell className="font-medium">{emp.first_name} {emp.last_name}</TableCell>
                                <TableCell>{emp.email}</TableCell>
                                <TableCell>{emp.department?.name || '—'}</TableCell>
                                <TableCell>{emp.position?.title || '—'}</TableCell>
                                <TableCell>{emp.employment_status}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Link href={route('hr.admin.employees.show', emp.id)}><Button variant="outline" size="sm">View</Button></Link>
                                        <Link href={route('hr.admin.employees.edit', emp.id)}><Button variant="outline" size="sm">Edit</Button></Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}