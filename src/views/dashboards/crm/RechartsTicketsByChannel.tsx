'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// Component Imports
import { Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend } from '@/libs/Recharts'
import { IconButton } from '@mui/material'

// Styled Component Imports
const AppRecharts = dynamic(() => import('@/libs/styles/AppRecharts'))

type LabelProp = {
  cx: number
  cy: number
  percent: number
  midAngle: number
  innerRadius: number
  outerRadius: number
}

// Vars
const data = [
  { name: 'Manual', value: 85, color: '#00d4bd' },
  { name: 'Email', value: 16, color: '#ffe700' },
  { name: 'Facebook', value: 50, color: '#FFA1A1' },
  { name: 'Call', value: 50, color: '#826bf8' }
]

const RADIAN = Math.PI / 180

const renderCustomizedLabel = (props: LabelProp) => {
  // Props
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props

  // Vars
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill='#fff' textAnchor='middle' dominantBaseline='central' className='max-[400px]:text-xs'>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}
interface propsType {
  id?: string
}
const RechartsPieChart = (props: propsType) => {
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
        <AppRecharts>
          <div className='bs-[300px]'>
            <ResponsiveContainer>
              <PieChart height={300} style={{ direction: 'ltr' }}>
                <Pie
                  data={data}
                  innerRadius={75}
                  dataKey='value'
                  label={renderCustomizedLabel}
                  labelLine={false}
                  stroke='none'
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout='vertical' align='left' verticalAlign='middle' iconType='circle' />
              </PieChart>
            </ResponsiveContainer>
            {/*  <div className='flex justify-center flex-wrap gap-6'>
              <Box className='flex items-center gap-1.5' sx={{ '& i': { color: '#00d4bd' } }}>
                <i className='tabler-circle-filled text-xs' />
                <Typography variant='body2'>R&D</Typography>
              </Box>
              <Box className='flex items-center gap-1.5' sx={{ '& i': { color: '#ffe700' } }}>
                <i className='tabler-circle-filled text-xs' />
                <Typography variant='body2'>Operational</Typography>
              </Box>
              <Box className='flex items-center gap-1.5' sx={{ '& i': { color: '#FFA1A1' } }}>
                <i className='tabler-circle-filled text-xs' />
                <Typography variant='body2'>Networking</Typography>
              </Box>
              <Box className='flex items-center gap-1.5' sx={{ '& i': { color: '#826bf8' } }}>
                <i className='tabler-circle-filled text-xs' />
                <Typography variant='body2'>Hiring</Typography>
              </Box>
            </div> */}
          </div>
        </AppRecharts>
      </CardContent>
    </Card>
  )
}

export default RechartsPieChart
