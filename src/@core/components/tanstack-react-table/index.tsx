import React, { useMemo, Fragment } from 'react'

import PropTypes from 'prop-types'
import {
  Card,
  Table,
  CardHeader,
  CircularProgress as Spinner,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@mui/material'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import Pagination from './components/Pagination'
import HideShowColumns from './components/HideShowColumns'

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
  headerComponent,
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
    <Card>
      <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
        <div className='d-flex mt-md-0 mt-1'>
          {headerComponent && headerComponent()}
          {enableColumnsVisiblity && <HideShowColumns table={table} />}
        </div>
      </CardHeader>
      <>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => (
                  <TableCell key={header.id}>
                    <span style={{ display: 'block', width: header.column.getSize(), textTransform: 'capitalize' }}>
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
                <TableCell className='fallback-spinner data-loader'>No Data Available</TableCell>
              </TableRow>
            )}
            {table.getRowModel().rows.map(row => (
              <Fragment key={row.id}>
                <TableRow sx={loading ? { backgroundColor: '#dedede' } : {}}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
        {enablePagination && <Pagination table={table} />}
      </>
    </Card>
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
