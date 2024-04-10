// React Import
import React, { Fragment, useMemo, useState } from 'react'

// MUI Imports
import {
  CardContent,
  IconButton,
  CircularProgress as Spinner,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

// Third party Components
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Card, CardHeader, Table } from 'reactstrap'

// Custom Components
import Pagination from './components/Pagination'
import ColumnFilter from './components/ColumnFilter'

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
  responsiveTable: boolean
  headerComponent?: () => React.ReactNode

  // Pagination props
  enablePagination: boolean
  manualPagination: boolean
  pagination: Pagination
  setPagination: (pagination: Pagination) => void

  // Filters
  enableColumnFilters: boolean

  // Columns visiblity props
  enableColumnsVisiblity?: boolean
  columnVisibility?: any
  setColumnVisibility?: (visibility: any) => void

  // Row selection props
  enableRowSelection?: boolean
  enableMultiRowSelection?: boolean
  getRowId?: (row: any) => string
  rowSelectionType?: string
  rowSelection?: any
  setRowSelection?: (selection: any) => void
}

const TanstackReactTable: React.FC<TanstackReactTableProps> = ({
  columns: cols,
  data,
  loading,
  dataCount,
  responsiveTable,
  enablePagination,
  manualPagination,
  pagination: { pageIndex, pageSize },
  setPagination,
  enableColumnFilters,
  enableColumnsVisiblity = false,
  columnVisibility = {},
  setColumnVisibility,
  enableRowSelection,
  enableMultiRowSelection,
  getRowId,
  rowSelectionType,
  rowSelection,
  setRowSelection
}) => {
  const columns = useMemo(() => [...cols], [])
  const theme = useTheme()

  const memoPagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])

  const pageCount = useMemo(() => Math.ceil(dataCount / pageSize) || 1, [dataCount, pageSize])

  const [showFilters, setShowFilters] = useState(false)

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

  if (enableRowSelection) {
    tableConfig.enableRowSelection = true
    tableConfig.enableMultiRowSelection = enableMultiRowSelection
    tableConfig.state = { ...tableConfig.state, rowSelection }
    tableConfig.onRowSelectionChange = updater => setRowSelection(updater(rowSelection))
  }

  if (getRowId) {
    tableConfig.getRowId = getRowId
  }

  const table = useReactTable(tableConfig)
  const tableRowCount = table.getRowModel().rows.length

  const primaryBg = theme.palette.primary.lightOpacity
  const headerBgColor = theme.palette.mode === 'light' ? primaryBg : primaryBg

  return (
    <Card>
      <CardHeader className='mx-2'>
        {enableColumnFilters && (
          <>
            <Tooltip placement='top' title='Check'>
              <IconButton
                className='hover:border-1 hover:border-inherit hover:border-solid'
                onClick={() => setShowFilters(!showFilters)}
              >
                <i className='tabler-filter text-[27px] text-textSecondary' />
              </IconButton>
            </Tooltip>
          </>
        )}
      </CardHeader>
      <CardContent>
        <Table className='w-full' hover={tableRowCount !== 0 && !loading} responsive={responsiveTable}>
          <TableHead style={{ backgroundColor: `${headerBgColor}` }}>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => (
                  <th key={header.id} className='p-2'>
                    <span style={{ display: 'block', width: header.column.getSize() }}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      {showFilters ? <ColumnFilter column={header.column} table={table} /> : null}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={table.getVisibleFlatColumns().length} className='text-center mt-10'>
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

            {table.getRowModel().rows.map(row => (
              <Fragment key={row.id}>
                <TableRow
                  className={classnames({ selected: row.getIsSelected() })}
                  style={loading ? { backgroundColor: '#e7e7e7' } : {}}
                  onClick={rowSelectionType === 'single-click' ? row.getToggleSelectedHandler() : null}
                  onDoubleClick={rowSelectionType === 'double-click' ? row.getToggleSelectedHandler() : null}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className='p-1'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {enablePagination && <Pagination table={table} dataCount={dataCount} />}
    </Card>
  )
}

TanstackReactTable.defaultProps = {
  enablePagination: false,
  manualPagination: false,
  pagination: { pageIndex: 0, pageSize: 5 },
  enableColumnsVisiblity: false,
  enableColumnFilters: false,
  columnVisibility: {},
  enableRowSelection: false,
  enableMultiRowSelection: false,
  rowSelectionType: 'single-click',
  rowSelection: {}
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
  enableColumnFilters: PropTypes.bool,
  enableColumnsVisiblity: PropTypes.bool,
  columnVisibility: PropTypes.object,
  setColumnVisibility: PropTypes.func,
  enableRowSelection: PropTypes.bool,
  enableMultiRowSelection: PropTypes.bool,
  rowSelectionType: PropTypes.string,
  rowSelection: PropTypes.object,
  setRowSelection: PropTypes.func,
  getRowId: PropTypes.func
}

export default TanstackReactTable
