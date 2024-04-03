// React Impports
import React from 'react'

// MUI Imports
import { IconButton, Stack, Tooltip } from '@mui/material'

interface Column {
  accessorKey: string
  header: () => React.ReactNode
  cell: (info: { getValue: () => any }) => React.ReactNode
  filterType?: 'text' | 'date' | 'month' | 'dropdown'
  size?: number
}

const handleEdit = (id: any, event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault()
  console.log('EDIT PARAM ::: ', id)
}

const handleDelete = (id: any) => {
  console.log('DELETE PARAM ::: ', id)
}

export const columns: Column[] = [
  {
    accessorKey: 'id',
    header: () => 'Sr.No',
    cell: info => info.getValue(),
    size: 50
  },
  {
    accessorKey: 'title',
    header: () => 'Title',
    cell: info => info.getValue(),
    filterType: 'text',
    size: 500
  },
  {
    accessorKey: 'action',
    header: () => 'Action',
    cell: info => (
      <div>
        <Stack display='flex' flexDirection='row' className='mt-1'>
          <Tooltip placement='top' title='Check'>
            <IconButton className='hover:border-2 hover:border-inherit hover:border-solid'>
              <i className='tabler-circle-check text-[22px] text-textSecondary' />
            </IconButton>
          </Tooltip>

          <Tooltip placement='top' title='Edit'>
            <IconButton
              className='hover:border-2 hover:border-inherit hover:border-solid'
              onClick={e => handleEdit(info.getValue(), e)}
            >
              <i className='tabler-edit text-[22px] text-textSecondary' />
            </IconButton>
          </Tooltip>

          <Tooltip placement='top' title='Delete'>
            <IconButton
              className='hover:border-2 hover:border-inherit hover:border-solid'
              onClick={() => handleDelete(info.getValue())}
            >
              <i className='tabler-trash text-[22px] text-textDanger' />
            </IconButton>
          </Tooltip>
        </Stack>
      </div>
    ),
    size: 200
  }
]
