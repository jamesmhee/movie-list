import { getCoreRowModel, useReactTable, flexRender, ColumnDef } from '@tanstack/react-table'
import Button from '../Atoms/Button'
import { SetStateAction } from 'react'

interface CustomTableProps<T> extends React.InputHTMLAttributes<HTMLTableElement> {
    headClassName?: string
    bodyClassName?: string
    rowClassName?: string
    data: T[]
    columns: ColumnDef<T, any>[]
    pagination: {
        pageIndex: number
        pageSize: number
    }
    setPagination: React.Dispatch<SetStateAction<CustomTableProps<T>['pagination']>>
    onRowClick?: (...args: any[]) => void
    rowCount: number
}

const CustomTable = <T,>({
    headClassName,
    bodyClassName,
    rowClassName,
    data,
    columns,
    pagination,
    setPagination,
    onRowClick,
    rowCount,
    ...props
}: CustomTableProps<T>) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: setPagination,
        rowCount: rowCount,
        manualPagination: true,
        initialState: {
            pagination: {
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize,
            },
        },
        state: {
            pagination,
        },
    })
    return (
        <>
            <table
                {...props}
                className="table table-auto align-baseline border-collapse border-gray-500"
            >
                <thead className={headClassName}>
                    {table?.getHeaderGroups()?.map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className={bodyClassName}>
                    {table?.getRowModel()?.rows?.map((row) => (
                        <tr
                            onClick={(e) => onRowClick?.(e, row?.original)}
                            className={rowClassName}
                            key={row.id}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex gap-1 justify-end my-2!">
                <Button
                    className="btn-neutral px-2!"
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </Button>
                <Button
                    className="btn-neutral px-2!"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </Button>
                <Button
                    className="btn-neutral px-2!"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </Button>
                <Button
                    className="btn-neutral px-2!"
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </Button>
            </div>
        </>
    )
}
export default CustomTable
