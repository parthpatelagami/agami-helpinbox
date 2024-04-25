'use client'

// React Imports
import { useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TabPanel from '@mui/lab/TabPanel'
import Typography from '@mui/material/Typography'
import type { Theme } from '@mui/material/styles'
import { useColorScheme, useTheme } from '@mui/material/styles'
import { Grid, InputAdornment} from '@mui/material';
import StepperWrapper from '@core/styles/stepper'
import type { StepProps } from '@mui/material/Step'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import MuiStep from '@mui/material/Step'

// Third Party Imports
import classnames from 'classnames'
import CustomAvatar from '@core/components/mui/Avatar'
import { UserData, AlertNameData } from '@core/components/ticket-alertdata'
// Util Imports
import CustomTextField from '@core/components/mui/TextField';
import { styled } from '@mui/material/styles';
import UserListGet from './UserListGet';

const Step = styled(MuiStep)<StepProps>({
  '&.Mui-completed .step-title , &.Mui-completed .step-subtitle': {
    color: 'var(--mui-palette-text-primary)'
  }
})

type TabCategory = 'email' | 'SMS' | 'In App' | 'Firebase'

type EmailAlertTabPanelProps = {
  value: TabCategory; 
  theme: Theme; 
  colors: string[];
  enable?: boolean;
}

const EmailAlertTabPanel:React.FC<EmailAlertTabPanelProps> = (props) => {
    
    const [activeStep, setActiveStep] = useState<number>(0)
      
    return (
      <CardContent className='py-3 h-full'>
          <FormControlLabel key={1} value='start' label='Enable' labelPlacement='start' className='gap-6 px-2' control={<Switch defaultChecked={true} />} />
          <TabPanel key={2} value={props.value} className='!p-0'>
            <Grid container spacing={6}>
              <Grid key={1} item xs={12} md={12} lg={3} >
                <Card className='h-full'>  
                <CardContent>           
                  <StepperWrapper>
                    <Stepper
                      activeStep={activeStep}
                      orientation='vertical'
                      connector={<></>}
                      className='flex flex-col gap-4 min-is-[220px]'
                    >
                      {AlertNameData.map((label, index) => {
                        return (
                          <Step key={index} onClick={() => setActiveStep(index)}>
                            <StepLabel icon={<></>} className='p-1 cursor-pointer'>
                              <div className='step-label'>
                                <CustomAvatar
                                  // variant='rounded'
                                  skin={activeStep === index ? 'filled' : 'light'}
                                  {...(activeStep >= index && { color: 'primary' })}
                                  {...(activeStep === index && { className: 'shadow-primarySm' })}
                                  size={38}
                                >
                                  <i className={classnames('custom-round-icon' as string, '!text-[22px]')} />
                                </CustomAvatar>
                                <div className='flex flex-col'>
                                  <Typography color='text.primary' className='step-title'>
                                    {label.alertname}
                                  </Typography>
                                  <Typography className='step-subtitle'>{label.alertdetails}</Typography>
                                </div>
                              </div>
                            </StepLabel>
                            
                          </Step>                      
                        )
                      })}
                    </Stepper>
                  </StepperWrapper>
                </CardContent>  
                </Card>
              </Grid>
              <Grid key={2} item xs={12} md={12} lg={6}>
                <Card className='h-full'>
                  <CardContent className='h-full'>
                    <div className='flex flex-wrap justify-between gap-2'>
                    {
                      UserData.map((item, index)=>(
                        <Grid key={index} className='' item xs={12} sm={5} lg={3} md={3}> 
                          <Card>                        
                          <div draggable='true' className=''>                               
                            <div key={index} className='flex justify-between rounded border border-solid border-gray-300 w-full p-1 pl-2' >
                              <Typography color='text.primary' className='text-sm'>{item.title}</Typography>                                 
                              <p className='pt-[1.5px] text-sm'>
                                {item.title === 'Agent'
                                  ? item.value
                                  : item.title === 'Superusers'
                                    ? item.value
                                    :item.title === 'Customer'
                                      ? item.value
                                        : 'Specific-User'}
                              </p>                                   
                            </div>
                           
                          </div>
                          </Card> 
                        </Grid>
                      )    
                      )
                    }
                    </div>
                    <div className='flex my-4 flex-col justify-between'>
                      <div className=''>
                        <Typography className='font-medium capitalize mb-2' color='text.primary'>Specific User :-</Typography>
                        <UserListGet/>
                        {/* <CustomTextField
                          fullWidth
                          placeholder='Search for users...'
                          sx={{ '& .MuiInputBase-root': { borderRadius: '30px !important' } }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start' sx={{ color: 'text.secondary' }}>
                                <i className='tabler-search' />
    
                              </InputAdornment>
                            )
                          }}
                        /> */}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid key={3} item xs={12} md={12} lg={3}>
                <Card className='h-full'>
                  <CardContent className='h-full'>
                    <div className='grid gap-y-4'>
                      <div className='flex items-start flex-col md:flex-row sm:flex-row lg:flex-row justify-between'>
                        <p className='font-bold w-1/6'>To :- </p>
                        <div className='box-border rounded h-3 sm:w-5/6 md:w-5/6 lg:w-5/6 w-full p-4 border-2'>
                          {/* <CustomTextField/> */}
                        </div>
                      </div>
                      <div className='flex items-start flex-col md:flex-row sm:flex-row lg:flex-row justify-between'>
                        <p className='font-bold w-1/6'>CC :- </p>
                        <div className='box-border rounded h-3 sm:w-5/6 md:w-5/6 lg:w-5/6 w-full p-4 border-2'>
                          {/* <CustomTextField/> */}
                        </div>
                      </div>
                      <div className='flex items-start flex-col md:flex-row sm:flex-row lg:flex-row justify-between'>
                        <p className='font-bold w-1/6'>BCC:- </p>
                        <div className='box-border rounded h-3 sm:w-5/6 md:w-5/6 lg:w-5/6 w-full p-4 border-2'>
                          {/* <CustomTextField/> */}
                        </div>
                      </div>
                    </div>
                  
                    <div className='grid mt-4'>
                      <CustomTextField
                        multiline
                        rows={10}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            
            </Grid>
            {/* <div className='flex items-center md:justify-end sm:justify-center mt-3 gap-4'>
                <Button variant='tonal' color='error' type='reset'>Cancel</Button>
                <Button variant='contained' type='submit'>Save</Button>
            </div> */}
          </TabPanel>
        </CardContent>
      )   
  }

export default EmailAlertTabPanel;
