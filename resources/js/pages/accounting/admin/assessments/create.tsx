import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

interface FeeItem {
    id: number;
    name: string;
    code: string;
    amount: number;
    category?: { name: string } | null;
}

interface Discount {
    id: number;
    name: string;
    code: string;
}

export default function Create({
    feeItems,
    discounts,
}: {
    feeItems: FeeItem[];
    discounts: Discount[];
}) {
    const { data, setData, post, processing, errors } = useForm({
        assessable_type: 'App\\Models\\Student',
        assessable_id: '',
        academic_year: '',
        semester: '',
        due_date: '',
        notes: '',
        lines: [{ fee_item_id: '', amount: 0 }],
    });

    const setLine = (
        index: number,
        patch: Partial<(typeof data.lines)[number]>,
    ) => {
        const lines = [...data.lines];
        lines[index] = { ...lines[index], ...patch };
        setData('lines', lines);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('accounting.admin.assessments.store'));
    };

    return (
        <AppLayout>
            <Head title="New Assessment" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('accounting.admin.assessments.index')}>
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">New Assessment</h1>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <Card className="space-y-4 p-6">
                        <h2 className="text-lg font-semibold">
                            Student & Term
                        </h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="text-sm">
                                <span className="mb-1 block font-medium">
                                    Student ID (internal)
                                </span>
                                <input
                                    type="number"
                                    value={data.assessable_id}
                                    onChange={(e) =>
                                        setData('assessable_id', e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-1.5"
                                />
                                {errors.assessable_id && (
                                    <span className="text-sm text-red-600">
                                        {errors.assessable_id}
                                    </span>
                                )}
                            </label>
                            <label className="text-sm">
                                <span className="mb-1 block font-medium">
                                    Due Date
                                </span>
                                <input
                                    type="date"
                                    value={data.due_date}
                                    onChange={(e) =>
                                        setData('due_date', e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-1.5"
                                />
                            </label>
                            <label className="text-sm">
                                <span className="mb-1 block font-medium">
                                    Academic Year
                                </span>
                                <input
                                    value={data.academic_year}
                                    onChange={(e) =>
                                        setData('academic_year', e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-1.5"
                                    placeholder="2025-2026"
                                />
                            </label>
                            <label className="text-sm">
                                <span className="mb-1 block font-medium">
                                    Semester
                                </span>
                                <input
                                    value={data.semester}
                                    onChange={(e) =>
                                        setData('semester', e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-1.5"
                                    placeholder="1st"
                                />
                            </label>
                        </div>
                        <label className="block text-sm">
                            <span className="mb-1 block font-medium">
                                Notes
                            </span>
                            <textarea
                                value={data.notes}
                                onChange={(e) =>
                                    setData('notes', e.target.value)
                                }
                                className="w-full rounded-md border px-3 py-1.5"
                                rows={2}
                            />
                        </label>
                    </Card>

                    <Card className="p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Lines</h2>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    setData('lines', [
                                        ...data.lines,
                                        { fee_item_id: '', amount: 0 },
                                    ])
                                }
                            >
                                Add Line
                            </Button>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Fee Item</TableHead>
                                    <TableHead className="text-right">
                                        Amount
                                    </TableHead>
                                    <TableHead />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.lines.map((line, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <select
                                                value={line.fee_item_id}
                                                onChange={(e) => {
                                                    const item = feeItems.find(
                                                        (f) =>
                                                            String(f.id) ===
                                                            e.target.value,
                                                    );
                                                    setLine(i, {
                                                        fee_item_id:
                                                            e.target.value,
                                                        amount:
                                                            item?.amount ?? 0,
                                                    });
                                                }}
                                                className="w-full rounded-md border px-3 py-1.5"
                                            >
                                                <option value="">
                                                    Select fee item…
                                                </option>
                                                {feeItems.map((f) => (
                                                    <option
                                                        key={f.id}
                                                        value={f.id}
                                                    >
                                                        {f.code} — {f.name} (₱
                                                        {(
                                                            f.amount ?? 0
                                                        ).toLocaleString()}
                                                        )
                                                    </option>
                                                ))}
                                            </select>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <input
                                                type="number"
                                                min={0}
                                                step="0.01"
                                                value={line.amount}
                                                onChange={(e) =>
                                                    setLine(i, {
                                                        amount: Number(
                                                            e.target.value,
                                                        ),
                                                    })
                                                }
                                                className="w-36 rounded-md border px-3 py-1.5 text-right"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                disabled={
                                                    data.lines.length === 1
                                                }
                                                onClick={() =>
                                                    setData(
                                                        'lines',
                                                        data.lines.filter(
                                                            (_, j) => j !== i,
                                                        ),
                                                    )
                                                }
                                            >
                                                Remove
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {errors.lines && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.lines}
                            </p>
                        )}
                    </Card>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            Create Assessment
                        </Button>
                        <span className="text-sm text-muted-foreground">
                            {discounts.length} active discount(s) available at
                            payment time.
                        </span>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
