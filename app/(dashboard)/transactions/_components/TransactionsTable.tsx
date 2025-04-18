"use client";
import DateToUTCDate from '@/lib/helpers';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { GetTransactionsHistoryType } from '@/app/api/transactions-history/route';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import SkeletonWrapper from '@/components/custom/SkeletonWrapper';
import { DataTableColumnHeader } from '@/components/datatable/ColumnHeader';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

interface Props {
    from: Date;
    to: Date;
}

type TransactionHistoryRow = GetTransactionsHistoryType[0]
export const columns: ColumnDef<TransactionHistoryRow>[] = [
    {
        accessorKey: "category",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Category'/>
            // <div className="flex items-center space-x-2">
            //     <Button
            //         variant="ghost"
            //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            //         className="h-8 px-2 py-1"
            //     >
            //         Category
            //         <ArrowUpDown className="ml-2 h-4 w-4" />
            //     </Button>
            // </div>
        ),
        cell: ({ row }) => <div className='flex gap-2 capitalize'>
            {row.original.categoryIcon}
            <div className="capitalize">{row.original.category}</div>
        </div>
    }
]
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const emptyData: any[] = []

function TransactionsTable({ from, to }: Props) {
    const historyQuery = useQuery({
        queryKey: ['transactions', from, to],
        queryFn: () => fetch(`/api/transactions-history?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`).then((res) => res.json()),
    })

    const table = useReactTable({
        data: historyQuery.data || emptyData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="w-full">
            <div className='flex flex-wrap items-end justify-between gap-2 py-4 flex-1'>
                TODO: Filters
            </div>
            <SkeletonWrapper isLoading={historyQuery.isFetching}>
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
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </SkeletonWrapper>
        </div>
    )
}

export default TransactionsTable