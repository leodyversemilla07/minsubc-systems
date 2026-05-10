import { Head, Link } from '@inertiajs/react';
import { BookOpen, Building2, Users } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Stat {
    total_employees: number;
    total_departments: number;
    active_faculty: number;
}

interface Department {
    id: number;
    name: string;
    code: string;
    type: string;
    employees_count?: number;
}

export default function Index({ stats, departments }: { stats: Stat; departments: Department[] }) {
    return (
        <>
            <Head title="HR &amp; Faculty" />

            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">HR &amp; Faculty</h1>
                    <p className="text-muted-foreground mt-2">Employee directory and human resources information.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                            <Users className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.total_employees}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Departments</CardTitle>
                            <Building2 className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.total_departments}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Active Faculty</CardTitle>
                            <BookOpen className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.active_faculty}</div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <h2 className="mb-4 text-xl font-semibold">Departments</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {departments.map((dept) => (
                            <Link
                                key={dept.id}
                                href={`/hr/directory?department=${dept.id}`}
                                className="hover:bg-accent rounded-lg border p-4 transition-colors"
                            >
                                <h3 className="font-medium">{dept.name}</h3>
                                <p className="text-muted-foreground text-sm">{dept.code}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}