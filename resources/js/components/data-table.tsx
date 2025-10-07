import React, { useState } from 'react';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Empty, EmptyTitle, EmptyDescription } from '@/components/ui/empty';

/**
 * A powerful, flexible data table component built on @tanstack/react-table.
 *
 * Features:
 * - Sorting on columns
 * - Filtering with search input
 * - Column visibility toggles
 * - Row selection with checkboxes (optional)
 * - Built-in pagination
 * - Actions dropdown menu
 *
 * @example
 * ```tsx
 * import { DataTable } from '@/components/data-table';
 * import { ColumnDef } from '@tanstack/react-table';
 *
 * const columns: ColumnDef<User>[] = [
 *   {
 *     accessorKey: 'name',
 *     header: 'Name',
 *     cell: ({ row }) => row.getValue('name'),
 *   },
 *   {
 *     accessorKey: 'email',
 *     header: 'Email',
 *     cell: ({ row }) => row.getValue('email'),
 *   },
 * ];
 *
 * <DataTable
 *   columns={columns}
 *   data={users}
 *   filterColumn="name"
 *   enableRowSelection={true}
 * />
 * ```
 */

interface DataTableProps<TData extends { id: number | string }, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    onViewRequest?: (id: number | string) => void
    getItemId?: (item: TData) => number | string
    filterColumn?: string
    filterPlaceholder?: string
    emptyMessage?: string
    enableRowSelection?: boolean
}

export function DataTable<TData extends { id: number | string }, TValue>({
    columns,
    data,
    onViewRequest,
    getItemId = (item: TData) => item.id,
    filterColumn,
    filterPlaceholder = "Filter...",
    emptyMessage = "No items found.",
    enableRowSelection = false
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    // Add select column if row selection is enabled
    const tableColumns = React.useMemo(() => {
        if (!enableRowSelection) return columns;

        const selectColumn: ColumnDef<TData, TValue> = {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        };

        return [selectColumn, ...columns];
    }, [columns, enableRowSelection]);

    const table = useReactTable({
        data,
        columns: tableColumns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                {filterColumn && (
                    <Input
                        placeholder={filterPlaceholder}
                        value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn(filterColumn)?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                )}
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                                {onViewRequest && <TableHead>Actions</TableHead>}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                    {onViewRequest && (
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem
                                                        onClick={() => onViewRequest(getItemId(row.original))}
                                                    >
                                                        View
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={tableColumns.length + (onViewRequest ? 1 : 0)}
                                    className="h-24 text-center"
                                >
                                    <Empty>
                                        <EmptyTitle>No items found</EmptyTitle>
                                        <EmptyDescription>
                                            {emptyMessage}
                                        </EmptyDescription>
                                    </Empty>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between px-2 py-4">
                <div className="text-muted-foreground text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="ml-auto">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => table.previousPage()}
                                    className={cn(
                                        !table.getCanPreviousPage() && "pointer-events-none opacity-50"
                                    )}
                                />
                            </PaginationItem>

                            {/* Page numbers */}
                            {Array.from({ length: table.getPageCount() }, (_, i) => i + 1)
                                .filter(page => {
                                    const currentPage = table.getState().pagination.pageIndex + 1;
                                    return (
                                        page === 1 ||
                                        page === table.getPageCount() ||
                                        (page >= currentPage - 1 && page <= currentPage + 1)
                                    );
                                })
                                .reduce((acc: number[], page, index, array) => {
                                    if (index > 0 && page - array[index - 1] > 1) {
                                        acc.push(-1);
                                    }
                                    acc.push(page);
                                    return acc;
                                }, [])
                                .map((page, index) => (
                                    page === -1 ? (
                                        <PaginationItem key={`ellipsis-${index}`}>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    ) : (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                onClick={() => table.setPageIndex(page - 1)}
                                                isActive={table.getState().pagination.pageIndex + 1 === page}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )
                                ))}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => table.nextPage()}
                                    className={cn(
                                        !table.getCanNextPage() && "pointer-events-none opacity-50"
                                    )}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    )
}