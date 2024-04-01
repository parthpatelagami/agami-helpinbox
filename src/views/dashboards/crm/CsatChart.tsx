'use client'

// Next Imports
import dynamic from 'next/dynamic'

// ** MUI Imports
import Card from '@mui/material/Card'
import { useColorScheme, useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Third Party Imports
import { ApexOptions } from 'apexcharts'

// Util Imports
import { rgbaToHex } from '@/utils/rgbaToHex'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

import { IconButton } from '@mui/material'

interface propsType {
  id: string
}
// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const CsatChart = (props: propsType) => {
  // Hooks
  const theme = useTheme()
  const { mode } = useColorScheme()

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    legend: {
      position: 'right',
      markers: { offsetX: -3, radius: 10 },
      labels: { colors: theme.palette.text.secondary },
      itemMargin: {
        vertical: 10,
        horizontal: 10
      },
      fontSize: '15'
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val
      },
      textAnchor: 'start'
    },
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 5,
        barHeight: '70%',
        horizontal: true,
        dataLabels: {
          position: 'bottom'
        }
      }
    },
    colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f'],
    grid: {
      show: false
    },
    yaxis: {
      labels: {
        style: { fontSize: '13px' }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      categories: ['Great', 'Good', 'Average', 'Poor', 'Bad'],
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    }
  }

  return (
    <Card
      sx={{ height: 450, border: '1px solid rgba(47, 43, 61, 0.16)', borderRadius: '0', boxShadow: 'none' }}
      id={props.id}
    >
      <CardHeader
        title='My CSAT'
        sx={{ padding: '1rem' }}
        action={
          <IconButton id='handle' size='small'>
            <i className='tabler-arrows-move' />
          </IconButton>
        }
      />
      <CardContent>
        <AppReactApexCharts type='bar' height={320} options={options} series={[{ data: [90, 75, 50, 30, 10] }]} />
      </CardContent>
    </Card>
  )
}

export default CsatChart
