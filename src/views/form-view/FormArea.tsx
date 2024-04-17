'use client'

import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, styled, TextField } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import CustomTextField from '@core/components/mui/TextField'
import { Layout, Responsive, WidthProvider } from 'react-grid-layout'
import { useEffect, useState } from 'react'
import { LayoutBreakpoints, FieldType } from '@/types/formViewTypes'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import AppReactDraftWysiwyg from '@/libs/styles/AppReactDraftWysiwyg'

const ResponsiveGridLayout = WidthProvider(Responsive)

const initialLayout: LayoutBreakpoints = {
  lg: [],
  md: [],
  sm: []
}

interface PropsType {
  unusedFields: FieldType[]
  setUnusedFields: (val: any) => void
  layout: number
}

const FormArea = (props: PropsType) => {
  const { unusedFields, setUnusedFields, layout } = props
  const [layoutState, setLayoutState] = useState<LayoutBreakpoints>(initialLayout)
  const [itemsCount, setItemsCount] = useState<number>(0)
  const [breakpoint, setBreakpoint] = useState<string>('lg')
  const [date, setDate] = useState<Date | null | undefined>(new Date())
  const [usedFields, setUsedFields] = useState<FieldType[]>([])
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const theme = useTheme()

  // const updateLayout = () => {
  //   const updatedLayout: LayoutBreakpoints = {}
  //   const maxLayoutWidth = 12
  //   Object.keys(layoutState).forEach((breakpoint: string) => {
  //     let count = 0
  //     updatedLayout[breakpoint] = layoutState[breakpoint]?.map(data => {
  //       const result = {
  //         ...data,
  //         x: count,
  //         w: layout
  //       }
  //       count = count + layout >= maxLayoutWidth ? 0 : count + layout
  //       return result
  //     })
  //   })
  //   setLayoutState(updatedLayout)
  // }

  const onDrop = (layouts: Layout[], item: Layout, e: DragEvent) => {
    const updatedLayout: LayoutBreakpoints = {}
    Object.keys(layoutState).forEach((breakpoint: string) => {
      updatedLayout[breakpoint] = layoutState[breakpoint].concat({
        i: e.dataTransfer?.getData('label') || '',
        x: layoutState[breakpoint].length % layout,
        y: Infinity,
        w: e.dataTransfer?.getData('type') == 'editor' ? 4 : 1,
        h: e.dataTransfer?.getData('type') == 'area' ? 2 : e.dataTransfer?.getData('type') == 'editor' ? 3.5 : 1
      })
      setUsedFields(
        usedFields.concat({
          type: e.dataTransfer?.getData('type') || '',
          label: e.dataTransfer?.getData('label') || '',
          category: e.dataTransfer?.getData('category') || ''
        })
      )
    })
    setItemsCount(itemsCount + 1)
    setLayoutState(updatedLayout)
    const newFields = [...unusedFields]
    const index = parseInt(e.dataTransfer?.getData('index') || '')
    newFields.splice(index, 1)
    setUnusedFields(newFields)
  }

  // useEffect(() => {
  //   updateLayout()
  // }, [layout])
  return (
    <div className={`w-full border-solid h-full border-r border-b`}>
      <ResponsiveGridLayout
        onDragStop={newLayout => {
          console.log(newLayout)
          setLayoutState({ ...layoutState, [breakpoint]: newLayout })
        }}
        rowHeight={70}
        layouts={layoutState}
        isDraggable
        cols={{ xxs: 1, xs: 2, sm: layout, md: layout, lg: layout, xl: layout }}
        isDroppable
        onDrop={onDrop}
        isResizable={false}
        style={{ minHeight: '100%' }}
      >
        {usedFields?.map(component => (
          <Grid
            key={component.label}
            style={{
              border: selectedItem === component.label ? '1px solid gray' : 'none'
            }}
            onDoubleClick={() => setSelectedItem(component.label)}
            item
            xs={12}
          >
            {component.type?.includes('input') ? (
              <CustomTextField
                className='p-0'
                inputProps={{ readOnly: true }}
                id={component.label}
                autoFocus
                fullWidth
                label={component.label}
                placeholder={component.label}
                onFocus={() => setSelectedItem(component.label)}
              />
            ) : component.type?.includes('select') ? (
              <CustomTextField
                variant='standard'
                inputProps={{ readOnly: true }}
                className='p-0'
                select
                fullWidth
                defaultValue='Select'
                label={component.label}
                id={component.label}
                onFocus={() => setSelectedItem(component.label)}
              >
                <MenuItem value='Select'>
                  <em>Select</em>
                </MenuItem>
              </CustomTextField>
            ) : component.type?.includes('area') ? (
              <CustomTextField
                multiline
                rows={4}
                className='p-0'
                inputProps={{ readOnly: true }}
                id={component.label}
                autoFocus
                fullWidth
                label={component.label}
                placeholder={component.label}
              />
            ) : component.type?.includes('date') ? (
              <AppReactDatepicker
                dateFormat='dd/MM/yyyy'
                readOnly
                selected={date}
                id={component.label}
                onChange={(date: Date) => setDate(date)}
                customInput={<CustomTextField InputProps={{ readOnly: true }} label={component.label} fullWidth />}
              />
            ) : (
              <AppReactDraftWysiwyg />
            )}
          </Grid>
        ))}
      </ResponsiveGridLayout>
    </div>
  )
}

export default FormArea
