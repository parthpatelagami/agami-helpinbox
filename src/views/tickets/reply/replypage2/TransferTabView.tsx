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

// ** Icon Imports
// import Icon from 'src/@core/components/icon'
// import IconButton from '@mui/material/IconButton'

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

const TransferTabView = () => {
  const theme = useTheme();
  return (
    // <EditorWrapper>
      <Grid container sx={{mt:3}} spacing={4} className='match-height'>       
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid item xs={12} sm={12} sx={{display:'flex', justifyContent:'space-between'}}>
                <Grid item xs={12} sm={4} mb={5}>
                    <CustomTextField select fullWidth label='Department Transfer' defaultValue='0'>
                      <MenuItem value='0'>Select Department</MenuItem>
                      <MenuItem value='pending'>Developer</MenuItem>
                      <MenuItem value='active'>QA</MenuItem>
                      <MenuItem value='inactive'>Support</MenuItem>
                    </CustomTextField>
                </Grid>
                <Grid item xs={12} sm={4} mb={5}>
                    <CustomTextField select fullWidth label='Assignee Transfer' defaultValue='0'>
                      <MenuItem value='0'>Select Assignee</MenuItem>
                      <MenuItem value='pending'>Shubham</MenuItem>
                      <MenuItem value='active'>Vinod</MenuItem>
                      <MenuItem value='inactive'>Swati</MenuItem>
                    </CustomTextField>
                </Grid> 
              </Grid>             
              {/* <EditorControlled/> */}
              <div className='flex items-center justify-end gap-4'>
                <Button variant='contained' type='submit'>
                  Save
                </Button>
                <Button variant='tonal' color='error' type='reset' onClick={(e) => e.preventDefault()}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>        
        </Grid>
        
      </Grid>
    // </EditorWrapper>
  )
}

export default TransferTabView;
