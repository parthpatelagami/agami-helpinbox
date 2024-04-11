// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import { styled, useTheme } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'
import MuiCardHeader, { CardHeaderProps } from '@mui/material/CardHeader'

// ** Custom Components Imports
// import Icon from 'src/@core/components/icon'
import OptionsMenu from '@core/components/option-menu'
import { historydata } from '@core/components/reply'
import React, { Fragment, useState, ReactNode } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Divider } from '@mui/material'

// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

const CardHeader = styled(MuiCardHeader)<CardHeaderProps>(({ theme }) => ({
  '& .MuiTypography-root': {
    lineHeight: 1.6,
    fontWeight: 500,
    fontSize: '1.125rem',
    letterSpacing: '0.15px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.25rem'
    }
  }
}))

const HistoryTabView = () => {
  const theme = useTheme();
    const [hidden, setHidden] = useState<boolean>(false);
    const ScrollWrapper = ({ children }: { children: ReactNode }) => {
        if (hidden) {
        return <Box sx={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
        } else {
        return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
        }
    }
  return (
    <Card className='h-[500px]'>
      <CardHeader
          className='p-5'
          title={
            <div className='flex items-center'>
              <i className='tabler:list-details' />
              <p>Ticket History</p>
            </div>
          }
          action={
            <OptionsMenu
              options={['Share timeline', 'Suggest edits', 'Report bug']}
              iconButtonProps={{ size: 'small', className:'' }}
            />
          }
        />
      <Divider/>
      <ScrollWrapper>
        <CardContent>     
          <Timeline className='mb-20'>
          {historydata.map((item:any, index:number)=>
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color='primary'  className='' />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className='mt-0 mb-2'>
                <div className='mb-4 flex items-center justify-between flex-wrap'>
                  <div className='flex items-center'>
                      <Avatar src='/images/avatars/1.png' className='mr-3 w-10 h-10'/>
                      <div className='flex flex-col items-start'>
                          <Typography variant='h6' sx={{ mr: 2 }}>
                            {item.name}
                          </Typography>
                      <Typography variant='caption'>{item.time}</Typography>
                      </div>
                  </div>
                  
                </div>
                
                <div className='gap-x-3 gap-y-1 flex flex-wrap items-center'>
                  <Typography variant='h6' className='mr-2'>{item.statustitle}</Typography>
                </div>
              </TimelineContent>
            </TimelineItem>
            )}
          </Timeline>       
        </CardContent>      
      </ScrollWrapper>
    </Card>
  )
}

export default HistoryTabView
