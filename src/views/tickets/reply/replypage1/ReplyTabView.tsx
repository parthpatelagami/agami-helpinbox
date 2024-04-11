// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'
import Link from 'next/link'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import React, { useState, ReactNode } from 'react'
// ** Icon Imports
import {Icon} from '@iconify/react'
import IconButton from '@mui/material/IconButton'

// ** Types
// import { InvoiceType } from 'src/types/apps/replypagetype'

import MenuItem from '@mui/material/MenuItem'

// import EditorControlled from '../editor/EditControlled'
// import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import CustomTextField from '@core/components/mui/TextField';

import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

interface Props {
  invoiceData: [];
}
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import ConversationView from './ConversationView'

// const LinkStyled = styled(Link)(({ theme }) => ({
//   textDecoration: 'none',
//   color: theme.palette.primary.main
// }))
// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
  '& .MuiTimelineItem-root:before': {
    display: 'none'
  }
})
import PerfectScrollbar from 'react-perfect-scrollbar'

 

const ReplyTabView = () => {
  const [hidden, setHidden] = useState<boolean>(false);
  const ScrollWrapper = ({ children }: { children: ReactNode }) => {
    if (hidden) {
      return <Box sx={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
      return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
    }
  }
  const theme = useTheme();
  return (
    // <EditorWrapper>
        <Grid item xs={12} md={12} sm={12}>
          <Card>
            <CardContent>
              <Grid item xs={12} sm={6} md={4} mb={5}>
                  <CustomTextField select fullWidth label='' defaultValue='0'>
                    <MenuItem value='0'>Select Canned Response</MenuItem>
                    <MenuItem value='pending'>Shubham</MenuItem>
                    <MenuItem value='active'>Parth</MenuItem>
                    <MenuItem value='inactive'>Vinod</MenuItem>
                  </CustomTextField>
              </Grid>            
              {/* <EditorControlled/> */}
              <CustomTextField
                id='invoice-note'
                rows={6}
                fullWidth
                multiline
                className='border rounded'
                placeholder='Enter Here...'
                defaultValue=''
              />
              <Grid item xs={12} md={12} sm={12} mt={4} >
                <Grid item sm={12} md={12} xs={12}>
                  <Grid item sm={12} md={12} xs={12} className='flex w-full flex-col md:flex-row lg:flex-row'>
                    <Grid item sm={12} md={5} xs={12}>
                      <FormControlLabel label='Do not Notify Customer' control={<Checkbox defaultChecked name='customer' />} />
                    </Grid>
                    
                    <Grid item sm={8} md={7} xs={12} className='flex items-center'>
                      <Typography className='mr-1 mt-0 ' variant='subtitle1'>Collaborators:- </Typography>
                      <CustomTextField select fullWidth label='' defaultValue='-1'>
                        <MenuItem value='-1'>Select Collaborator</MenuItem>
                        <MenuItem value='0'>Pangale Shubham</MenuItem>
                        <MenuItem value='1'>Desai Nimit</MenuItem>
                        <MenuItem value='2'>Patel Parth</MenuItem>
                        <MenuItem value='3'>Dahodwala Mustafa</MenuItem>
                        <MenuItem value='4'>Mangera Aadil</MenuItem>
                      </CustomTextField>
                      <Tooltip placement='top' title='Add New User'>
                        <IconButton className='border border-solid text-primary m-1 rounded-full p-0.5'>
                          <i className='tabler-plus p-0'/>
                        </IconButton>
                      </Tooltip>  
                    </Grid>
                  </Grid>
                  <Grid item md={4} sm={5} xs={12} className='mt-5 items-center flex gap-2'>
                    <Typography variant='subtitle1'>Status:- </Typography>
                    <CustomTextField select fullWidth label='' defaultValue='0'>
                      <MenuItem value='0'>Open</MenuItem>
                      <MenuItem value='pending'>Pending</MenuItem>
                      <MenuItem value='active'>Resolved</MenuItem>
                      <MenuItem value='inactive'>Close</MenuItem>
                    </CustomTextField>
                  </Grid>
                </Grid>
                <div className='flex items-center justify-end gap-4 py-8'>
                  <Button variant='contained' type='submit' >
                    Reply
                  </Button>
                  <Button variant='tonal' color='error' type='reset' >
                    Cancel
                  </Button>
                </div>
              </Grid>
            </CardContent>
          </Card>        
        </Grid>        
    // </EditorWrapper>    
  )
}

export default ReplyTabView
