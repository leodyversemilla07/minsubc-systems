import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { BookOpen, Search, Library, BookMarked } from 'lucide-react';
import { useState } from 'react';

interface Props extends PageProps {
    stats: { total_books: number; total_categories: number; total_copies: number; available_copies: number };
    recentBooks: { id: number; title: string; author: string; isbn: string; category: { name: string } | null }[];
    categories: { id: number; name: string; slug: string }[];
}

export default function LibraryIndex({ stats, recentBooks, categories }: Props) {
    const [search, setSearch] = useState('');

    return (
        <AppLayout>
            <Head title="Library" />
            <div className="flex flex-col gap-8 p-6">
                {/* Hero */}
                <div className="text-center py-12">
                    <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                        <Library className="h-10 w-10" /> MinSU Library
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                        Explore our collection of books, journals, and academic resources.
                    </p>
                    <div className="max-w-md mx-auto flex gap-2">
                        <Input placeholder="Search books by title, author, or ISBN..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && (window.location.href = route('library.books.index', { search }))} />
                        <Link href={route('library.books.index', { search })}><Button><Search className="h-4 w-4" /></Button></Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card><CardContent className="pt-6 text-center"><p className="text-3xl font-bold">{stats?.total_books}</p><p className="text-sm text-muted-foreground">Book Titles</p></CardContent></Card>
                    <Card><CardContent className="pt-6 text-center"><p className="text-3xl font-bold">{stats?.total_copies}</p><p className="text-sm text-muted-foreground">Total Copies</p></CardContent></Card>
                    <Card><CardContent className="pt-6 text-center"><p className="text-3xl font-bold text-green-600">{stats?.available_copies}</p><p className="text-sm text-muted-foreground">Available</p></CardContent></Card>
                    <Card><CardContent className="pt-6 text-center"><p className="text-3xl font-bold">{stats?.total_categories}</p><p className="text-sm text-muted-foreground">Categories</p></CardContent></Card>
                </div>

                {/* Categories */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Browse by Category</h2>
                    <div className="flex flex-wrap gap-2">
                        {categories?.map(c => (
                            <Link key={c.id} href={route('library.categories.show', c.id)}>
                                <Button variant="outline" size="sm">{c.name}</Button>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Recent Books */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Recent Books</h2>
                        <Link href={route('library.books.index')}><Button variant="outline" size="sm">View All</Button></Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {recentBooks?.map(b => (
                            <Link key={b.id} href={route('library.books.show', b.id)}>
                                <Card className="hover:shadow-md transition-shadow h-full">
                                    <CardContent className="pt-6">
                                        <div className="flex items-start gap-3">
                                            <BookOpen className="h-8 w-8 text-primary shrink-0" />
                                            <div className="min-w-0">
                                                <p className="font-semibold truncate">{b.title}</p>
                                                <p className="text-sm text-muted-foreground">{b.author}</p>
                                                <p className="text-xs text-muted-foreground mt-1">{b.category?.name}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}