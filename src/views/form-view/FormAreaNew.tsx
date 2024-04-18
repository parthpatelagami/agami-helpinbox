'use client'
import { useState } from 'react'

import { Button, Card, CardHeader, Divider, Grid, IconButton, Tooltip, useTheme } from '@mui/material'
import { Layout, Responsive, WidthProvider } from 'react-grid-layout'

// Types Import
import { LayoutBreakpoints, FieldType } from '@/types/formViewTypes'

const ResponsiveGridLayout = WidthProvider(Responsive)

interface PropsType {
  columns: number
  unusedFields: FieldType[]
  setUnusedFields: (val: any) => void
  usedFields: FieldType[]
  setUsedFields: (val: any) => void
  layoutState: LayoutBreakpoints
  setLayoutState: (val: any) => void
}

var currentX = 0
var currentY = 0

const FormAreaNew = (props: PropsType) => {
  const { columns, unusedFields, setUnusedFields, usedFields, setUsedFields, layoutState, setLayoutState } = props
  const [itemsCount, setItemsCount] = useState<number>(0)
  const [breakpoint, setBreakpoint] = useState<string>('lg')

  const theme = useTheme()

  const onDragStop = (newLayout: Layout[]) => {
    const updatedLayout: LayoutBreakpoints = { ...layoutState }

    Object.keys(updatedLayout).forEach((breakpoint: string) => {
      updatedLayout[breakpoint] = newLayout.map(item => ({
        ...item,
        x: Math.round(item.x),
        y: Math.round(item.y)
      }))
    })
    console.log(updatedLayout)
    setLayoutState(updatedLayout)
  }

  const deleteField = (field: FieldType, index: number) => {
    const updatedLayout: LayoutBreakpoints = {}
    const newFields = [...usedFields]
    newFields.splice(index, 1)
    setUsedFields(newFields)
    setUnusedFields(unusedFields.concat(field))
    Object.keys(layoutState).forEach((breakpoint: string) => {
      updatedLayout[breakpoint] = layoutState[breakpoint].filter(item => item.i != field.label)
    })
    let maxX = 0
    let maxY = 0
    Object.values(updatedLayout).forEach(layout => {
      layout.forEach(item => {
        maxX = Math.max(maxX, item.x)
        maxY = Math.max(maxY, item.y)
      })
    })
    if (maxX < currentX) {
      currentX = maxX
    }
    if (maxY < currentY) {
      currentY = maxY
    }
    setItemsCount(itemsCount - 1)
    setLayoutState(updatedLayout)
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
        y: currentY,
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
    currentY = currentX + fieldWidth >= columns ? (currentY += 1) : currentY
    currentX = currentX + fieldWidth >= columns ? 0 : currentX + fieldWidth
    console.log(updatedLayout)

    setItemsCount(itemsCount + 1)
    setLayoutState(updatedLayout)
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
    <div className='w-full border-solid h-full border-r border-b '>
      <div className='h-full overflow-y-auto max-h-[calc(100vh-201px)]'>
        <ResponsiveGridLayout
          onDragStop={onDragStop}
          rowHeight={70}
          layouts={layoutState}
          isDraggable
          cols={{ xxs: 1, xs: 2, sm: columns, md: columns, lg: columns, xl: columns }}
          isDroppable
          onDrop={onDrop}
          isResizable={false}
          style={{ minHeight: '100%' }}
          draggableHandle='#handle'
        >
          {usedFields?.map((field, index) => renderFieldItem(field, index))}
        </ResponsiveGridLayout>
      </div>
      <div className='flex justify-end p-2 border-solid border-t'>
        <Button size='small' variant='text'>
          Close
        </Button>
        <Button size='small' variant='contained'>
          Save
        </Button>
      </div>
    </div>
  )
}

export default FormAreaNew
