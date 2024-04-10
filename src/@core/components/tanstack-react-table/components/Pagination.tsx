import React, { useMemo } from 'react'

import Select from 'react-select'
import { Box, Pagination, Typography } from '@mui/material'

const Paginate = ({ table, dataCount }) => {
  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const startRow = pageIndex * pageSize + 1
  const endRow = Math.min(startRow + pageSize - 1, dataCount)

  const options = useMemo(() => {
    return [5, 10, 20].map(pageSize => ({ value: pageSize, label: pageSize }))
  }, [])

  const handlePageChange = (event, page) => {
    event.preventDefault()
    const newPageIndex = page - 1

    table.setPagination({
      ...table.getState().pagination,
      pageIndex: newPageIndex
    })
  }

  return (
    <Box className='p-3' display='flex' flexDirection='row' justifyContent='space-between'>
      <div className='mt-2'>
        <Typography>
          Showing {startRow} - {endRow} of {dataCount} entries
        </Typography>
      </div>
      <div className='items-center'>
        <Select
          value={{ value: pageSize, label: pageSize }}
          onChange={event => table.setPageSize(Number(event.value))}
          className='w-17 absolute'
          classNamePrefix='select'
          options={options}
        />
      </div>
      <div>
        <Pagination
          count={table.getPageCount()}
          page={pageIndex + 1}
          onChange={(event, page) => handlePageChange(event, page)}
          shape='rounded'
          color='primary'
          variant='tonal'
          showFirstButton
          showLastButton
        />
      </div>
    </Box>
  )
}

export default Paginate
