import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

interface LibraryStats {
    popularBooks: {
        id: number;
        title: string;
        author: string;
        borrowings_count: number;
    }[];
    categoryDistribution: { id: number; name: string; books_count: number }[];
    monthlyBorrowings: { month: string; total: number }[];
}

export default function Statistics({ stats }: { stats: LibraryStats }) {
    return (
        <AppLayout>
            <Head title="Library Statistics" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('library.admin.dashboard')}>
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Library Statistics</h1>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <CardHeader>
                            <CardTitle>Most Borrowed Books</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Author</TableHead>
                                        <TableHead className="text-right">
                                            Borrows
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {stats.popularBooks.map((b) => (
                                        <TableRow key={b.id}>
                                            <TableCell className="font-medium">
                                                {b.title}
                                            </TableCell>
                                            <TableCell>{b.author}</TableCell>
                                            <TableCell className="text-right">
                                                {b.borrowings_count}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {stats.popularBooks.length === 0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={3}
                                                className="py-8 text-center text-muted-foreground"
                                            >
                                                No borrowing data.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card className="p-6">
                        <CardHeader>
                            <CardTitle>Books by Category</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Category</TableHead>
                                        <TableHead className="text-right">
                                            Books
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {stats.categoryDistribution.map((c) => (
                                        <TableRow key={c.id}>
                                            <TableCell className="font-medium">
                                                {c.name}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {c.books_count}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {stats.categoryDistribution.length ===
                                        0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={2}
                                                className="py-8 text-center text-muted-foreground"
                                            >
                                                No categories.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <Card className="p-6">
                    <CardHeader>
                        <CardTitle>
                            Monthly Borrowings (last 12 months)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Month</TableHead>
                                    <TableHead className="text-right">
                                        Borrowings
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stats.monthlyBorrowings.map((m) => (
                                    <TableRow key={m.month}>
                                        <TableCell className="font-medium">
                                            {m.month}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {m.total}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {stats.monthlyBorrowings.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={2}
                                            className="py-8 text-center text-muted-foreground"
                                        >
                                            No borrowing data.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
