import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { BookOpen, Search } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { useState } from 'react';

interface Props extends PageProps {
    books: { data: any[]; links: any[] };
    categories: { id: number; name: string }[];
    filters: { search?: string; category?: string | number };
    selectedCategory?: { id: number; name: string };
}

export default function PublicBookIndex({ books, categories, filters, selectedCategory }: Props) {
    const [search, setSearch] = useState(filters?.search ?? '');

    return (
        <AppLayout>
            <Head title={selectedCategory ? `${selectedCategory.name} Books` : 'Books'} />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <BookOpen className="h-6 w-6" />
                        {selectedCategory ? `${selectedCategory.name} Books` : 'All Books'}
                    </h1>
                    <div className="flex gap-2">
                        {categories?.map(c => (
                            <Link key={c.id} href={route('library.categories.show', c.id)}>
                                <Button variant={selectedCategory?.id === c.id ? 'default' : 'outline'} size="sm">{c.name}</Button>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex gap-2 max-w-md">
                    <Input placeholder="Search books..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && router.get(route('library.books.index'), { search }, { preserveState: true })} />
                    <Button onClick={() => router.get(route('library.books.index'), { search }, { preserveState: true })}><Search className="h-4 w-4" /></Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {books?.data?.map((b: any) => (
                        <Link key={b.id} href={route('library.books.show', b.id)}>
                            <Card className="hover:shadow-md transition-shadow h-full">
                                <CardContent className="pt-6">
                                    <BookOpen className="h-8 w-8 text-primary mb-2" />
                                    <p className="font-semibold truncate">{b.title}</p>
                                    <p className="text-sm text-muted-foreground">{b.author}</p>
                                    <div className="flex items-center justify-between mt-3">
                                        <Badge variant="outline">{b.category?.name}</Badge>
                                        <Badge variant={b.available_copies > 0 ? 'secondary' : 'destructive'}>
                                            {b.available_copies} available
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {(!books?.data || books.data.length === 0) && (
                    <div className="text-center py-12">
                        <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
                        <p className="text-lg text-muted-foreground mt-4">No books found.</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}