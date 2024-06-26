'use client'

// React Imports
import { useState, useMemo, useEffect } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import TablePagination from '@mui/material/TablePagination'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  Column,
  ColumnDef,
  FilterFn,
  Table,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getPaginationRowModel,
  getSortedRowModel,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel
} from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Type Imports
import type { Locale } from '@configs/i18n'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import TablePaginationComponent from '@components/TablePaginationComponent'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import React from 'react'
import { useTheme } from '@mui/material'
declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type columnType = {
  accessor: string
  header: string
}

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

// Column Definitions
const columnHelper = createColumnHelper<any>()
const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <input {...props} value={value} onChange={e => setValue(e.target.value)} />
}

function Filter({ column, table }: { column: Column<any, unknown>; table: Table<any> }) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()
  const sortedUniqueValues = React.useMemo(
    () => (typeof firstValue === 'number' ? [] : Array.from(column.getFacetedUniqueValues().keys()).sort()),
    [column.getFacetedUniqueValues()]
  )

  return typeof firstValue === 'number' ? (
    <div>
      <div className='flex space-x-2'>
        <DebouncedInput
          type='number'
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={value => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
          placeholder={`Min ${column.getFacetedMinMaxValues()?.[0] ? `(${column.getFacetedMinMaxValues()?.[0]})` : ''}`}
          className='w-24 border shadow rounded h-[30px] p-1'
        />
        <DebouncedInput
          type='number'
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={value => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
          placeholder={`Max ${column.getFacetedMinMaxValues()?.[1] ? `(${column.getFacetedMinMaxValues()?.[1]})` : ''}`}
          className='w-24 border shadow rounded h-[30px] p-1'
        />
      </div>
    </div>
  ) : (
    <>
      <DebouncedInput
        type='text'
        value={(columnFilterValue ?? '') as string}
        onChange={value => column.setFilterValue(value)}
        placeholder='Search...'
        className='w-36 border rounded h-[30px] p-1'
        list={column.id + 'list'}
      />
    </>
  )
}

const ClientSideTable = (props: any) => {
  const { tableData, columnNames, redirectUrl } = props
  // States
  const [rowSelection, setRowSelection] = useState({})
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(...[tableData])
  const [globalFilter, setGlobalFilter] = useState('')

  // Hooks
  const { lang: locale } = useParams()
  const theme = useTheme()

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }: any) => (
          <Checkbox
            size='small'
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }: any) => (
          <Checkbox
            size='small'
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      ...columnNames.map((column: columnType) =>
        columnHelper.accessor(column.accessor, {
          header: column.header,
          cell: ({ row }) => (
            <div className='flex items-center gap-4'>
              <div className='flex flex-col'>
                <Typography className='text-sm' color='text.primary'>
                  {row.original[column.accessor]}
                </Typography>
              </div>
            </div>
          )
        })
      ),
      columnHelper.accessor('action', {
        header: 'Actions',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton>
              <i className='tabler-trash text-[18px] text-error' />
            </IconButton>
            <IconButton>
              <Link href={getLocalizedUrl(`${redirectUrl}/${row.original.id}`, locale as Locale)} className='flex'>
                <i className='tabler-eye text-[18px] text-textSecondary' />
              </Link>
            </IconButton>
            <IconButton>
              <Link href={getLocalizedUrl(`${redirectUrl}/${row.original.id}`, locale as Locale)} className='flex'>
                <i className='tabler-edit text-[18px] text-textSecondary' />
              </Link>
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    [columnNames]
  )

  const table = useReactTable({
    data: data as any,
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
    <Card className='h-full'>
      <CardContent className='flex justify-between flex-col gap-2 items-start sm:flex-row sm:items-center pt-3 pb-0'>
        <div className='flex gap-2'>
          <CustomTextField
            size='small'
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='is-[70px]'
          >
            <MenuItem value='5'>5</MenuItem>
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
        </div>
        <div className='flex gap-2 !items-start is-full sm:flex-row sm:is-auto sm:items-center'>
          <Link href={getLocalizedUrl(redirectUrl, locale as Locale)}>
            <IconButton className=''>
              <i className='tabler-plus border-solid text-[18px] text-textSecondary' />
            </IconButton>
          </Link>
          <IconButton className=''>
            <i className='tabler-trash text-[18px] text-error' />
          </IconButton>
        </div>
      </CardContent>
      <div className='overflow-x-auto px-5 py-3'>
        <table className={`${tableStyles.table} border`}>
          {table.getHeaderGroups().map(headerGroup => (
            <thead
              style={{ backgroundColor: theme.palette.mode === 'dark' ? '#25293C' : '#F3F2F5' }}
              key={`${headerGroup.id}-headers`}
            >
              <tr>
                {headerGroup.headers.map(header => (
                  <th className='h-[45px]' key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={classnames({
                          'flex items-center': header.column.getIsSorted(),
                          'cursor-pointer select-none': header.column.getCanSort(),
                          'text-base': true,
                          'normal-case': true
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <>
                            {header.column.getIsSorted() ? (
                              header.column.getAutoSortDir() ? (
                                <i className='tabler-chevron-down text-xl' />
                              ) : (
                                <i className='tabler-chevron-up text-xl' />
                              )
                            ) : (
                              <i className='tabler-chevron-up text-xl opacity-0' />
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
          ))}
          {table.getHeaderGroups().map(headerGroup => (
            <thead key={`${headerGroup.id}-search`}>
              <tr>
                {headerGroup.headers.map(header => (
                  <th className='py-0 h-[41px]' key={header.id}>
                    {header.column.getCanFilter() && header.column.columnDef.header != 'Actions' ? (
                      <Filter column={header.column} table={table} />
                    ) : null}
                  </th>
                ))}
              </tr>
            </thead>
          ))}
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
                    <tr key={row.id} className={`${classnames({ selected: row.getIsSelected() })}`}>
                      {row.getVisibleCells().map(cell => (
                        <td className='py-0 h-[39px]' key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  )
                })}
            </tbody>
          )}
        </table>
        <TablePagination
          size='small'
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
      </div>
    </Card>
  )
}

export default ClientSideTable
