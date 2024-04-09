'use client'

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardHeader,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  styled,
  Typography
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import CustomTextField from '@core/components/mui/TextField'
import { DragEvent, useState } from 'react'
import { FieldType } from '@/types/formViewTypes'

interface PropsType {
  fields: FieldType[]
  setFields: (val: any) => void
}

const SidebarLeft = (props: PropsType) => {
  const { fields, setFields } = props
  const theme = useTheme()

  const handleDragStart = (e: DragEvent<HTMLDivElement>, item: { type: string; label: string; index: number }) => {
    e.dataTransfer.setData('text/plain', '')
    e.dataTransfer.setData('type', item.type)
    e.dataTransfer.setData('label', item.label)
    e.dataTransfer.setData('index', item.index.toString())
  }

  const borderColor = theme.palette.mode === 'light' ? '#e5e5e5' : '#5d5d5d'
  return (
    <div className={`border-solid border h-full border-t-0 flex flex-col`}>
      <Stack spacing={2}>
        <div className={`border-b border-solid border-[${borderColor}] py-3 px-5 flex items-center`}>
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
          />
        </div>
      </Stack>
      <div className='overflow-y-auto' style={{ maxHeight: 'calc(100vh - 218px)', scrollbarWidth: 'none' }}>
        <Accordion defaultExpanded className='border-none shadow-none overflow-auto'>
          <AccordionSummary className='p-2' id='panel-header-1' aria-controls='panel-content-1'>
            <Typography>Static Fields</Typography>
          </AccordionSummary>
          <AccordionDetails className='p-2'>
            <Stack direction='column' spacing={3}>
              {fields.map(
                (item, index) =>
                  item.category == 'static' && (
                    <div
                      key={index}
                      className='flex-col items-start rounded border border-solid border-gray-300 w-full p-1 pl-2'
                      draggable
                      onDragStart={e => handleDragStart(e, { ...item, index })}
                    >
                      <p className='text-sm'>{item.label}</p>
                      <div className='flex gap-1 text-gray-500'>
                        <i
                          className={
                            item.type === 'input'
                              ? 'tabler-text-size h-[15px] w-[15px]'
                              : 'tabler-select h-[15px] w-[15px]'
                          }
                        />
                        <p className='pt-[0.5px] text-xs'>
                          {item.type === 'input' ? 'Text Field' : item.type === 'select' ? 'Select' : 'Text Area'}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion className='border-none shadow-none'>
          <AccordionSummary className='p-2' id='panel-header-2' aria-controls='panel-content-2'>
            <Typography>Custom Fields</Typography>
          </AccordionSummary>
          <AccordionDetails className='p-2'>
            <Stack direction='column' spacing={3}>
              {fields.map(
                (item, index) =>
                  item.category == 'custom' && (
                    <div
                      key={index}
                      className='flex-col items-start rounded border border-solid border-gray-300 w-full p-1 pl-2'
                      draggable
                      onDragStart={e => handleDragStart(e, { ...item, index })}
                    >
                      <p className='text-sm'>{item.label}</p>
                      <div className='flex gap-1 text-gray-500'>
                        <i
                          className={
                            item.type === 'input'
                              ? 'tabler-text-size h-[15px] w-[15px]'
                              : 'tabler-select h-[15px] w-[15px]'
                          }
                        />
                        <p className='pt-[0.5px] text-xs'>
                          {item.type === 'input' ? 'Text Field' : 'select' ? 'Select' : 'Area'}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}

export default SidebarLeft
