import React, { useState } from 'react'

import { useParams } from 'next/navigation'

import {
  CardContent,
  Typography,
  MenuItem,
  IconButton,
  Button,
  Menu,
  Checkbox,
  ListItemText,
  useTheme,
  Box
} from '@mui/material'

import { locale } from 'dayjs'

import { Link } from 'react-feather'

import type { ReactDatePickerProps } from 'react-datepicker'

import CustomTextField from '@/@core/components/mui/TextField'
import { Locale } from '@/configs/i18n'
import { getLocalizedUrl } from '@/utils/i18n'

import { FILTERS } from './ViewAllTicketData'
import CustomAutocompleteDatatable from './CustomAutocompleteInput'
import PickersRange from './PickersRange'

type ViewAllTicketProps = {
  table: any
}

export default function ViewAllTicketFilters(props: ViewAllTicketProps) {
  const { table } = props
  const { lang: locale } = useParams()
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const [selectedFilters, setSelectedFilters] = useState<any[]>([])

  const handleFilterChange = (event: any, filter: any) => {
    const updatedFilters: any[] = [...selectedFilters]

    if (event.target.checked) {
      updatedFilters.push(filter)
    } else {
      updatedFilters.splice(updatedFilters.indexOf(filter), 1)
    }

    setSelectedFilters(updatedFilters)
  }

  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  return (
    <CardContent className='flex justify-between flex-col gap-4 items-start sm:flex-row sm:items-center ml-3 mr-3'>
      <div className='flex flex-wrap items-center'>
        {FILTERS.map(filter => {
          const isSelected = selectedFilters.some(selectedFilter => selectedFilter.id === filter.id)

          if (!isSelected) {
            return null
          }

          if (filter.type == 'select') {
            return <CustomAutocompleteDatatable filter={filter} filteroption={filter.options} />
          } else {
            return <PickersRange popperPlacement={popperPlacement} label='Select Month' />
          }
        })}
        <div className='mt-4'>
          <Button
            size='small'
            onClick={e => setAnchorEl(e.currentTarget)}
            startIcon={
              <IconButton size='small' title='Clear' aria-label='Clear' sx={{ padding: '0px' }}>
                <i className='ticket-plus' />
              </IconButton>
            }
          >
            More
          </Button>
        </div>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            style: {
              maxHeight: 100 * 4.5,
              width: '25ch'
            }
          }}
        >
          {FILTERS.map(filters => (
            <MenuItem key={filters.id} value={filters.label} onChange={e => handleFilterChange(e, filters)}>
              <Checkbox checked={selectedFilters.some(selectedFilter => selectedFilter.id === filters.id)} />
              <ListItemText primary={filters.label} />
            </MenuItem>
          ))}
        </Menu>
      </div>
    </CardContent>
  )
}
