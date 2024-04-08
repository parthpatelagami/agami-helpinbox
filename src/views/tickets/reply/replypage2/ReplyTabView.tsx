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
import React, { useState, ReactNode, SyntheticEvent } from 'react'

// ** Icon Imports
import {Icon} from '@iconify/react'
import IconButton from '@mui/material/IconButton'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
// ** Types
// import { InvoiceType } from 'src/types/apps/replypagetype'

import MenuItem from '@mui/material/MenuItem'

// import CardSnippet from 'src/@core/components/card-snippet'
// import EditorControlled from '../editor/EditControlled'
// import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import CustomTextField from '@core/components/mui/TextField'

import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

interface Props {
  invoiceData: []
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
import { Divider } from '@mui/material'


const ReplyTabView = () => {
  const [expanded, setExpanded] = useState<string | false | true>(true)
  const [hidden, setHidden] = useState<boolean>(false);
  const ScrollWrapper = ({ children }: { children: ReactNode }) => {
    if (hidden) {
      return <Box sx={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
      return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
    }
  }
  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => { 
      setExpanded(isExpanded ? true : false)
  }
  const theme = useTheme();
  return (
    // <EditorWrapper>
      <Grid container spacing={2} className='match-height'>       
        <Grid item xs={12} md={12} sm={12}>
          <Grid item xs={12} sm={12} md={12} mb={5} sx={{display:'flex', justifyContent:{md:'space-between', sm:null, xs:null}, flexDirection:{md:'unset', xs:'column', sm:'column'}}}>
            <Grid item md={4} sm={12} xs={12} sx={{mt:5}}>
              <CustomTextField select fullWidth label='' defaultValue='0'>
                <MenuItem value='0'>Select Canned Response</MenuItem>
                <MenuItem value='pending'>Shubham</MenuItem>
                <MenuItem value='active'>Parth</MenuItem>
                <MenuItem value='inactive'>Vinod</MenuItem>
              </CustomTextField> 
            </Grid>
            <Grid item md={4} sm={12} xs={12} sx={{mt:5}}>                
              <CustomTextField select fullWidth label='' defaultValue='0'>
                  <MenuItem value='0'>All</MenuItem>
                  <MenuItem value='manual'>Manual</MenuItem>
                  <MenuItem value='email'>Email</MenuItem>
                  <MenuItem value='customer_portail'>Customer Portail</MenuItem>
                  <MenuItem value='facebook'>Facebook</MenuItem>
                  <MenuItem value='call'>Call</MenuItem>
                  <MenuItem value='chat'>Chat</MenuItem>
              </CustomTextField> 
            </Grid>                 
          </Grid>            
          {/* <EditorControlled/> */}
          <Grid item xs={12} md={12} sm={12} mt={4} >                
            <Grid item sm={12} md={12} xs={12} sx={{display:'flex', width:'100%', flexDirection:{xs:'column', md:'row'}}}>
              <Grid item sm={12} md={5} xs={12}>
                <FormControlLabel label='Do not Notify Customer' control={<Checkbox defaultChecked name='customer' />} />
              </Grid>
              
              <Grid item sm={8} md={7} xs={12} sx={{display:'flex', alignItems:'center'}}>
                <Typography sx={{ marginRight:'1rem', marginTop:'0'}} variant='subtitle1'>Collaborators:- </Typography>
                <CustomTextField select fullWidth label='' defaultValue='-1'>
                  <MenuItem value='-1'>Select Collaborator</MenuItem>
                  <MenuItem value='0'>Pangale Shubham</MenuItem>
                  <MenuItem value='1'>Desai Nimit</MenuItem>
                  <MenuItem value='2'>Patel Parth</MenuItem>
                  <MenuItem value='3'>Dahodwala Mustafa</MenuItem>
                  <MenuItem value='4'>Mangera Aadil</MenuItem>
                </CustomTextField>
                <Tooltip placement='top' title='Add New User'>
                  <IconButton>
                    <Icon icon='ei:plus' color={`${theme.palette.primary.main}`} fontSize={35} />
                  </IconButton>
                </Tooltip>  
              </Grid>               
            </Grid>
            <div className='flex items-center justify-end gap-4 py-8'>
              <Button variant='contained' type='submit'>
                Reply
              </Button>
              <Button variant='tonal' color='error' type='reset' >
                Cancel
              </Button>
            </div>
          </Grid>
          <Grid item sx={{mt:10}}>
            <Accordion expanded={expanded === true} sx={{mb:5, mt:5}} onChange={handleChange('panel1')}>
              <AccordionSummary
                id='controlled-panel-header-1'
                aria-controls='controlled-panel-content-1'
                // expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
              >
                <Typography>Conversation History</Typography>
              </AccordionSummary>
              <Divider/>
              <AccordionDetails>
                <Grid item height={500}>
                  <ConversationView/>
                </Grid>
              </AccordionDetails>
            </Accordion>  
          </Grid>      
        </Grid>        
      </Grid>
    // </EditorWrapper>    
  )
}

export default ReplyTabView
