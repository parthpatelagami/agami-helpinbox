'use client'

import { DragEvent, useMemo, useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  InputAdornment,
  Stack,
  Typography,
  useTheme
} from '@mui/material'
import CustomTextField from '@core/components/mui/TextField'
import { FieldType } from '@/types/formViewTypes'

interface PropsType {
  unusedFields: FieldType[]
  setUnusedFields: (val: any) => void
}

const SidebarLeft = (props: PropsType) => {
  const { unusedFields, setUnusedFields } = props
  const theme = useTheme()
  const [searchValue, setSearchValue] = useState('')

  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    item: { id: string; type: string; label: string; category: string; index: number }
  ) => {
    e.dataTransfer.setData('text/plain', '')
    e.dataTransfer.setData('id', item.id)
    e.dataTransfer.setData('type', item.type)
    e.dataTransfer.setData('label', item.label)
    e.dataTransfer.setData('category', item.category)
    e.dataTransfer.setData('index', item.index.toString())
  }

  const borderColor = theme.palette.mode === 'light' ? '#e5e5e5' : '#5d5d5d'

  const filteredFields = useMemo(
    () =>
      unusedFields.filter(field =>
        searchValue.trim() ? field.label.toLowerCase().includes(searchValue.toLowerCase()) : true
      ),
    [unusedFields, searchValue]
  )

  const renderFieldItem = (field: FieldType, index: number) => (
    <div
      key={index}
      className='flex-col items-start rounded border border-solid border-gray-300 w-full p-1 pl-2'
      draggable
      onDragStart={e => handleDragStart(e, { ...field, index })}
    >
      <p className='text-xs'>{field.label}</p>
      <div className='flex gap-1 text-gray-500'>
        <i
          className={field.type === 'input' ? 'tabler-text-size h-[15px] w-[15px]' : 'tabler-select h-[15px] w-[15px]'}
        />
        <p className='pt-[0.5px] text-xs'>
          {field.type === 'input'
            ? 'Text Field'
            : field.type === 'select'
              ? 'Select'
              : field.type === 'date'
                ? 'Date'
                : field.type === 'area'
                  ? 'Text Area'
                  : 'Editor'}
        </p>
      </div>
    </div>
  )

  return (
    <div className={`border-solid border h-full border-t-0 flex flex-col`}>
      <div className={`border-b border-solid border-[${borderColor}] py-2 px-3 flex items-center`}>
        <CustomTextField
          fullWidth
          placeholder='Search'
          sx={{ '& .MuiInputBase-root': { borderRadius: '30px !important' } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start' className='text-secondary'>
                <i className='tabler:search' />
              </InputAdornment>
            )
          }}
          onChange={e => setSearchValue(e.target.value)}
        />
      </div>
      <div className='overflow-y-auto' style={{ maxHeight: 'calc(100vh - 218px)', scrollbarWidth: 'none' }}>
        <Accordion defaultExpanded className='border-none shadow-none overflow-auto'>
          <AccordionSummary className='p-2' id='panel-header-1' aria-controls='panel-content-1'>
            <Typography className='text-sm'>Static Fields</Typography>
          </AccordionSummary>
          <AccordionDetails className='p-2'>
            <Stack direction='column' spacing={3}>
              {filteredFields.map((field, index) => field.category == 'static' && renderFieldItem(field, index))}
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion className='border-none shadow-none'>
          <AccordionSummary className='p-2' id='panel-header-2' aria-controls='panel-content-2'>
            <Typography className='text-sm'>Custom Fields</Typography>
          </AccordionSummary>
          <AccordionDetails className='p-2'>
            <Stack direction='column' spacing={3}>
              {filteredFields.map((field, index) => field.category == 'custom' && renderFieldItem(field, index))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}

export default SidebarLeft
