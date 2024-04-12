// REACT IMPORTS
'use client'

import React from 'react'

// MUI IMPORTS
import { IconButton, Stack, Tooltip, Typography } from '@mui/material'

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
    cell: info => <Typography className='text-sm font-normal text-center'>{info.getValue()}</Typography>,
    size: 100
  },
  {
    accessorKey: 'title',
    header: () => 'Title',
    cell: info => <Typography className='text-sm font-normal'>{info.getValue()}</Typography>,
    filterType: 'text',
    size: 250
  },
  {
    accessorKey: 'description',
    header: () => 'Description',
    cell: info => <Typography className='text-sm font-normal'>{info.getValue()}</Typography>,
    filterType: 'text',
    size: 400
  },
  {
    accessorKey: 'action',
    header: () => 'Action',
    cell: info => (
      <div>
        <Stack display='flex' flexDirection='row' justifyContent='center'>
          <Tooltip placement='top' title='Edit'>
            <IconButton
              className='hover:border-1 hover:border-inherit hover:border-solid'
              onClick={e => handleEdit(info.getValue(), e)}
            >
              <i className='tabler-edit text-[20px] text-textSecondary' />
            </IconButton>
          </Tooltip>

          <Tooltip placement='top' title='Disabled SLAs'>
            <IconButton className='hover:border-1 hover:border-inherit hover:border-solid'>
              <i className='tabler-circle-off text-[20px] text-textSecondary' />
            </IconButton>
          </Tooltip>

          <Tooltip placement='top' title='Delete'>
            <IconButton
              className='hover:border-1 hover:border-inherit hover:border-solid'
              onClick={() => handleDelete(info.getValue())}
            >
              <i className='tabler-trash text-[20px] text-red-700' />
            </IconButton>
          </Tooltip>
        </Stack>
      </div>
    ),
    size: 150
  }
]
