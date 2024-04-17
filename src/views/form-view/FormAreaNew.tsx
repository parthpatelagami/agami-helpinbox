'use client'

import { Card, CardHeader, Divider, Grid, IconButton, Tooltip } from '@mui/material'
import { useTheme } from '@mui/material/styles'

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
  unusedFields: FieldType[]
  setUnusedFields: (val: any) => void
  layout: number
}

var currentX = 0
var currentY = 0

const FormAreaNew = (props: PropsType) => {
  const { unusedFields, setUnusedFields, layout } = props
  const [layoutState, setLayoutState] = useState<LayoutBreakpoints>(initialLayout)
  const [itemsCount, setItemsCount] = useState<number>(0)
  const [breakpoint, setBreakpoint] = useState<string>('lg')
  const [usedFields, setUsedFields] = useState<FieldType[]>([])

  const theme = useTheme()

  const deleteField = (field: FieldType, index: number) => {
    const newFields = [...usedFields]
    newFields.splice(index, 1)
    setUsedFields(newFields)
    setUnusedFields(unusedFields.concat(field))
  }

  const onDrop = (layouts: Layout[], item: Layout, e: DragEvent) => {
    const updatedLayout: LayoutBreakpoints = {}
    const fieldId = e.dataTransfer?.getData('id') || ''
    const fieldType = e.dataTransfer?.getData('type') || ''
    const fieldLabel = e.dataTransfer?.getData('label') || ''
    const fieldCategory = e.dataTransfer?.getData('category') || ''
    const fieldWidth = fieldType == 'editor' ? 4 : 1
    Object.keys(layoutState).forEach((breakpoint: string) => {
      updatedLayout[breakpoint] = layoutState[breakpoint].concat({
        i: fieldLabel,
        x: currentX,
        y: Infinity,
        w: fieldWidth,
        h: fieldType == 'area' ? 2 : fieldType == 'editor' ? 3.5 : 1
      })
      setUsedFields(
        usedFields.concat({
          id: fieldId,
          type: fieldType,
          label: fieldLabel,
          category: fieldCategory
        })
      )
    })
    currentY = currentX + fieldWidth >= layout ? (currentY += 1) : currentY
    currentX = currentX + fieldWidth >= layout ? 0 : currentX + fieldWidth

    setItemsCount(itemsCount + 1)
    setLayoutState(updatedLayout)
    console.log(updatedLayout)
    const newFields = [...unusedFields]
    const index = parseInt(e.dataTransfer?.getData('index') || '')
    newFields.splice(index, 1)
    setUnusedFields(newFields)
  }

  const renderFieldItem = (field: FieldType, index: number) => (
    <Grid key={field.label} item xs={12} className='h-full'>
      <Card
        className='h-full'
        sx={{
          border: theme.palette.secondary.main,
          '&:hover': {
            boxShadow: theme.shadows[1]
          }
        }}
      >
        <CardHeader
          className='p-3'
          title={field.label}
          titleTypographyProps={{ className: 'text-sm font-sm pb-1' }}
          subheader={
            <div className='flex gap-1'>
              <i
                className={
                  field.type === 'input' ? 'tabler-text-size h-[15px] w-[15px]' : 'tabler-select h-[15px] w-[15px]'
                }
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
          }
          subheaderTypographyProps={{ className: 'text-xs font-xs' }}
          action={
            <div className='flex items-end gap-1'>
              <Tooltip placement='top' title='Delete'>
                <IconButton
                  className='text-base rounded-full p-0'
                  onClick={() => {
                    deleteField(field, index)
                  }}
                >
                  <i className={`tabler-trash text-error`} />
                </IconButton>
              </Tooltip>
              <Tooltip placement='top' title='Move'>
                <IconButton id='handle' className='text-base rounded-full p-0'>
                  <i className='tabler-arrows-move' />
                </IconButton>
              </Tooltip>
            </div>
          }
        />
        <Divider />
      </Card>
    </Grid>
  )
  return (
    <div className='w-full border-solid h-full border-r border-b overflow-y-auto max-h-[calc(100vh-153px)]'>
      <ResponsiveGridLayout
        onDragStop={newLayout => {
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
        draggableHandle='#handle'
      >
        {usedFields?.map((field, index) => renderFieldItem(field, index))}
      </ResponsiveGridLayout>
    </div>
  )
}

export default FormAreaNew
