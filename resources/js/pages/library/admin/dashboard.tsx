import { Head, Link } from '@inertiajs/react';
import { BookOpen, FolderOpen, Layers, BookCheck, BookX, Clock, DollarSign, Users, CalendarCheck } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

interface DashboardStats {
    total_books: number;
    total_categories: number;
    total_copies: number;
    available_copies: number;
    active_borrowings: number;
    overdue_borrowings: number;
    pending_borrowings: number;
    total_users_borrowed: number;
    unpaid_fines: number;
    total_fines_collected: number;
    active_reservations: number;
}

export default function Dashboard({ stats }: { stats: DashboardStats }) {
    const cards = [
        { title: 'Total Books', value: stats.total_books, icon: BookOpen, color: 'text-blue-600', href: route('library.admin.books.index') },
        { title: 'Categories', value: stats.total_categories, icon: FolderOpen, color: 'text-purple-600', href: route('library.admin.categories.index') },
        { title: 'Total Copies', value: stats.total_copies, icon: Layers, color: 'text-cyan-600' },
        { title: 'Available', value: stats.available_copies, icon: BookCheck, color: 'text-green-600' },
        { title: 'Active Borrowings', value: stats.active_borrowings, icon: BookOpen, color: 'text-indigo-600', href: route('library.admin.borrowings.active') },
        { title: 'Overdue', value: stats.overdue_borrowings, icon: Clock, color: 'text-red-600', href: route('library.admin.borrowings.overdue') },
        { title: 'Pending', value: stats.pending_borrowings, icon: CalendarCheck, color: 'text-yellow-600' },
        { title: 'Users Who Borrowed', value: stats.total_users_borrowed, icon: Users, color: 'text-teal-600' },
        { title: 'Unpaid Fines', value: `₱${Number(stats.unpaid_fines ?? 0).toLocaleString()}`, icon: DollarSign, color: 'text-orange-600', href: route('library.admin.fines.index') },
        { title: 'Active Reservations', value: stats.active_reservations, icon: BookCheck, color: 'text-rose-600' },
    ];

    return (
        <AppLayout>
            <Head title="Library Dashboard" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Library Management Dashboard</h1>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {cards.map((card) => {
                        const content = (
                            <Card className={card.href ? 'cursor-pointer transition-shadow hover:shadow-md' : ''}>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                                    <card.icon className={`${card.color} h-5 w-5`} />
                                </CardHeader>
                                <CardContent><div className="text-2xl font-bold">{card.value}</div></CardContent>
                            </Card>
                        );
                        return card.href ? <Link key={card.title} href={card.href}>{content}</Link> : <div key={card.title}>{content}</div>;
                    })}
                </div>
            </div>
        </AppLayout>
    );
}