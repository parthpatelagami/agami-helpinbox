import { Box } from '@mui/material'

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

  return (
    <>
      <Box className='flex-grow'>
        <TanstackReactTable
          loading={isFormsLoading}
          columns={columns}
          data={dummyData}
          dataCount={dummyData.length}
          responsiveTable={true}
          enablePagination={true}
          manualPagination={true}
          enableColumnsVisiblity={true}
        />
      </Box>
    </>
  )
}

export default Table
