// React Import
import React, { useMemo } from 'react'

// MUI Imports
import { Table, CircularProgress as Spinner, TableBody, TableHead, TableRow, TableCell, Box } from '@mui/material'

// Third party Components
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

// Custom Components
import Pagination from './components/Pagination'

interface ColumnDefinition {
  header: string | (() => React.ReactNode)
  cell: string | (() => React.ReactNode)
}

interface Pagination {
  pageIndex: number
  pageSize: number
}

interface TanstackReactTableProps {
  columns: ColumnDefinition[]
  data: any[]
  loading: boolean
  dataCount: number
  headerComponent?: () => React.ReactNode

  // Pagination props
  enablePagination: boolean
  manualPagination: boolean
  pagination: Pagination
  setPagination: (pagination: Pagination) => void

  // Columns visiblity props
  enableColumnsVisiblity?: boolean
  columnVisibility?: any
  setColumnVisibility?: (visibility: any) => void
}

const TanstackReactTable: React.FC<TanstackReactTableProps> = ({
  columns: cols,
  data,
  loading,
  dataCount,
  enablePagination,
  manualPagination,
  pagination: { pageIndex, pageSize },
  setPagination,
  enableColumnsVisiblity = false,
  columnVisibility = {},
  setColumnVisibility
}) => {
  const columns = useMemo(() => [...cols], [])

  const memoPagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])

  const pageCount = useMemo(() => Math.ceil(dataCount / pageSize) || 1, [dataCount, pageSize])

  const tableConfig = {
    columns,
    data,
    pageCount,
    state: {},
    getCoreRowModel: getCoreRowModel()
  }

  if (enablePagination) {
    if (manualPagination) {
      tableConfig.manualPagination = true
      tableConfig.state = { ...tableConfig.state, pagination: memoPagination }
      tableConfig.onPaginationChange = (updater: any) => setPagination(updater(memoPagination))
    } else {
      tableConfig.initialState = { ...tableConfig.initialState, pagination: memoPagination }
      tableConfig.getPaginationRowModel = getPaginationRowModel()
    }
  }

  if (enableColumnsVisiblity) {
    tableConfig.enableHiding = true
    tableConfig.state = { ...tableConfig.state, columnVisibility }

    tableConfig.onColumnVisibilityChange = (updater: any) => {
      typeof updater === 'function' ? setColumnVisibility(updater(columnVisibility)) : setColumnVisibility({})
    }
  }

  const table = useReactTable(tableConfig)
  const tableRowCount = table.getRowModel().rows.length

  return (
    <Box>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <TableCell key={header.id}>
                  <span
                    style={{
                      fontWeight: '600',
                      fontSize: '1rem',
                      display: 'block',
                      width: header.column.getSize(),
                      textTransform: 'capitalize'
                    }}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </span>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell className='p-0'>
                <Spinner />
              </TableCell>
            </TableRow>
          )}
          {!loading && tableRowCount === 0 && (
            <TableRow>
              <TableCell colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                No data available
              </TableCell>
            </TableRow>
          )}

          {table
            .getRowModel()
            .rows.slice(0, table.getState().pagination.pageSize)
            .map(row => {
              return (
                <TableRow key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
      {enablePagination && <Pagination table={table} />}
    </Box>
  )
}

TanstackReactTable.defaultProps = {
  enablePagination: false,
  manualPagination: false,
  pagination: { pageIndex: 0, pageSize: 5 },
  enableColumnsVisiblity: false,
  columnVisibility: {}
}

TanstackReactTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  dataCount: PropTypes.number.isRequired,
  headerComponent: PropTypes.func,
  enablePagination: PropTypes.bool,
  manualPagination: PropTypes.bool,
  pagination: PropTypes.object,
  setPagination: PropTypes.func,
  enableColumnsVisiblity: PropTypes.bool,
  columnVisibility: PropTypes.object,
  setColumnVisibility: PropTypes.func
}

export default TanstackReactTable
