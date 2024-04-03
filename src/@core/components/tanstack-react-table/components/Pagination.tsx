import React, { useMemo } from 'react'

import Select from 'react-select'
import { Box, Pagination } from '@mui/material'

const Paginate = ({ table }) => {
  const pageSize = table.getState().pagination.pageSize

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
    <Box className=' p-3' display='flex' flexDirection='row' justifyContent='flex-end'>
      <Box className='flex items-center justify-between mx-5'>
        <span className='mr-2'>Show</span>
        <Select
          value={{ value: pageSize, label: pageSize }}
          onChange={event => table.setPageSize(Number(event.value))}
          className='w-15'
          classNamePrefix='select'
          options={options}
        />
      </Box>
      <Box className='mt-1'>
        <Pagination
          count={table.getPageCount()}
          page={table.getState().pagination.pageIndex + 1}
          onChange={(event, page) => handlePageChange(event, page)}
          color='primary'
          shape='rounded'
          size='small'
        />
      </Box>
    </Box>
  )
}

export default Paginate
