import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Building2, Search, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
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
    filters: { search?: string; department?: string };
}

export default function Directory({ employees, departments, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [department, setDepartment] = useState(filters.department || '');

    const handleFilter = () => {
        router.get('/hr/directory', { search, department }, { preserveState: true, preserveScroll: true });
    };

    return (
        <AppLayout>
            <Head title="Employee Directory" />
            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold">Employee Directory</h1>
                    <p className="text-muted-foreground">Browse faculty and staff members.</p>
                </div>

                <Card className="p-4">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1">
                            <Label>Search</Label>
                            <Input
                                placeholder="Search by name or ID..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
                            />
                        </div>
                        <div className="w-48">
                            <Label>Department</Label>
                            <Select value={department} onValueChange={(v) => { setDepartment(v ?? ''); router.get('/hr/directory', { search, department: v }, { preserveState: true }); }}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Departments" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Departments</SelectItem>
                                    {departments.map((d) => (
                                        <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-end">
                            <Button onClick={handleFilter} variant="outline"><Search className="mr-2 h-4 w-4" />Search</Button>
                        </div>
                    </div>
                </Card>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {employees.data.map((emp) => (
                        <Link key={emp.id} href={`/hr/employees/${emp.id}`} className="hover:bg-accent rounded-lg border p-4 transition-colors">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-semibold">{emp.first_name} {emp.last_name}</h3>
                                    <p className="text-muted-foreground text-sm">{emp.employee_id}</p>
                                </div>
                                <Users className="text-muted-foreground h-4 w-4" />
                            </div>
                            <div className="mt-3 space-y-1 text-sm">
                                <p>{emp.position?.title || 'No position'}</p>
                                <p className="text-muted-foreground">{emp.department?.name || 'No department'}</p>
                            </div>
                            <Badge variant={emp.employment_status === 'active' ? 'default' : 'secondary'} className="mt-2">
                                {emp.employment_status}
                            </Badge>
                        </Link>
                    ))}
                </div>

                {employees.data.length === 0 && (
                    <p className="text-muted-foreground py-8 text-center">No employees found.</p>
                )}
            </div>
        </AppLayout>
    );
}