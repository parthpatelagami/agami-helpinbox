'use client'
// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'
import CardContent from '@mui/material/CardContent'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'
import Button from '@mui/material/Button'

import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@core/components/mui/TextField'

interface Props {
  invoiceData: []
}

const TransferTabView = () => {
  const theme = useTheme();
  return (
    // <EditorWrapper>         
        <Grid item xs={12}>
          <Card className=''>
            <CardContent className=''>
              <Grid item xs={12} sm={12} className='flex justify-between'>
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
              <CustomTextField
                id='invoice-note'
                rows={6}
                fullWidth
                multiline
                className='border rounded'
                placeholder='Enter The Reason'
                defaultValue=''
              />
              <div className='flex items-center justify-end gap-4 py-3'>
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
        
    // </EditorWrapper>
  )
}

export default TransferTabView;
