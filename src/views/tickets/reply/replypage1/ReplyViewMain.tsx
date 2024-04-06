'use client'

// ** React Imports
import React, { useState } from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
// import Icon from 'src/@core/components/icon'
import Tooltip from '@mui/material/Tooltip'
import ReplyViewRight from './ReplyViewRight'

import Grid, { GridProps } from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'
import { Divider } from '@mui/material'
import ReplyLeftView from './ReplyLeftView'
import ForwardTicket from './ForwardTicket/ForwardTicket'

const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))


const ReplyViewMain = () => {
  const theme = useTheme()

  const [openForwardTicket, setOpenForwardTicket] = useState<boolean>(false)
  const toggleForwardTicketDrawer = () => setOpenForwardTicket(!openForwardTicket)

    return (     
          <Card >
            <Grid container item sm={12} md={12} xs={12}>
              <StyledGrid
                  item
                  spacing={2}
                  sm={12}
                  xs={12}
                  md={3}
                >
                <ReplyLeftView/>
              </StyledGrid>
              <Grid item sx={{ pt: 0 }} sm={12} md={9} xs={12}> 
                <CardContent sx={{pt:0, pb:0}}>              
                  <Grid container item md={12} sm={12} xs={12}  sx={{ py: 3.75,  display: 'flex', justifyContent: {md:'space-between',sm: 'unset', xs:'unset'}, flexDirection: {md:'row', sm:'column', xs:'column'} }}>
                    <Grid item md={7} sm={12} xs={12} sx={{  width: 'auto', display: 'flex', alignItems: 'center' }}>                      
                      {/* <Box  sx={{ mr: 3, ml:-2}}>
                        <Icon icon='fontisto:ticket' color={`${theme.palette.primary.main}`} fontSize={25} />
                      </Box>        */}
                      <Link
                          component="button"
                          variant="h5"
                          sx={{textAlign:'start'}}
                        >
                        #12305 L.P.SAVANI Vidyabhavan and 7 others are new group suggestions for you
                      </Link>               
                      
                    </Grid>
                    {/* <Grid item md={5} sm={12} xs={12} sx={{ width: 'auto', display: 'flex', alignItems: 'center',justifyContent:['end'] }}>
                      <Tooltip placement='top' title='Create Jira Ticket'>                      
                        <IconButton  sx={{ mr: 1, p:'5px', border:`1px solid ${theme.palette.primary.main}`, borderRadius:'2rem' }}>
                          <Icon icon='simple-icons:jirasoftware' color={`${theme.palette.primary.main}`} fontSize={20} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip placement='top' title='Ticket Merge'>      
                        <IconButton  sx={{ mr: 1, p:'5px', border:`1px solid ${theme.palette.primary.main}`, borderRadius:'2rem' }}>
                          <Icon icon='fluent:merge-16-regular' color={`${theme.palette.primary.main}`} fontSize={20} />
                        </IconButton>
                      </Tooltip>  
                      <Tooltip placement='top' title='Child Ticket'>
                        <IconButton  sx={{ mr: 1, p:'5px', border:`1px solid ${theme.palette.primary.main}`, borderRadius:'2rem' }}>
                          <Icon icon='lets-icons:ticket-use-light' color={`${theme.palette.primary.main}`} fontSize={20} />
                        </IconButton>  
                      </Tooltip>
                      <Tooltip placement='top' title='Forward Ticket'>
                        <IconButton onClick={toggleForwardTicketDrawer} sx={{ mr: 1, p:'5px', border:`1px solid ${theme.palette.primary.main}`, borderRadius:'2rem' }}>
                          <Icon icon='solar:square-forward-bold'color={`${theme.palette.primary.main}`} fontSize={20} />
                        </IconButton>  
                      </Tooltip>
                      <Tooltip placement='top' title='Ticket Save As PDF'>
                        <IconButton  sx={{ mr: 1, p:'5px', border:`1px solid ${theme.palette.primary.main}`, borderRadius:'2rem' }}>
                          <Icon icon='basil:document-outline' color={`${theme.palette.primary.main}`} fontSize={20} />
                        </IconButton>  
                      </Tooltip>
                      <Tooltip placement='top' title='Refresh Page'>
                        <IconButton  sx={{ mr: 1, p:'5px', border:`1px solid ${theme.palette.primary.main}`, borderRadius:'2rem' }}>
                          <Icon icon='tabler:reload' color={`${theme.palette.primary.main}`} fontSize={20} />
                        </IconButton>  
                      </Tooltip>
                      <Tooltip placement='top' title='Back'>
                        <IconButton  sx={{ mr: 1, p:'5px', border:`1px solid ${theme.palette.primary.main}`, borderRadius:'2rem' }}>
                          <Icon icon='ic:round-arrow-back-ios' color={`${theme.palette.primary.main}`} fontSize={20} />
                        </IconButton>  
                      </Tooltip>
                      <Tooltip placement='top' title='Next'>
                        <IconButton  sx={{ mr: 1, p:'5px', border:`1px solid ${theme.palette.primary.main}`, borderRadius:'2rem' }}>
                          <Icon icon='ic:round-arrow-forward-ios' color={`${theme.palette.primary.main}`} fontSize={20} />
                        </IconButton>  
                      </Tooltip>
                    </Grid> */}
                  </Grid>                  
                </CardContent>                 
                <Divider/>
                <CardContent>  
                  <Grid item sm={12}>
                    <ReplyViewRight invoiceData={[]} />                     
                  </Grid>
                </CardContent>  
              </Grid>
          </Grid>
          {/* <ForwardTicket open={openForwardTicket} toggle={toggleForwardTicketDrawer} /> */}
        </Card>
    )
}

export default ReplyViewMain