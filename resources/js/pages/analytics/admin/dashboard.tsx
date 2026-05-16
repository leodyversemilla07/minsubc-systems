import { Head } from '@inertiajs/react';
import { BarChart3, TrendingUp, Users, DollarSign, BookOpen, AlertTriangle, Building2, Wrench, Calendar, GraduationCap, HeartPulse, Vote, Landmark } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const icons: Record<string, any> = {
    Users, DollarSign, BookOpen, AlertTriangle, Building2, Wrench,
    Calendar, GraduationCap, HeartPulse, Vote, Landmark, TrendingUp, BarChart3,
};

export default function Dashboard({ stats }: { stats: any }) {
    const sections = [
        {
            title: 'Academic',
            icon: GraduationCap,
            color: 'text-blue-600',
            data: [
                { label: 'Total Students', value: stats.academic.total_students },
                { label: 'New Applicants', value: stats.academic.new_applicants },
                { label: 'Active Enrollments', value: stats.academic.active_enrollments },
                { label: 'Active Programs', value: stats.academic.active_programs },
                { label: 'Courses', value: stats.academic.courses },
                { label: 'Academic Terms', value: stats.academic.academic_terms },
            ],
        },
        {
            title: 'Financial',
            icon: DollarSign,
            color: 'text-green-600',
            data: [
                { label: 'Total Invoiced', value: `₱${(stats.financial.total_invoiced).toLocaleString()}` },
                { label: 'Total Collected', value: `₱${(stats.financial.total_collected).toLocaleString()}` },
                { label: 'Outstanding', value: `₱${(stats.financial.outstanding).toLocaleString()}`, color: stats.financial.outstanding > 0 ? 'text-red-600' : '' },
                { label: 'Pending Payments', value: stats.financial.pending_payments },
            ],
        },
        {
            title: 'Operations',
            icon: Building2,
            color: 'text-purple-600',
            data: [
                { label: 'Employees', value: stats.operations.employees },
                { label: 'Departments', value: stats.operations.departments },
                { label: 'Library Books', value: stats.operations.available_books },
                { label: 'Active Borrowings', value: stats.operations.active_borrowings },
                { label: 'Overdue Books', value: stats.operations.overdue_books, color: stats.operations.overdue_books > 0 ? 'text-red-600' : '' },
                { label: 'Facilities', value: stats.operations.facility_rooms },
                { label: 'Active Reservations', value: stats.operations.active_reservations },
                { label: 'Equipment', value: stats.operations.equipment_count },
                { label: 'Pending Maintenance', value: stats.operations.pending_maintenance, color: stats.operations.pending_maintenance > 0 ? 'text-orange-600' : '' },
                { label: 'Dorm Halls', value: stats.operations.dorm_halls },
                { label: 'Dorm Occupancy', value: `${stats.operations.dorm_occupancy}/${stats.operations.dorm_capacity}` },
                { label: 'Helpdesk Tickets', value: `${stats.operations.helpdesk_open} open / ${stats.operations.helpdesk_resolved} resolved` },
            ],
        },
        {
            title: 'Student Services',
            icon: HeartPulse,
            color: 'text-red-600',
            data: [
                { label: 'Clinic Appointments', value: stats.student_services.clinic_appointments },
                { label: 'Guidance Sessions', value: stats.student_services.guidance_sessions },
                { label: 'Guidance Incidents', value: stats.student_services.guidance_incidents },
                { label: 'Discipline Incidents', value: stats.student_services.discipline_incidents },
                { label: 'Active Sanctions', value: stats.student_services.active_sanctions },
                { label: 'Pending Appeals', value: stats.student_services.pending_appeals },
                { label: 'Active Scholarships', value: stats.student_services.active_scholarships },
                { label: 'Research Proposals', value: stats.student_services.research_proposals },
                { label: 'Research Defenses', value: stats.student_services.research_defenses },
                { label: 'Publications', value: stats.student_services.publications },
                { label: 'Alumni', value: stats.student_services.alumni_count },
                { label: 'Alumni Events', value: stats.student_services.alumni_events },
            ],
        },
        {
            title: 'Governance',
            icon: Vote,
            color: 'text-amber-600',
            data: [
                { label: 'USG Officers', value: stats.governance.usg_officers },
                { label: 'Resolutions', value: stats.governance.usg_resolutions },
                { label: 'Announcements', value: stats.governance.usg_announcements },
                { label: 'Upcoming Events', value: stats.governance.upcoming_events },
                { label: 'Academic Schedules', value: stats.governance.academic_schedules },
                { label: 'Active Elections', value: stats.governance.active_elections },
                { label: 'Candidates', value: stats.governance.candidates },
            ],
        },
    ];

    return (
        <AppLayout>
            <Head title="Analytics Dashboard" />
            <div className="space-y-8 p-6">
                <div className="flex items-center gap-3">
                    <BarChart3 className="h-8 w-8 text-primary" />
                    <div>
                        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
                        <p className="text-sm text-muted-foreground">Unified metrics across all modules</p>
                    </div>
                </div>

                {/* Top summary cards */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                    <SummaryCard icon={Users} label="Students" value={stats.academic.total_students} color="text-blue-600" />
                    <SummaryCard icon={DollarSign} label="Revenue" value={`₱${(stats.financial.total_collected / 1000).toFixed(1)}K`} color="text-green-600" />
                    <SummaryCard icon={BookOpen} label="Books" value={stats.operations.available_books} color="text-purple-600" />
                    <SummaryCard icon={Building2} label="Employees" value={stats.operations.employees} color="text-indigo-600" />
                    <SummaryCard icon={GraduationCap} label="Alumni" value={stats.student_services.alumni_count} color="text-amber-600" />
                    <SummaryCard icon={AlertTriangle} label="Open Incidents" value={stats.student_services.discipline_incidents} color={stats.student_services.discipline_incidents > 0 ? 'text-red-600' : 'text-green-600'} />
                </div>

                {/* Trends section */}
                {stats.trends.enrollment?.length > 0 && (
                    <Card>
                        <CardHeader><CardTitle className="flex items-center gap-2 text-base"><TrendingUp className="h-4 w-4" />Enrollment Trend (12 months)</CardTitle></CardHeader>
                        <CardContent>
                            <div className="flex items-end gap-2">
                                {stats.trends.enrollment.map((m: any) => (
                                    <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
                                        <div className="w-full rounded-t bg-blue-500" style={{ height: `${Math.max(4, (m.count / Math.max(...stats.trends.enrollment.map((e: any) => e.count))) * 80)}px` }} />
                                        <span className="text-xs text-muted-foreground">{m.month.slice(5)}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Section cards */}
                {sections.map((section) => (
                    <Card key={section.title}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <section.icon className={`h-5 w-5 ${section.color}`} />
                                {section.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                                {section.data.map((d: any) => (
                                    <div key={d.label}>
                                        <p className="text-xs text-muted-foreground">{d.label}</p>
                                        <p className={`text-lg font-bold ${d.color ?? ''}`}>{d.value ?? 0}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </AppLayout>
    );
}

function SummaryCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: any; color: string }) {
    return (
        <Card>
            <CardContent className="flex items-center gap-3 p-4">
                <Icon className={`h-8 w-8 ${color}`} />
                <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className={`text-xl font-bold ${color}`}>{value ?? 0}</p>
                </div>
            </CardContent>
        </Card>
    );
}