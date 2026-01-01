import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

interface NavMainProps {
    items: NavItem[];
    label?: string;
}

export function NavMain({ items = [], label = 'Navigation' }: NavMainProps) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>{label}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={(() => {
                                const currentPath = page.url.split('?')[0];
                                let itemHref: string;
                                if (typeof item.href === 'string') {
                                    itemHref = item.href;
                                } else if (typeof item.href === 'object' && item.href !== null && 'url' in item.href) {
                                    itemHref = (item.href as { url: string }).url;
                                } else {
                                    itemHref = String(item.href);
                                }
                                const itemPath = itemHref.split('?')[0];
                                const isDashboard = item.title.toLowerCase().includes('dashboard');

                                if (isDashboard) {
                                    return currentPath === itemPath;
                                }

                                return currentPath === itemPath || currentPath.startsWith(itemPath + '/');
                            })()}
                            tooltip={{ children: item.title }}
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
