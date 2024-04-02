import React, { useMemo } from 'react'

import Select from 'react-select'
import { Box, Pagination } from '@mui/material'

const Footer = ({ table }) => {
  const pageSize = table.getState().pagination.pageSize

  const options = useMemo(() => {
    return [5, 10, 20, 30].map(pageSize => ({ value: pageSize, label: pageSize }))
  }, [])

  const handlePageSizeChange = (event: any) => {
    table.setPageSize(Number(event.target.value))
  }

  const handlePageChange = (event, page) => {
    table.setPageIndex(page - 1)
  }

  return (
    <Box className='justify-end p-3' display='flex' flexDirection='row'>
      <Box className='flex items-center justify-between mx-5'>
        <span className='mr-2'>Show</span>
        <Select
          value={{ value: pageSize, label: pageSize }}
          onChange={event => handlePageSizeChange(event)}
          className='w-15'
          classNamePrefix='select'
          options={options}
        />
      </Box>
      <Box className='mt-1'>
        <Pagination
          variant='outlined'
          count={table.getPageCount()}
          page={table.getState().pagination.pageIndex + 1}
          onChange={handlePageChange}
          color='primary'
          shape='rounded'
          size='small'
        />
      </Box>
    </Box>
  )
}

export default Footer
