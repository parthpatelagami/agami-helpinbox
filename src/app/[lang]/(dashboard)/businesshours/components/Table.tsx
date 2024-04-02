import { useEffect, useState } from 'react'

import { Box, TextField } from '@mui/material'

import TanstackReactTable from '@/@core/components/tanstack-react-table'
import { columns } from './Column'

export type DataGridRowType = {
  id: string
  title: string
}

const dummyData: DataGridRowType[] = [
  { id: '1', title: 'TESTING 1' },
  { id: '2', title: 'TESTING 2' },
  { id: '3', title: 'TESTING 3' },
  { id: '4', title: 'TESTING 4' },
  { id: '5', title: 'TESTING 5' },
  { id: '6', title: 'TESTING 6' },
  { id: '7', title: 'TESTING 7' }
]

const Table = () => {
  const isFormsLoading: boolean = false
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })
  const [total, setTotal] = useState<number>(0)
  const [rows, setRows] = useState<DataGridRowType[]>([])
  const [searchValue, setSearchValue] = useState<string>('')

  useEffect(() => {
    const filteredData = dummyData.filter(row => row.title.toLowerCase().includes(searchValue.toLowerCase()))
    const startIndex = pagination.pageIndex * pagination.pageSize
    const slicedData = filteredData.slice(startIndex, startIndex + pagination.pageSize)

    setRows(slicedData)
    setTotal(filteredData.length)
  }, [searchValue, pagination])

  const handleSearch = (value: string) => {
    setSearchValue(value)
  }

  return (
    <>
      <Box className='flex justify-end pr-4'>
        <TextField
          className='mb-2'
          id='outlined-basic'
          label='Search...'
          variant='outlined'
          value={searchValue}
          onChange={e => {
            handleSearch(e.target.value)
          }}
        />
      </Box>
      <Box className='flex-grow'>
        <TanstackReactTable
          loading={isFormsLoading}
          columns={columns}
          data={rows}
          dataCount={total}
          responsiveTable={true}
          enablePagination={true}
          manualPagination={true}
          pagination={pagination}
          setPagination={setPagination}
          enableColumnsVisiblity={true}
        />
      </Box>
    </>
  )
}

export default Table
