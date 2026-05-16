import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import profile from '@/routes/profile';
import registrar from '@/routes/registrar';
import sas from '@/routes/sas';
import superAdmin from '@/routes/super-admin';
import usg from '@/routes/usg';
import voting from '@/routes/voting';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    BarChart3,
    BookCheck,
    BookOpen,
    Building2,
    Calendar,
    CalendarCheck,
    CalendarRange,
    CheckSquare,
    ClipboardList,
    Clock,
    DollarSign,
    FileText,
    GraduationCap,
    LayoutGrid,
    ListChecks,
    Megaphone,
    Percent,
    RefreshCw,
    Settings,
    Shield,
    Star,
    Tags,
    Target,
    Users,
    Vote,
    Wrench,
} from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    // Footer navigation items
    const footerNavItems: NavItem[] = [
        {
            title: 'Settings',
            href: profile.edit.url(),
            icon: Settings,
        },
    ];

    // Helper function to check if user has any of the specified roles
    const hasAnyRole = (roles: string[]): boolean => {
        if (!user || !user.roles) return false;
        const userRoles = Array.isArray(user.roles)
            ? user.roles.map((r: string | { name: string }) =>
                  typeof r === 'string' ? r : r.name,
              )
            : [];
        return roles.some((role) => userRoles.includes(role));
    };

    // Build navigation items based on user roles
    const getMainNavItems = (): NavItem[] => {
        const items: NavItem[] = [];

        // Super Admin Navigation
        if (hasAnyRole(['super-admin'])) {
            items.push(
                {
                    title: 'Super Admin Dashboard',
                    href: superAdmin.dashboard.url(),
                    icon: LayoutGrid,
                },
                {
                    title: 'Analytics',
                    href: superAdmin.analytics.url(),
                    icon: BarChart3,
                },
                {
                    title: 'User Management',
                    href: superAdmin.users.url(),
                    icon: Users,
                },
                {
                    title: 'System Settings',
                    href: superAdmin.systemSettings.url(),
                    icon: FileText,
                },
                {
                    title: 'Audit Logs',
                    href: superAdmin.auditLogs.url(),
                    icon: ClipboardList,
                },
                {
                    title: 'Reports',
                    href: superAdmin.reports.url(),
                    icon: Target,
                },
                {
                    title: 'System Config',
                    href: superAdmin.systemConfig.url(),
                    icon: BookOpen,
                },
            );
        }

        // USG Admin/Officer Navigation
        else if (hasAnyRole(['usg-admin', 'usg-officer'])) {
            items.push(
                {
                    title: 'USG Dashboard',
                    href: usg.admin.dashboard.url(),
                    icon: LayoutGrid,
                },
                {
                    title: 'Analytics',
                    href: '/usg/admin/analytics',
                    icon: BarChart3,
                },
                {
                    title: 'Announcements',
                    href: usg.admin.announcements.index.url(),
                    icon: Megaphone,
                },
                {
                    title: 'Events',
                    href: usg.admin.events.index.url(),
                    icon: Calendar,
                },
                {
                    title: 'Resolutions',
                    href: usg.admin.resolutions.index.url(),
                    icon: FileText,
                },
                {
                    title: 'Officers',
                    href: usg.admin.officers.index.url(),
                    icon: Users,
                },
                {
                    title: 'VMGO',
                    href: usg.admin.vmgo.edit.url(),
                    icon: Target,
                },
            );
        }

        // Voting Admin/Manager Navigation
        else if (hasAnyRole(['voting-admin', 'voting-manager'])) {
            items.push(
                {
                    title: 'Elections',
                    href: voting.admin.elections.index.url(),
                    icon: Vote,
                },
                {
                    title: 'Analytics',
                    href: '/voting/admin/analytics',
                    icon: BarChart3,
                },
                {
                    title: 'Candidates',
                    href: voting.admin.candidates.index.url(),
                    icon: Users,
                },
                {
                    title: 'Positions',
                    href: voting.admin.positions.index.url(),
                    icon: ListChecks,
                },
                {
                    title: 'Partylists',
                    href: voting.admin.partylists.index.url(),
                    icon: Building2,
                },
                {
                    title: 'Voters',
                    href: voting.admin.voters.index.url(),
                    icon: CheckSquare,
                },
                {
                    title: 'Activity Logs',
                    href: voting.admin.activityLogs.index.url(),
                    icon: ClipboardList,
                },
                {
                    title: 'Feedback',
                    href: voting.admin.feedback.index.url(),
                    icon: FileText,
                },
            );
        }

        // Admission Admin/Staff Navigation
        else if (hasAnyRole(['admission-admin', 'admission-staff'])) {
            items.push(
                {
                    title: 'Admission Dashboard',
                    href: route('admission.admin.dashboard'),
                    icon: LayoutGrid,
                },
                {
                    title: 'Applicants',
                    href: route('admission.admin.applicants.index'),
                    icon: Users,
                },
                {
                    title: 'Enrollments',
                    href: route('admission.admin.enrollments.index'),
                    icon: ListChecks,
                },
                {
                    title: 'Programs',
                    href: route('admission.admin.programs.index'),
                    icon: BookOpen,
                },
                {
                    title: 'Academic Terms',
                    href: route('admission.admin.terms.index'),
                    icon: Calendar,
                },
                {
                    title: 'Subjects',
                    href: route('admission.admin.subjects.index'),
                    icon: FileText,
                },
                {
                    title: 'Sections',
                    href: route('admission.admin.sections.index'),
                    icon: Building2,
                },
                {
                    title: 'Schedules',
                    href: route('admission.admin.schedules.index'),
                    icon: Calendar,
                },
                {
                    title: 'Grade Management',
                    href: route('admission.admin.grades.index'),
                    icon: GraduationCap,
                },
                {
                    title: 'Transcripts',
                    href: route('admission.admin.transcripts.index'),
                    icon: FileText,
                },
            );
        }

        // SAS Admin/Staff Navigation
        else if (hasAnyRole(['sas-admin', 'sas-staff'])) {
            items.push(
                {
                    title: 'SAS Dashboard',
                    href: sas.admin.dashboard.url(),
                    icon: LayoutGrid,
                },
                {
                    title: 'Analytics & Reports',
                    href: '/sas/admin/reports',
                    icon: BarChart3,
                },
                {
                    title: 'Scholarships',
                    href: sas.admin.scholarships.index.url(),
                    icon: GraduationCap,
                },
                {
                    title: 'Renewals',
                    href: sas.admin.renewals.index.url(),
                    icon: RefreshCw,
                },
                {
                    title: 'Insurance',
                    href: sas.admin.insurance.index.url(),
                    icon: Shield,
                },
                {
                    title: 'Organizations',
                    href: sas.admin.organizations.index.url(),
                    icon: Building2,
                },
                {
                    title: 'Activities',
                    href: sas.admin.activities.index.url(),
                    icon: Calendar,
                },
                {
                    title: 'Documents',
                    href: sas.admin.documents.index.url(),
                    icon: FileText,
                },
            );
        }

        // Clinic Admin Navigation
        else if (hasAnyRole(['clinic-admin', 'clinic-doctor', 'clinic-nurse'])) {
            items.push(
                {
                    title: 'Clinic Dashboard',
                    href: route('clinic.admin.dashboard'),
                    icon: LayoutGrid,
                },
                {
                    title: 'Medical Records',
                    href: route('clinic.admin.medical-records.index'),
                    icon: Users,
                },
                {
                    title: 'Consultations',
                    href: route('clinic.admin.consultations.index'),
                    icon: ClipboardList,
                },
                {
                    title: 'Appointments',
                    href: route('clinic.admin.appointments.index'),
                    icon: Calendar,
                },
                {
                    title: 'Immunizations',
                    href: route('clinic.admin.immunizations.index'),
                    icon: Shield,
                },
                {
                    title: 'Dental Records',
                    href: route('clinic.admin.dental-records.index'),
                    icon: Star,
                },
                {
                    title: 'Physical Exams',
                    href: route('clinic.admin.physical-exams.index'),
                    icon: CheckSquare,
                },
                {
                    title: 'Referrals',
                    href: route('clinic.admin.referrals.index'),
                    icon: Share2,
                },
            );
        }

        // Alumni Admin Navigation
        else if (hasAnyRole(['alumni-admin', 'alumni-staff'])) {
            items.push(
                {
                    title: 'Alumni Dashboard',
                    href: route('alumni.admin.dashboard'),
                    icon: LayoutGrid,
                },
                {
                    title: 'Alumni',
                    href: route('alumni.admin.alumni.index'),
                    icon: Users,
                },
                {
                    title: 'Events',
                    href: route('alumni.admin.events.index'),
                    icon: Calendar,
                },
                {
                    title: 'Donations',
                    href: route('alumni.admin.donations.index'),
                    icon: DollarSign,
                },
                {
                    title: 'Employment Records',
                    href: route('alumni.admin.employment-records.index'),
                    icon: ClipboardList,
                },
                {
                    title: 'Surveys',
                    href: route('alumni.admin.surveys.index'),
                    icon: FileText,
                },
                {
                    title: 'Reports',
                    href: route('alumni.admin.reports.index'),
                    icon: BarChart3,
                },
            );
        }

        // Facilities Admin Navigation
        else if (hasAnyRole(['facilities-admin', 'facilities-staff'])) {
            items.push(
                {
                    title: 'Facilities Dashboard',
                    href: route('facilities.admin.dashboard'),
                    icon: LayoutGrid,
                },
                {
                    title: 'Facilities',
                    href: route('facilities.admin.facilities.index'),
                    icon: Building2,
                },
                {
                    title: 'Equipment',
                    href: route('facilities.admin.equipment.index'),
                    icon: Wrench,
                },
                {
                    title: 'Reservations',
                    href: route('facilities.admin.reservations.index'),
                    icon: Calendar,
                },
                {
                    title: 'Maintenance',
                    href: route('facilities.admin.maintenance.index'),
                    icon: Wrench,
                },
            );
        }

        // Scheduling Admin Navigation
        else if (hasAnyRole(['scheduling-admin', 'scheduling-staff'])) {
            items.push(
                {
                    title: 'Scheduling Dashboard',
                    href: route('scheduling.admin.dashboard'),
                    icon: LayoutGrid,
                },
                {
                    title: 'Events',
                    href: route('scheduling.admin.events.index'),
                    icon: Calendar,
                },
                {
                    title: 'Academic Schedules',
                    href: route('scheduling.admin.academic-schedules.index'),
                    icon: CalendarRange,
                },
            );
        }

        // Discipline Admin Navigation
        else if (hasAnyRole(['discipline-admin', 'discipline-staff'])) {
            items.push(
                {
                    title: 'Discipline Dashboard',
                    href: route('discipline.admin.dashboard'),
                    icon: LayoutGrid,
                },
                {
                    title: 'Offense Categories',
                    href: route('discipline.admin.offense-categories.index'),
                    icon: Tags,
                },
                {
                    title: 'Offenses',
                    href: route('discipline.admin.offenses.index'),
                    icon: ListChecks,
                },
                {
                    title: 'Incidents',
                    href: route('discipline.admin.incidents.index'),
                    icon: ClipboardList,
                },
                {
                    title: 'Sanctions',
                    href: route('discipline.admin.sanctions.index'),
                    icon: Shield,
                },
                {
                    title: 'Appeals',
                    href: route('discipline.admin.appeals.index'),
                    icon: RefreshCw,
                },
                {
                    title: 'Reports',
                    href: route('discipline.admin.reports.index'),
                    icon: BarChart3,
                },
            );
        }

        // Helpdesk Admin Navigation
        else if (hasAnyRole(['helpdesk-admin', 'helpdesk-technician'])) {
            items.push(
                {
                    title: 'Helpdesk Dashboard',
                    href: route('helpdesk.admin.dashboard'),
                    icon: LayoutGrid,
                },
                {
                    title: 'Support Tickets',
                    href: route('helpdesk.admin.tickets.index'),
                    icon: ClipboardList,
                },
                {
                    title: 'Categories',
                    href: route('helpdesk.admin.categories.index'),
                    icon: Tags,
                },
                {
                    title: 'Reports',
                    href: route('helpdesk.admin.reports'),
                    icon: BarChart3,
                },
            );
        }

        // Registrar Navigation
        else if (
            hasAnyRole(['registrar-staff', 'registrar-admin', 'cashier'])
        ) {
            items.push({
                title: 'Dashboard',
                href: dashboard.url(),
                icon: LayoutGrid,
            });
            if (hasAnyRole(['registrar-admin', 'super-admin'])) {
                items.push({
                    title: 'Analytics',
                    href: '/admin/analytics',
                    icon: BarChart3,
                });
            }
        }
        // HR Admin Navigation
        else if (hasAnyRole(['hr-admin', 'hr-staff'])) {
            items.push(
                {
                    title: 'HR Dashboard',
                    href: route('hr.admin.dashboard'),
                    icon: LayoutGrid,
                },
                {
                    title: 'Employees',
                    href: route('hr.admin.employees.index'),
                    icon: Users,
                },
                {
                    title: 'Departments',
                    href: route('hr.admin.departments.index'),
                    icon: Building2,
                },
                {
                    title: 'Attendance',
                    href: route('hr.admin.attendance.index'),
                    icon: Clock,
                },
                {
                    title: 'Leave Requests',
                    href: route('hr.admin.leave.index'),
                    icon: CalendarCheck,
                },
                {
                    title: 'Evaluations',
                    href: route('hr.admin.evaluations.index'),
                    icon: Star,
                },
            );
        }

        // Library Admin Navigation
        else if (hasAnyRole(['library-admin', 'library-staff'])) {
            items.push(
                {
                    title: 'Library Dashboard',
                    href: route('library.admin.dashboard'),
                    icon: LayoutGrid,
                },
                {
                    title: 'Books',
                    href: route('library.admin.books.index'),
                    icon: BookOpen,
                },
                {
                    title: 'Categories',
                    href: route('library.admin.categories.index'),
                    icon: Tags,
                },
                {
                    title: 'Borrowings',
                    href: route('library.admin.borrowings.index'),
                    icon: BookCheck,
                },
                {
                    title: 'Fines',
                    href: route('library.admin.fines.index'),
                    icon: DollarSign,
                },
            );
        }

        // Accounting Admin Navigation
        else if (hasAnyRole(['accounting-admin', 'accounting-staff'])) {
            // ... accounting items
        }

        // Guidance Admin Navigation
        else if (hasAnyRole(['guidance-admin', 'guidance-counselor'])) {
            items.push(
                {
                    title: 'Guidance Dashboard',
                    href: route('guidance.admin.dashboard'),
                    icon: LayoutGrid,
                },
                {
                    title: 'Counselors',
                    href: route('guidance.admin.counselors.index'),
                    icon: Users,
                },
                {
                    title: 'Appointments',
                    href: route('guidance.admin.appointments.index'),
                    icon: CalendarCheck,
                },
                {
                    title: 'Sessions',
                    href: route('guidance.admin.sessions.index'),
                    icon: ClipboardList,
                },
                {
                    title: 'Appointment Slots',
                    href: route('guidance.admin.slots.index'),
                    icon: Clock,
                },
                {
                    title: 'Assessments',
                    href: route('guidance.admin.assessments.index'),
                    icon: FileText,
                },
                {
                    title: 'Referrals',
                    href: route('guidance.admin.referrals.index'),
                    icon: Share2,
                },
                {
                    title: 'Interventions',
                    href: route('guidance.admin.interventions.index'),
                    icon: Star,
                },
                {
                    title: 'Incident Reports',
                    href: route('guidance.admin.incident-reports.index'),
                    icon: AlertTriangle,
                },
            );
        }

        // Curriculum Admin Navigation
        else if (hasAnyRole(['curriculum-admin', 'curriculum-staff'])) {
            items.push(
                {
                    title: 'Curriculum Dashboard',
                    href: route('curriculum.admin.dashboard'),
                    icon: LayoutGrid,
                },
                {
                    title: 'Programs',
                    href: route('curriculum.admin.programs.index'),
                    icon: BookOpen,
                },
                {
                    title: 'Courses',
                    href: route('curriculum.admin.courses.index'),
                    icon: FileText,
                },
                {
                    title: 'Curricula',
                    href: route('curriculum.admin.curricula.index'),
                    icon: ClipboardList,
                },
                {
                    title: 'Syllabi',
                    href: route('curriculum.admin.syllabi.index'),
                    icon: BookCheck,
                },
                {
                    title: 'Textbooks',
                    href: route('curriculum.admin.textbooks.index'),
                    icon: BookOpen,
                },
                {
                    title: 'Reports',
                    href: route('curriculum.admin.reports'),
                    icon: BarChart3,
                },
            );
        }

        // Research Admin Navigation
        else if (hasAnyRole(['research-admin', 'research-panelist', 'research-adviser'])) {
            items.push(
                {
                    title: 'Research Dashboard',
                    href: route('research.admin.dashboard'),
                    icon: LayoutGrid,
                },
                {
                    title: 'Research Types',
                    href: route('research.admin.research-types.index'),
                    icon: Tags,
                },
                {
                    title: 'Proposals',
                    href: route('research.admin.proposals.index'),
                    icon: FileText,
                },
                {
                    title: 'Defenses',
                    href: route('research.admin.defenses.index'),
                    icon: CalendarCheck,
                },
                {
                    title: 'Grade Reports',
                    href: route('research.admin.grade-reports.index'),
                    icon: GraduationCap,
                },
                {
                    title: 'Publications',
                    href: route('research.admin.publications.index'),
                    icon: BookOpen,
                },
                {
                    title: 'Journals',
                    href: route('research.admin.journals.index'),
                    icon: BookCheck,
                },
                {
                    title: 'Panelists',
                    href: route('research.admin.panels.index'),
                    icon: Users,
                },
                {
                    title: 'Reports',
                    href: route('research.admin.reports'),
                    icon: BarChart3,
                },
            );
        }

// Student/Default Navigation - Unified 4 Systems
        else {
            items.push(
                {
                    title: 'Dashboard',
                    href: dashboard.url(),
                    icon: LayoutGrid,
                },
                {
                    title: 'Document Requests',
                    href: registrar.documentRequests.index.url(),
                    icon: ClipboardList,
                },
                {
                    title: 'My Scholarships',
                    href: sas.student.scholarships.index.url(),
                    icon: GraduationCap,
                },
                {
                    title: 'My Insurance',
                    href: sas.student.insurance.index.url(),
                    icon: Shield,
                },
                {
                    title: 'USG Portal',
                    href: usg.index.url(),
                    icon: Users,
                },
                {
                    title: 'Voting System',
                    href: voting.index.url(),
                    icon: Vote,
                },
                {
                    title: 'Library',
                    href: route('library.index'),
                    icon: BookOpen,
                },
            );
        }

        return items;
    };

    // Get the navigation label based on user role
    const getNavLabel = (): string => {
        if (hasAnyRole(['super-admin'])) {
            return 'Super Admin';
        }
        if (hasAnyRole(['usg-admin', 'usg-officer'])) {
            return 'USG Management';
        }
        if (hasAnyRole(['voting-admin', 'voting-manager'])) {
            return 'Voting Management';
        }
        if (hasAnyRole(['admission-admin', 'admission-staff'])) {
            return 'Admission Management';
        }
        if (hasAnyRole(['sas-admin', 'sas-staff'])) {
            return 'SAS Management';
        }
        if (hasAnyRole(['hr-admin', 'hr-staff'])) {
            return 'HR Management';
        }
        if (hasAnyRole(['library-admin', 'library-staff'])) {
            return 'Library Management';
        }
        if (hasAnyRole(['accounting-admin', 'accounting-staff'])) {
            return 'Accounting Management';
        }
        if (hasAnyRole(['guidance-admin', 'guidance-counselor'])) {
            return 'Guidance Management';
        }
        if (hasAnyRole(['curriculum-admin', 'curriculum-staff'])) {
            return 'Curriculum Management';
        }
        if (hasAnyRole(['research-admin', 'research-panelist', 'research-adviser'])) {
            return 'Research Management';
        }
        if (hasAnyRole(['clinic-admin', 'clinic-doctor', 'clinic-nurse'])) {
            return 'Clinic Management';
        }
        if (hasAnyRole(['alumni-admin', 'alumni-staff'])) {
            return 'Alumni Management';
        }
        if (hasAnyRole(['scheduling-admin', 'scheduling-staff'])) {
            return 'Scheduling';
        }
        if (hasAnyRole(['discipline-admin', 'discipline-staff'])) {
            return 'Discipline Management';
        }
        if (hasAnyRole(['helpdesk-admin', 'helpdesk-technician'])) {
            return 'Helpdesk';
        }
        if (hasAnyRole(['registrar-staff', 'registrar-admin', 'cashier'])) {
            return 'Registrar';
        }
        return 'Student Services';
    };

    const mainNavItems = getMainNavItems();
    const navLabel = getNavLabel();

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            render={<Link href={dashboard.url()} prefetch />}
                        >
                            <AppLogo />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} label={navLabel} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
