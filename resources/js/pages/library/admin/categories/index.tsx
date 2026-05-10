import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { Plus, Pencil, BookOpen, FolderOpen } from 'lucide-react';
import { useState } from 'react';

interface Props extends PageProps {
    categories: { id: number; name: string; slug: string; description: string | null; is_active: boolean; books_count: number }[];
}

export default function CategoryIndex({ categories }: Props) {
    return (
        <AppLayout>
            <Head title="Library - Categories" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold flex items-center gap-2"><FolderOpen className="h-6 w-6" /> Book Categories</h1>
                    <Link href={route('library.admin.categories.create')}><Button><Plus className="mr-2 h-4 w-4" /> Add Category</Button></Link>
                </div>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Books</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories?.map(c => (
                                    <TableRow key={c.id}>
                                        <TableCell className="font-medium">{c.name}</TableCell>
                                        <TableCell className="text-muted-foreground">{c.slug}</TableCell>
                                        <TableCell><Badge variant="secondary">{c.books_count}</Badge></TableCell>
                                        <TableCell>
                                            <Badge variant={c.is_active ? 'default' : 'destructive'}>{c.is_active ? 'Active' : 'Inactive'}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link href={route('library.admin.categories.edit', c.id)}>
                                                <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}