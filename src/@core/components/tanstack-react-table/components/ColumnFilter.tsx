// REACT IMPORTS
import React, { useMemo, useState, useEffect } from 'react'

// MUI COMPONENTS
import { TextField as Input, Select } from '@mui/material'

// CUSTOM HOOKS
import { useIsMount } from '../../../hooks/useIsMount'
import { useDebounce } from '../../../hooks/useDebounce'

interface ColumnDefinition {
  header: () => string
  filterType?: string
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
  const [searchTerm, setSearchTerm] = useState<string>(getFilterValue() || '')
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
            placeholder={`Filter by ${columnDef.header()}`}
            value={searchTerm}
            onChange={(event: any) => setSearchTerm(event.target.value)}
          />
        </div>
      )
      break
    case 'date':
    case 'month':
      returnElement = (
        <div className='mt-1' style={{ backgroundColor: 'white' }}>
          <Flatpickr
            className='form-control'
            value={getFilterValue()}
            placeholder='Filter by Date'
            onClose={event => {
              setFilterValue(event)
            }}
            options={{
              mode: 'range',
              enableTime: false,
              dateFormat: filterType === 'date' ? 'Y-m-d' : 'M-Y',
              maxDate: new Date()
            }}
          />
        </div>
      )
      break
    case 'dropdown':
      const options = useMemo(() => {
        let options: { value: string; label: string }[] = []

        if (columnDef.filterDropdownValues) {
          columnDef.filterDropdownValues.forEach(item => {
            options = [...options, { value: item, label: item }]
          })
        }

        return options
      }, [])

      const selectedValue = getFilterValue() || ''

      returnElement = (
        <div className='mt-1' style={{ backgroundColor: 'white' }}>
          <Select
            theme={selectThemeColors}
            className='react-select'
            classNamePrefix='select'
            options={options}
            placeholder='Select'
            isClearable={true}
            value={options.find(c => c.value === selectedValue)}
            onChange={val => {
              const value = val ? val.value : ''

              setFilterValue(value)
            }}
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
