'use client'

// Next Imports
import dynamic from 'next/dynamic'

// ** MUI Imports
import Card from '@mui/material/Card'
import { useColorScheme, useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'

// ** Third Party Imports
import type { ApexOptions } from 'apexcharts'
import { rgbaToHex } from '@/utils/rgbaToHex'

// ** Component Import
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const donutColors = {
  series1: '#fdd835',
  series2: '#00d4bd',
  series3: '#826bf8',
  series4: '#1FD5EB',
  series5: '#ffa1a1'
}

interface propsType {
  id: string
}

const TicketByChannelChart = (props: propsType) => {
  // Hooks
  const theme = useTheme()
  const { mode } = useColorScheme()

  // Vars
  const _mode = (mode === 'system' ? 'light' : mode) || 'light'
  const textSecondary = rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.7)`)

  const options: ApexOptions = {
    stroke: { width: 1 },
    labels: ['Manual', 'Email', 'Facebook', 'Call'],
    colors: [donutColors.series1, donutColors.series5, donutColors.series3, donutColors.series2],
    dataLabels: {
      enabled: true,
      formatter: (val: string) => `${parseInt(val, 10)}%`
    },
    legend: {
      position: 'right',
      markers: { offsetX: -3 },
      labels: { colors: textSecondary },
      itemMargin: {
        vertical: 10,
        horizontal: 10
      },
      fontSize: '15'
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '1.2rem'
            },
            value: {
              fontSize: '1.2rem',
              color: textSecondary
            },
            total: {
              show: true,
              fontSize: '1.2rem',
              label: 'Total',
              formatter: () => '201',
              color: rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.9)`)
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: theme.typography.body1.fontSize
                  },
                  value: {
                    fontSize: theme.typography.body1.fontSize
                  },
                  total: {
                    fontSize: theme.typography.body1.fontSize
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  return (
    <Card sx={{ border: '1px solid rgba(47, 43, 61, 0.16)', borderRadius: '0', boxShadow: 'none' }} id={props.id}>
      <CardHeader
        sx={{ padding: '1rem' }}
        title='Tickets By Channel'
        action={
          <IconButton id='handle' size='small'>
            <i className='tabler-arrows-move' />
          </IconButton>
        }
      />
      <CardContent>
        <AppReactApexCharts type='donut' height={300} options={options} series={[85, 16, 50, 50]} />
      </CardContent>
    </Card>
  )
}

export default TicketByChannelChart
