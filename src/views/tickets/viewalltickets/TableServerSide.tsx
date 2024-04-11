// ** React Imports
import { useEffect, useState, useCallback, ChangeEvent, SyntheticEvent, useMemo } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'

// ** ThirdParty Components
import axios from 'axios'
import { AppBar, Chip, TablePagination, Typography } from '@mui/material'
import tableStyles from '@core/styles/table.module.css'
import {
  ColumnDef,
  FilterFn,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useParams } from 'next/navigation'
import { rankItem } from '@tanstack/match-sorter-utils'
import classnames from 'classnames'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import ViewAllTicketFilters from './ViewAllTicketFilters'

type SortType = 'asc' | 'desc' | undefined | null
type ViewAllTicketType = {
  id: Number
  Channel: string
  Subject: string
  RequestType: string
  IssueType: string
  Priority: string
  Status: string
  Department: string
  Customer: string
  CreatedDate: string
  DueDate: string
}
type PropsType = {
  tableData: ViewAllTicketType[]
}
const columnHelper = createColumnHelper<ViewAllTicketType>()

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)
  console.log('Fuzzy Filter is called and rank item is', itemRank)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}
const TableServerSide = ({ tableData }: PropsType) => {
  const [data, setData] = useState(...[tableData])
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState({})
  const { lang: locale } = useParams()

  const columns = useMemo<ColumnDef<ViewAllTicketType, any>[]>(
    () => [
      columnHelper.accessor('id', {
        header: 'Ticket_ID',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <div className='flex flex-col'>
              <Typography className='font-medium' color='text.primary'>
                {row.original.id + ''}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('Channel', {
        header: 'Channel',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography className='capitalize' color='text.primary'>
              {row.original.Channel}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('Subject', {
        header: 'Subject',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.Subject}
          </Typography>
        )
      }),
      columnHelper.accessor('RequestType', {
        header: 'RequestType',
        cell: ({ row }) => <Typography className='capitalize'>{row.original.RequestType}</Typography>
      }),
      columnHelper.accessor('IssueType', {
        header: 'IssueType',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Chip variant='tonal' className='capitalize' label={row.original.IssueType} size='small' />
          </div>
        )
      }),
      columnHelper.accessor('Priority', {
        header: 'Priority',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Chip variant='tonal' className='capitalize' label={row.original.Priority} size='small' />
          </div>
        )
      }),
      columnHelper.accessor('Status', {
        header: 'Status',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Chip variant='tonal' className='capitalize' label={row.original.Status} size='small' />
          </div>
        )
      }),
      columnHelper.accessor('Department', {
        header: 'Department',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Chip variant='tonal' className='capitalize' label={row.original.Department} size='small' />
          </div>
        )
      }),
      columnHelper.accessor('Customer', {
        header: 'Customer',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Typography className='capitalize' color='text.primary'>
              {row.original.Customer}
            </Typography>
          </div>
        )
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const table = useReactTable({
    data: data as ViewAllTicketType[],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <>
      <ViewAllTicketFilters table={table} />
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          className={classnames({
                            'flex items-center': header.column.getIsSorted(),
                            'cursor-pointer select-none': header.column.getCanSort()
                          })}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <i className='tabler-chevron-up text-xl' />,
                            desc: <i className='tabler-chevron-down text-xl' />
                          }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                        </div>
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {table.getFilteredRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  No data available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table
                .getRowModel()
                .rows.slice(0, table.getState().pagination.pageSize)
                .map(row => {
                  return (
                    <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                      ))}
                    </tr>
                  )
                })}
            </tbody>
          )}
        </table>
      </div>
      <TablePagination
        component={() => <TablePaginationComponent table={table} />}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
      />
    </>
  )
}

export default TableServerSide
