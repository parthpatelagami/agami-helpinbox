'use client'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// Custom Components Imports
import { IconButton } from '@mui/material'

interface DataType {
  icon: string
  stats: string
  title: string
  color: string
}

const data: DataType[] = [
  {
    stats: '1402',
    title: 'All Tickets',
    color: '#28C76F',
    icon: 'material-symbols:ballot-outline'
  },
  {
    color: '#7367F0',
    stats: '145',
    title: 'New Tickets',
    icon: 'carbon:email-new'
  },
  {
    color: '#28C76F',
    stats: '397',
    title: 'Open Tickets',
    icon: 'tabler:mail-opened'
  },
  {
    stats: '545',
    color: '#FF9F43',
    title: 'Closed Tickets',
    icon: 'cil:envelope-closed'
  },
  {
    stats: '363',
    color: '#EA5455',
    title: 'Pending Tickets',
    icon: 'mdi:receipt-text-pending'
  },
  {
    stats: '102',
    color: '#4CA1D9',
    title: 'On Hold',
    icon: 'tabler:mail-pause'
  }
]

const renderStats = () => {
  return data.map((sale: DataType, index: number) => (
    <Grid item xs={6} md={2} key={index}>
      <Box
        sx={{
          display: 'flex',
          borderLeft: `4px solid ${sale.color}`, // Combine border styles
          pl: '1rem',
          flexDirection: 'column',
          '&:hover': { boxShadow: '0 0.25rem 1.125rem rgba(75, 70, 92, 0.1)' }
        }}
      >
        <Typography variant='h5'>{sale.stats}</Typography>
        <Typography variant='body2'>{sale.title}</Typography>
      </Box>
    </Grid>
  ))
}

const CardStatisticsStatistics1 = () => {
  return (
    <Card id='stat1' sx={{ border: '1px solid rgba(47, 43, 61, 0.16)', borderRadius: '0', boxShadow: 'none' }}>
      <CardHeader
        className='p-4'
        title='Ticket Counts'
        action={
          <IconButton id='handle' size='small'>
            <i className='tabler-arrows-move' />
          </IconButton>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.5)} !important` }}>
        <Grid container spacing={6}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CardStatisticsStatistics1
