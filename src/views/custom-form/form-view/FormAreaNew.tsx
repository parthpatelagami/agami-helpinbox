'use client'
import { useEffect, useState } from 'react'

import { Button, Card, CardHeader, Divider, Grid, IconButton, Link, Tooltip, useTheme } from '@mui/material'
import { Layout, Responsive, WidthProvider } from 'react-grid-layout'

// Types Import
import { LayoutBreakpoints, FieldType } from '@/types/formViewTypes'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useSettings } from '@/@core/hooks/useSettings'
import { Locale } from '@/configs/i18n'
import { getLocalizedUrl } from '@/utils/i18n'
import { useParams } from 'next/navigation'
import { column } from 'stylis'
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

const FormAreaNew = (props: PropsType) => {
  // vars
  const { columns, unusedFields, setUnusedFields, usedFields, setUsedFields, layoutState, setLayoutState } = props

  // hooks
  const theme = useTheme()
  const { lang: locale } = useParams()
  const { settings } = useSettings()

  // states
  const [itemsCount, setItemsCount] = useState<number>(0)
  const [breakpoint, setBreakpoint] = useState<string>('lg')
  const [currentX, setCurrentX] = useState<number>(theme.direction == 'rtl' ? columns - 1 : 0)
  const [currentY, setCurrentY] = useState<number>(0)
  const navbarHeight = settings.layout === 'horizontal' ? '210px' : '180px'

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
      setCurrentX(maxX)
    }
    if (maxY < currentY) {
      setCurrentY(maxY)
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
    const fieldWidth = fieldType == 'editor' ? 3 : 1
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
    if (theme.direction == 'rtl') {
      setCurrentY(currentX - fieldWidth < 0 ? currentY + 1 : currentY)
    } else {
      setCurrentY(currentX + fieldWidth >= columns ? currentY + 1 : currentY)
    }

    if (theme.direction == 'rtl') {
      setCurrentX(currentX - fieldWidth < 0 ? columns : currentX - fieldWidth)
    } else {
      setCurrentX(currentX + fieldWidth >= columns ? 0 : currentX + fieldWidth)
    }
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
    <div className='w-full h-full border-solid border-r border-b '>
      <PerfectScrollbar style={{ maxHeight: `calc(100vh - ${navbarHeight})` }}>
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
      </PerfectScrollbar>
      <div className='flex justify-end p-2 border-solid border-t'>
        <Link href={getLocalizedUrl('/custom-form', locale as Locale)}>
          <Button size='small' variant='text'>
            Close
          </Button>
        </Link>
        <Button size='small' variant='contained'>
          Save
        </Button>
      </div>
    </div>
  )
}

export default FormAreaNew
