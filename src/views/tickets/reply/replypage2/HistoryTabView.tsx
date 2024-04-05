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
    <Card sx={{mt:5, height:'500px'}}>
      <CardHeader
        sx={{p:5}}
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3 } }}>
              {/* <Icon fontSize='1.25rem' icon='tabler:list-details' /> */}
              <Typography>Ticket History</Typography>
            </Box>
          }
          action={
            <OptionsMenu
              options={['Share timeline', 'Suggest edits', 'Report bug']}
              iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
            />
          }
        />
      <Divider/>
      <ScrollWrapper>
        <CardContent>     
          <Timeline sx={{mb:20}}>
          {historydata.map((item:any, index:number)=>
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color='warning' sx={{ mt: 1.5 }} />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ mt: 0, mb: theme => `${theme.spacing(2)} !important` }}>
                <Box
                  sx={{
                    mb: 4,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src='/images/avatars/1.png' sx={{ mr: 3, width: 38, height: 38 }} />
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                          <Typography variant='h6' sx={{ mr: 2 }}>
                            {item.name}
                          </Typography>
                      <Typography variant='caption'>{item.time}</Typography>
                      </Box>
                  </Box>
                  
                </Box>
                
                <Box sx={{ rowGap: 1, columnGap: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Typography variant='h6' sx={{mr:2}}>{item.statustitle}</Typography>
                </Box>
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
