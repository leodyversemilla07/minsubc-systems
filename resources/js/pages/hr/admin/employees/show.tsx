import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Users, Briefcase, Calendar, Clock, Mail, Phone, MapPin } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function EmployeeShow({ employee, attendance, leaveRequests }: { employee: any; attendance: any[]; leaveRequests: any[] }) {
    return (
        <AppLayout>
            <Head title={`${employee.first_name} ${employee.last_name}`} />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('hr.admin.employees.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">{employee.first_name?.[0]}{employee.last_name?.[0]}</span>
                    <div>
                        <h1 className="text-2xl font-bold">{employee.first_name} {employee.last_name}</h1>
                        <p className="text-muted-foreground text-sm">{employee.position?.title ?? '—'} · {employee.department?.name ?? '—'}</p>
                    </div>
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        employee.employment_status === 'active' ? 'bg-green-100 text-green-800' :
                        employee.employment_status === 'on-leave' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                    }`}>{employee.employment_status}</span>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold"><Users className="mr-2 inline h-5 w-5" />Personal Info</h2>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between"><dt className="text-muted-foreground">Employee ID</dt><dd className="font-mono">{employee.employee_id}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground"><Mail className="mr-1 inline h-3 w-3" /> Email</dt><dd>{employee.email}</dd></div>
                            {employee.phone && <div className="flex justify-between"><dt className="text-muted-foreground"><Phone className="mr-1 inline h-3 w-3" /> Phone</dt><dd>{employee.phone}</dd></div>}
                            {employee.address && <div className="flex justify-between"><dt className="text-muted-foreground"><MapPin className="mr-1 inline h-3 w-3" /> Address</dt><dd className="max-w-xs text-right">{employee.address}</dd></div>}
                        </dl>
                    </Card>

                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold"><Briefcase className="mr-2 inline h-5 w-5" />Employment</h2>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between"><dt className="text-muted-foreground"><Building2 className="mr-1 inline h-3 w-3" /> Department</dt><dd>{employee.department?.name ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Position</dt><dd>{employee.position?.title ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground"><Calendar className="mr-1 inline h-3 w-3" /> Hire Date</dt><dd>{employee.hire_date ?? '—'}</dd></div>
                            {employee.salary && <div className="flex justify-between"><dt className="text-muted-foreground">Salary</dt><dd>₱{Number(employee.salary).toLocaleString()}</dd></div>}
                        </dl>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <CardHeader className="px-0 pt-0"><h2 className="text-lg font-semibold"><Clock className="mr-2 inline h-5 w-5" />Recent Attendance</h2></CardHeader>
                        {attendance?.length ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Time In</TableHead>
                                        <TableHead>Time Out</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {attendance.slice(0, 5).map((a: any) => (
                                        <TableRow key={a.id}>
                                            <TableCell>{a.date}</TableCell>
                                            <TableCell>{a.time_in ?? '—'}</TableCell>
                                            <TableCell>{a.time_out ?? '—'}</TableCell>
                                            <TableCell>
                                                <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${a.status === 'present' ? 'bg-green-100 text-green-800' : a.status === 'late' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{a.status}</span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : <p className="text-muted-foreground text-sm">No attendance records.</p>}
                    </Card>

                    <Card className="p-6">
                        <CardHeader className="px-0 pt-0"><h2 className="text-lg font-semibold"><Calendar className="mr-2 inline h-5 w-5" />Leave Requests</h2></CardHeader>
                        {leaveRequests?.length ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Dates</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {leaveRequests.slice(0, 5).map((l: any) => (
                                        <TableRow key={l.id}>
                                            <TableCell className="capitalize">{l.leave_type?.name ?? l.type ?? '—'}</TableCell>
                                            <TableCell>{l.start_date} → {l.end_date ?? ''}</TableCell>
                                            <TableCell>
                                                <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${l.status === 'approved' ? 'bg-green-100 text-green-800' : l.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{l.status}</span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : <p className="text-muted-foreground text-sm">No leave requests.</p>}
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

const Building2 = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>;