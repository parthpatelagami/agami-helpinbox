import React from 'react'

import { IconButton, Stack } from '@mui/material'
import { Check, Edit, Trash } from 'react-feather'

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
          <IconButton aria-label='check' title='Check'>
            <Check size={17} />
          </IconButton>

          <IconButton aria-label='edit' title='Edit' onClick={e => handleEdit(info.getValue(), e)}>
            <Edit size={17} />
          </IconButton>

          <IconButton aria-label='delete' title='Delete' onClick={() => handleDelete(info.getValue())}>
            <Trash size={17} />
          </IconButton>
        </Stack>
      </div>
    ),
    size: 200
  }
]
