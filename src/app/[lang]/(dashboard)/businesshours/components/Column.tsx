import type React from 'react'

interface Column {
  accessorKey: string
  header: () => React.ReactNode
  cell: (info: { getValue: () => any }) => React.ReactNode
  filterType?: 'text' | 'date' | 'month' | 'dropdown'
  size?: number
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
  }
]
