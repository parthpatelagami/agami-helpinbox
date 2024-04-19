'use client'
import { useEffect, useState } from 'react'

// MUI Imports
import { Grid, Card, CardContent, CardHeader, Divider, IconButton, Tooltip } from '@mui/material'

// Component Imports
import CardStatisticsStatistics3 from './CardStatisticsStatistics3'
import RechartsCsatChart from './RechartsCsatChart'
import RechartsTicketsByChannel from './RechartsTicketsByChannel'
import { StyledGrid } from './styles'
import { Responsive, WidthProvider } from 'react-grid-layout'
import DashboardFilter from './DashboardFilter'

const ResponsiveGridLayout = WidthProvider(Responsive)
interface LayoutItem {
  i: string
  x: number
  y: number
  w: number
  h: number
  minH?: number
}

interface LayoutBreakpoints {
  [key: string]: LayoutItem[]
}

const layout: LayoutBreakpoints = {
  lg: [
    /*  { i: 'stat1', x: 0, y: 0, w: 12, h: 0, minH: 0 },
    { i: 'stat2', x: 0, y: 0, w: 12, h: 0, minH: 0 }, */
    { i: 'stat3', x: 0, y: 0, w: 12, h: 0, minH: 0 },
    { i: 'chart1', x: 0, y: 0, w: 5, h: 0, minH: 0 },
    { i: 'chart2', x: 0, y: 0, w: 7, h: 0, minH: 0 }
  ],
  sm: [
    /*     { i: 'stat1', x: 0, y: 0, w: 12, h: 0 },
    { i: 'stat2', x: 0, y: 0, w: 12, h: 0 }, */
    { i: 'stat3', x: 0, y: 0, w: 12, h: 0 },
    { i: 'chart1', x: 0, y: 0, w: 12, h: 0 },
    { i: 'chart2', x: 0, y: 0, w: 12, h: 0 }
  ]
}
const DashboardCRM = () => {
  // Vars
  const [layoutState, setLayoutState] = useState<LayoutBreakpoints>(layout)
  const [filterOpen, setFilterOpen] = useState<boolean>(false)
  const [lockLayout, setLockLayout] = useState<boolean>(false)

  const toggleFilterDrawer = () => setFilterOpen(!filterOpen)

  const calculateHeight = (key: string) => {
    var height = 150
    if (document.getElementById(key)) {
      height = document.getElementById(key)?.clientHeight || 150
    }
    return height / 150
  }

  const updateHeights = () => {
    const updatedLayout: LayoutBreakpoints = {}

    Object.keys(layout).forEach((breakpoint: string) => {
      let currentX = 0
      let accumulatedWidth = 0
      let currentY = 0

      updatedLayout[breakpoint] = layout[breakpoint].map((item: LayoutItem) => {
        const newHeight = calculateHeight(item.i)

        if (accumulatedWidth + item.w > 12) {
          currentX = 0
          currentY += 1
          accumulatedWidth = 0
        }

        const newItem = { ...item, x: currentX, y: currentY, h: newHeight }
        currentX += newItem.w
        accumulatedWidth += newItem.w

        return newItem
      })
    })
    setLayoutState(updatedLayout)
  }

  useEffect(() => {
    updateHeights()
  }, [])
  return (
    <StyledGrid>
      <Card>
        <CardHeader
          className='p-2'
          action={
            <>
              <Tooltip placement='top' title='Refresh'>
                <IconButton size='small' className='text-textPrimary' aria-label='collapse'>
                  <i className='tabler-refresh' />
                </IconButton>
              </Tooltip>
              <Tooltip placement='top' title='Filter'>
                <IconButton
                  onClick={toggleFilterDrawer}
                  size='small'
                  className='text-textPrimary'
                  aria-label='collapse'
                >
                  <i className='tabler-filter' />
                </IconButton>
              </Tooltip>
            </>
          }
        />
        <Divider />
        <CardContent className='p-0'>
          <ResponsiveGridLayout
            layouts={layoutState}
            isDraggable={lockLayout ? false : true}
            isResizable={false}
            onWidthChange={updateHeights}
            onBreakpointChange={updateHeights}
            draggableHandle='#handle'
            cols={{ xxs: 12, xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
          >
            <Grid key='stat3' item xs={12}>
              <CardStatisticsStatistics3 />
            </Grid>
            <Grid key='chart1' item xs={12} md={5}>
              <RechartsTicketsByChannel id='chart1' />
            </Grid>
            <Grid key='chart2' item xs={12} md={7}>
              <RechartsCsatChart id='chart2' />
            </Grid>
          </ResponsiveGridLayout>
        </CardContent>
      </Card>
      <DashboardFilter
        open={filterOpen}
        lockLayout={lockLayout}
        setLockLayout={setLockLayout}
        handleClose={() => setFilterOpen(!filterOpen)}
      />
    </StyledGrid>
  )
}

export default DashboardCRM
