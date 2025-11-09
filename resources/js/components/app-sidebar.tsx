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
import registrar from '@/routes/registrar';
import sas from '@/routes/sas';
import superAdmin from '@/routes/super-admin';
import usg from '@/routes/usg';
import voting from '@/routes/voting';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Building2,
    Calendar,
    CheckSquare,
    ClipboardList,
    FileText,
    Folder,
    GraduationCap,
    LayoutGrid,
    ListChecks,
    Megaphone,
    Shield,
    Target,
    Users,
    Vote,
} from 'lucide-react';
import AppLogo from './app-logo';

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

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

        // SAS Admin/Staff Navigation
        else if (hasAnyRole(['sas-admin', 'sas-staff'])) {
            items.push(
                {
                    title: 'SAS Dashboard',
                    href: sas.admin.dashboard.url(),
                    icon: LayoutGrid,
                },
                {
                    title: 'Scholarships',
                    href: sas.admin.scholarships.index.url(),
                    icon: GraduationCap,
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

        // Registrar Navigation
        else if (
            hasAnyRole(['registrar-staff', 'registrar-admin', 'cashier'])
        ) {
            items.push({
                title: 'Dashboard',
                href: dashboard.url(),
                icon: LayoutGrid,
            });
        }
        // Student/Default Navigation
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
            );
        }

        return items;
    };

    const mainNavItems = getMainNavItems();

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard.url()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
