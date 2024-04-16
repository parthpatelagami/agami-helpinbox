'use client'

// REACT IMPORTS
import React, { useState } from 'react'

// MUI IMPORTS
import { CardContent, useTheme } from '@mui/material'

// THIRD PARTY IMPORTS
import type { ReactDatePickerProps } from 'react-datepicker'
import Select from 'react-select'

// CUSTOM IMPORTS
import { FILTERS } from './ViewAllTicketData'
import PickersRange from './PickersRange'

type ViewAllTicketProps = {
  table: any
}

export default function ViewAllTicketFilters(props: ViewAllTicketProps) {
  const { table } = props

  const [selectedFilters, setSelectedFilters] = useState<any[]>([])

  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  const agentsOptions = FILTERS.map(filter => ({
    value: filter.id,
    label: filter.label,
    type: filter.type
  }))

  const handleSelectCategory = (selectedOption: any) => {
    setSelectedFilters(selectedOption || [])
  }

  const getOptionsForFilter = (filterLabel: string) => {
    const filter = FILTERS.find(filter => filter.label === filterLabel)

    return filter ? filter.options.map(option => ({ value: option, label: option })) : []
  }

  const renderFieldByType = (filter: any) => {
    if (filter.type === 'select') {
      return (
        <Select
          key={filter.label}
          isMulti
          name={filter.label.toLowerCase()}
          placeholder={`Select ${filter.label}`}
          className='basic-multi-select mx-2 my-2'
          options={getOptionsForFilter(filter.label)}
        />
      )
    } else {
      return <PickersRange popperPlacement={popperPlacement} />
    }
  }

  return (
    <CardContent className='flex justify-between flex-col gap-4 items-start sm:flex-row sm:items-center ml-3 mr-3'>
      <div className='flex flex-wrap items-center'>
        <Select
          isMulti
          name='category'
          placeholder='Select Category'
          className='basic-multi-select mx-2'
          classNamePrefix='select'
          options={agentsOptions}
          onChange={handleSelectCategory}
        />

        {selectedFilters.map(filter => renderFieldByType(filter))}
      </div>
    </CardContent>
  )
}
