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
import usg from '@/routes/usg';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Calendar,
    ClipboardList,
    FileText,
    Folder,
    LayoutGrid,
    Megaphone,
    Target,
    Users,
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

        // USG Admin/Officer Navigation
        if (hasAnyRole(['usg-admin', 'usg-officer'])) {
            items.push(
                {
                    title: 'USG Dashboard',
                    href: usg.admin.dashboard(),
                    icon: LayoutGrid,
                },
                {
                    title: 'Announcements',
                    href: usg.admin.announcements.index(),
                    icon: Megaphone,
                },
                {
                    title: 'Events',
                    href: usg.admin.events.index(),
                    icon: Calendar,
                },
                {
                    title: 'Resolutions',
                    href: usg.admin.resolutions.index(),
                    icon: FileText,
                },
                {
                    title: 'Officers',
                    href: usg.admin.officers.index(),
                    icon: Users,
                },
                {
                    title: 'VMGO',
                    href: usg.admin.vmgo.edit(),
                    icon: Target,
                },
            );
        }
        // Registrar Navigation
        else if (hasAnyRole(['registrar', 'cashier'])) {
            items.push(
                {
                    title: 'Dashboard',
                    href: dashboard(),
                    icon: LayoutGrid,
                },
                {
                    title: 'Document Requests',
                    href: registrar.documentRequests.index(),
                    icon: ClipboardList,
                },
            );
        }
        // Student/Default Navigation
        else {
            items.push(
                {
                    title: 'Dashboard',
                    href: dashboard(),
                    icon: LayoutGrid,
                },
                {
                    title: 'Document Requests',
                    href: registrar.documentRequests.index(),
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
                            <Link href={dashboard()} prefetch>
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
