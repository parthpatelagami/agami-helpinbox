import { ReplyData } from '@core/components/reply';
// ** React Imports
import React, { Fragment, useState, ReactNode } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'


// ** MUI Imports

import Avatar from '@mui/material/Avatar'

import CardContent from '@mui/material/CardContent'


// ** Hooks
import { useSettings } from '@core/hooks/useSettings'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { historydata } from '@core/components/reply'

const Comments = ()=>{

  const mails = ReplyData;
  const theme = useTheme();

  const [hidden, setHidden] = useState<boolean>(false);
  const ScrollWrapper = ({ children }: { children: ReactNode }) => {
    if (hidden) {
      return <Box sx={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
      return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
    }
  }
  // ** Hook
  const splitTicket =()=>{
    console.log("click")
  }
  const { settings } = useSettings()
  const direction = "rtl";
  

  const prevMailIcon = direction === 'rtl' ? 'tabler:chevron-right' : 'tabler:chevron-left' 

  return ( 
    <ScrollWrapper>
    <CardContent>          
      {historydata.map((item:any, index:number)=>
        <Grid key={index} item sx={{mb:5}}>            
              <Box sx={{ display: 'flex', mb:5 }}>
                  <Avatar src={`${item.avatar}`} sx={{ mr: 3, width: 38, height: 38 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Typography variant='h6' sx={{ mr: 2 }}>
                        {item.name}
                      </Typography>
                      <Typography variant='caption'>{item.time}</Typography>
                      <Box sx={{mt:5}}>    
                        <Typography variant='body1'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae explicabo tempora aliquam rerum aperiam quibusdam repudiandae dicta, id exercitationem labore harum quae nam hic ex. Voluptatem ullam non exercitationem? Tenetur?</Typography>      
                      </Box>        
                  </Box>              
              </Box>         
          </Grid>
        )}        
    </CardContent>      
    </ScrollWrapper>

  )
}

export default Comments
