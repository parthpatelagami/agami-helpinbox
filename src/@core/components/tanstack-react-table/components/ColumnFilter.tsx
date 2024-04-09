// REACT IMPORTS
import React, { useState, useEffect } from 'react'

// MUI COMPONENTS
import { TextField as Input } from '@mui/material'

// CUSTOM HOOKS
import { useIsMount } from '../../../hooks/useIsMount'
import { useDebounce } from '../../../hooks/useDebounce'

interface ColumnDefinition {
  header: () => string
  filterType?: 'text' | 'number'
  filterDropdownValues?: string[]
}

interface Column {
  columnDef: ColumnDefinition
  getFilterValue: () => any
  setFilterValue: (value: any) => void
}

interface FilterProps {
  column: Column
}

const ColumnFilter: React.FC<FilterProps> = ({ column }) => {
  const { columnDef, getFilterValue, setFilterValue } = column
  const filterType = columnDef.filterType || null
  let returnElement: JSX.Element | null = null
  const [searchTerm, setSearchTerm] = useState<string | number>(getFilterValue() || '')
  const isMount = useIsMount()
  const debouncedSearchTerm = useDebounce(searchTerm, 1000)

  switch (filterType) {
    case 'text':
      useEffect(() => {
        if (!isMount) {
          if (debouncedSearchTerm) {
            setFilterValue(debouncedSearchTerm)
          } else {
            setFilterValue('')
          }
        }
      }, [debouncedSearchTerm, isMount])

      returnElement = (
        <div className='mt-1'>
          <Input
            type='text'
            size='small'
            placeholder={`Filter by ${columnDef.header()}`}
            value={searchTerm}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
          />
        </div>
      )
      break
    case 'number':
      useEffect(() => {
        if (!isMount) {
          if (debouncedSearchTerm || debouncedSearchTerm === 0) {
            setFilterValue(Number(debouncedSearchTerm))
          } else {
            setFilterValue('')
          }
        }
      }, [debouncedSearchTerm, isMount])

      returnElement = (
        <div className='mt-1'>
          <Input
            type='number'
            size='small'
            placeholder={`Filter by ${columnDef.header()}`}
            value={searchTerm}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
          />
        </div>
      )
      break
    default:
      returnElement = null
  }

  return returnElement
}

export default ColumnFilter
