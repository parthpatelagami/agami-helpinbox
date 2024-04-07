'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'

// Component Imports
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from '@/libs/Recharts'
import type { TooltipProps } from '@/libs/Recharts'
import { IconButton } from '@mui/material'

// Styled Component Imports
const AppRecharts = dynamic(() => import('@/libs/styles/AppRecharts'))

// Vars
const data = [
  {
    name: 'Great',
    CSAT: 37,
    color: '#33b2df'
  },
  {
    name: 'Good',
    CSAT: 21,
    color: '#546E7A'
  },
  {
    name: 'Average',
    CSAT: 24,
    color: '#d4526e'
  },
  {
    name: 'Poor',
    CSAT: 11,
    color: '#13d8aa'
  },
  {
    name: 'Bad',
    CSAT: 7,
    color: '#2b908f'
  }
]

const colors = ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#2b908f']

const CustomTooltip = (props: TooltipProps<any, any>) => {
  // Props
  const { active, payload } = props

  if (active && payload) {
    return (
      <div className='recharts-custom-tooltip'>
        <Divider />
        {props &&
          props.payload &&
          props.payload.map((i: any, index) => {
            return (
              <Box key={i.dataKey} className='flex items-center gap-2.5' sx={{ '& i': { color: i.payload['color'] } }}>
                <i className='tabler-circle-filled text-[10px]' />
                <Typography color='text.primary'>{`${props.label} : ${i.payload[i.dataKey]}`}</Typography>
              </Box>
            )
          })}
      </div>
    )
  }

  return null
}
interface propsType {
  id?: string
}
const RechartsCsatChart = (props: propsType) => {
  // Hooks
  const theme = useTheme()

  return (
    <Card sx={{ border: '1px solid rgba(47, 43, 61, 0.16)', borderRadius: '0', boxShadow: 'none' }} id={props.id}>
      <CardHeader
        sx={{ padding: '1rem' }}
        title='MY CSAT'
        action={
          <IconButton id='handle' size='small'>
            <i className='tabler-arrows-move' />
          </IconButton>
        }
      />
      <CardContent className='grid grid-cols-5'>
        <AppRecharts className='col-span-4'>
          <div className='bs-[300px]'>
            <ResponsiveContainer>
              <BarChart layout='vertical' barGap={10} height={350} data={data} barSize={25}>
                <XAxis type='number' orientation='bottom' />
                <YAxis type='category' dataKey='name' />
                <Bar dataKey='CSAT' fill='#8884d8'>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Bar>
                <Tooltip content={CustomTooltip} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AppRecharts>
        <div className='col-span-1 content-center'>
          <Box className='flex items-center gap-1.5 pb-1' sx={{ '& i': { color: '#33b2df' } }}>
            <i className='tabler-circle-filled text-md' />
            <Typography variant='body1'>Great</Typography>
          </Box>
          <Box className='flex items-center gap-1.5 pb-1' sx={{ '& i': { color: '#546E7A' } }}>
            <i className='tabler-circle-filled text-md' />
            <Typography variant='body2'>Good</Typography>
          </Box>
          <Box className='flex items-center gap-1.5 pb-1' sx={{ '& i': { color: '#d4526e' } }}>
            <i className='tabler-circle-filled text-md' />
            <Typography variant='body2'>Average</Typography>
          </Box>
          <Box className='flex items-center gap-1.5 pb-1' sx={{ '& i': { color: '#13d8aa' } }}>
            <i className='tabler-circle-filled text-md' />
            <Typography variant='body2'>Poor</Typography>
          </Box>
          <Box className='flex items-center gap-1.5 pb-1' sx={{ '& i': { color: '#2b908f' } }}>
            <i className='tabler-circle-filled text-md' />
            <Typography variant='body2'>Bad</Typography>
          </Box>
        </div>
      </CardContent>
    </Card>
  )
}

export default RechartsCsatChart
