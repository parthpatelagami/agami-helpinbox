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
import { Icon } from '@iconify/react'

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
  // const [addUserOpen, setAddUserOpen] = useState(false)
  const [openForwardTicket, setOpenForwardTicket] = useState<boolean>(false)
 
    return (     
          <Card >
            <Grid container item sm={12} md={12} xs={12}>              
              <StyledGrid item className='pt-0' sm={12} md={9} xs={12}> 
                <CardContent className='py-0'>              
                  <Grid item md={12} sm={12} xs={12} className='py-3.5 flex justify-start flex-col md:justify-between lg:justify-between md:flex-row lg:flex-row'>
                    <Grid item md={7} sm={12} xs={12} className='w-auto flex items-center'>                      
                      <div className='me-3 ms-0'>
                        <Icon icon='fontisto:ticket' color={`${theme.palette.primary.main}`} fontSize={25} />
                      </div>       
                      <Link
                          component="button"
                          variant="h5"
                          className='text-start no-underline hover:underline' 
                        >
                        #12305 L.P.SAVANI Vidyabhavan and 7 others are new group suggestions for you
                      </Link>               
                      
                    </Grid>
                    <Grid item md={5} sm={12} xs={12} className='w-auto flex items-center justify-end'>
                      <Tooltip placement='top' title='Create Jira Ticket'>                      
                        <IconButton className='border border-dashed text-primary mr-1 rounded-full p-[5px]'>
                          <Icon icon='simple-icons:jirasoftware' color={`${theme.palette.primary.main}`}/>
                        </IconButton>
                      </Tooltip>
                      <Tooltip placement='top' title='Ticket Merge'>      
                        <IconButton  className='border border-dashed text-primary mr-1 rounded-full p-[5px]'>
                          <Icon icon='fluent:merge-16-regular' color={`${theme.palette.primary.main}`} />
                        </IconButton>
                      </Tooltip>  
                      <Tooltip placement='top' title='Child Ticket'>
                        <IconButton  className='border border-dashed text-primary mr-1 rounded-full p-[5px]'>
                          <Icon icon='lets-icons:ticket-use-light' color={`${theme.palette.primary.main}`} />
                        </IconButton>  
                      </Tooltip>
                      <Tooltip placement='top' title='Forward Ticket'>
                        <IconButton onClick={()=>setOpenForwardTicket(!openForwardTicket)}  className='border border-dashed text-primary mr-1 rounded-full p-[5px]'>
                          <Icon icon='solar:square-forward-bold'color={`${theme.palette.primary.main}`} />
                        </IconButton>  
                      </Tooltip>
                      <Tooltip placement='top' title='Ticket Save As PDF'>
                        <IconButton  className='border border-dashed text-primary mr-1 rounded-full p-[5px]'>
                          <Icon icon='basil:document-outline' color={`${theme.palette.primary.main}`} />
                        </IconButton>  
                      </Tooltip>
                      <Tooltip placement='top' title='Refresh Page'>
                        <IconButton  className='border border-dashed text-primary mr-1 rounded-full p-[5px]'>
                          <Icon icon='tabler:reload' color={`${theme.palette.primary.main}`} />
                        </IconButton>  
                      </Tooltip>
                      <Tooltip placement='top' title='Back'>
                        <IconButton  className='border border-dashed text-primary mr-1 rounded-full p-[5px]'>
                          <Icon icon='ic:round-arrow-back-ios' color={`${theme.palette.primary.main}`} />
                        </IconButton>  
                      </Tooltip>
                      <Tooltip placement='top' title='Next'>
                        <IconButton  className='border border-dashed text-primary mr-1 rounded-full p-[5px]'>
                          <Icon icon='ic:round-arrow-forward-ios' color={`${theme.palette.primary.main}`} />
                        </IconButton>  
                      </Tooltip>
                    </Grid>
                  </Grid>                  
                </CardContent>                 
                <Divider/>
                <CardContent>  
                  <Grid item sm={12}>
                    <ReplyViewRight invoiceData={[]} />                     
                  </Grid>
                </CardContent>  
              </StyledGrid>
              <Grid
                  container
                  item
                  spacing={2}
                  sm={12}
                  xs={12}
                  md={3}
                >
                <ReplyLeftView/>
              </Grid>
          </Grid>
          <ForwardTicket open={openForwardTicket} handleClose={() => setOpenForwardTicket(!openForwardTicket)} />
        </Card>
    )
}

export default ReplyViewMain
