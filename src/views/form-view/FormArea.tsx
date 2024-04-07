'use client'

import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, styled, TextField } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import CustomTextField from '@core/components/mui/TextField'
import { Layout, Responsive, WidthProvider } from 'react-grid-layout'
import { useState } from 'react'
import { LayoutBreakpoints, FieldType } from '@/types/formViewTypes'

const ResponsiveGridLayout = WidthProvider(Responsive)

const initialLayout: LayoutBreakpoints = {
  lg: [],
  md: [],
  sm: []
}

interface PropsType {
  fields: FieldType[]
  setFields: (val: any) => void
}

const FormArea = (props: PropsType) => {
  const { fields, setFields } = props
  const [layoutState, setLayoutState] = useState<LayoutBreakpoints>(initialLayout)
  const [itemsCount, setItemsCount] = useState<number>(0)
  const [breakpoint, setBreakpoint] = useState<string>('lg')

  const theme = useTheme()

  const onDrop = (layouts: Layout[], item: Layout, e: DragEvent) => {
    const updatedLayout: LayoutBreakpoints = {}
    Object.keys(layoutState).forEach((breakpoint: string) => {
      updatedLayout[breakpoint] = layoutState[breakpoint].concat({
        i: e.dataTransfer?.getData('label') || '',
        x: (layoutState[breakpoint].length * 4) % 12,
        y: Infinity,
        w: 4,
        h: 1,
        type: e.dataTransfer?.getData('type') || ''
      })
    })
    setItemsCount(itemsCount + 1)
    setLayoutState(updatedLayout)
    const newFields = [...fields]
    const index = parseInt(e.dataTransfer?.getData('index') || '')
    newFields.splice(index, 1)
    setFields(newFields)
  }

  return (
    <div className={`col-span-7 bg-default border-solid border`}>
      <ResponsiveGridLayout
        layouts={layoutState}
        isDraggable
        margin={[20, 20]}
        cols={{ xxs: 12, xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
        isDroppable
        onDrop={onDrop}
        isResizable={false}
      >
        {layoutState[breakpoint]?.map(component => (
          <Grid key={component.i} item xs={12}>
            {component.type?.includes('input') ? (
              <CustomTextField
                className='p-0'
                disabled
                id={component.i}
                autoFocus
                fullWidth
                label={component.i}
                placeholder={component.i}
              />
            ) : component.type?.includes('select') ? (
              <CustomTextField
                variant='standard'
                className='p-0'
                disabled
                select
                fullWidth
                defaultValue='Select'
                label={component.i}
                id={component.i}
              >
                <MenuItem value='Select'>
                  <em>Select</em>
                </MenuItem>
              </CustomTextField>
            ) : (
              <CustomTextField
                multiline
                rows={4}
                className='p-0'
                disabled
                id={component.i}
                autoFocus
                fullWidth
                label={component.i}
                placeholder={component.i}
              />
            )}
          </Grid>
        ))}
      </ResponsiveGridLayout>
    </div>
  )
}

export default FormArea
