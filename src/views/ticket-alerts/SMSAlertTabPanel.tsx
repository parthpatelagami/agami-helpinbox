'use client'

// React Imports
import { useState, DragEvent, useEffect } from 'react'
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
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
// Third Party Imports
import classnames from 'classnames'
import CustomAvatar from '@core/components/mui/Avatar'
import { UserData, AlertNameData } from '@core/components/ticket-alertdata'
// Util Imports
import CustomTextField from '@core/components/mui/TextField';
import { styled } from '@mui/material/styles';
import UserListGet from './UserListGet'
import { UserDataType } from '@/types/ticketAlertType';
import CountrySelect from './CountrySelect';

const Step = styled(MuiStep)<StepProps>({
  '&.Mui-completed .step-title , &.Mui-completed .step-subtitle': {
    color: 'var(--mui-palette-text-primary)'
  }
})

type TabCategory = 'email' | 'SMS' | 'In App' | 'Firebase'

type SMSAlertTabPanelProps = {
  value: TabCategory; 
  theme: Theme; 
  colors: string[];
  enable?: boolean;
}

const SMSAlertTabPanel:React.FC<SMSAlertTabPanelProps> = (props) => {
    
    const [activeStep, setActiveStep] = useState<number>(0)
    const [toUser, setTouser] = useState<Object[]>([]);
    const [data, setData] = useState<UserDataType[] | undefined | any>([]);

    useEffect(()=>{
      setData(UserData);   
    },[])

    const handleDragStart = (e: DragEvent<HTMLDivElement>, item: { title:any, value:any, id:any, index: number }) => {
      e.dataTransfer.setData('text/plain', JSON.stringify({ id: item.id, title: item.title, value: item.value }))
      e.dataTransfer.setData('index', item.index.toString())
    }
 ;
    const onDrop = (e: DragEvent<HTMLDivElement>) => {
      const fieldtitle = JSON.parse(e.dataTransfer?.getData('text/plain')) || ''
      const index = parseInt(e.dataTransfer?.getData('index') || '')
      setTouser((prevUsers) => [...prevUsers, fieldtitle]);
      const newFields = [...data]
      newFields.splice(index, 1)
      setData(newFields)     
    }
  
    const onDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    }

    const handleDelete = (key:any) => () => {
      const newFields = [...data]
      newFields.push(key)
      setData(newFields)
      setTouser(prevUsers => prevUsers.filter((user:any) => user.id !== key.id));
    }

    
    return (
      <CardContent className='py-3 h-full'>
          <FormControlLabel value='start' label='Enable' labelPlacement='start' className='gap-6 pb-4 px-2' control={<Switch defaultChecked={false} />} />
          <TabPanel key={1} value={props.value} className='!p-0'>
            <Grid container spacing={6}>
              <Grid key={1} item xs={12} md={12} lg={2} >
                <Card className='h-full'>  
                <CardContent>           
                  <StepperWrapper>
                    <Stepper
                      activeStep={activeStep}
                      orientation='vertical'
                      connector={<></>}
                      className='flex flex-col gap-4'
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
                    <div className='flex flex-wrap flex-row justify-between gap-2'>
                    {
                      data && data.map((item:any, index:number)=>(
                        <Grid key={index} className='' item xs={12} sm={5} lg={3} md={3}>
                          <Card className='cursor-move'>                        
                          <div draggable onDragStart={e => handleDragStart(e, {...item, index})} className=''>                               
                            <div key={index} className='flex justify-between  w-full p-4 pl-2' >
                              <Typography color='text.primary' className='text-sm'>{item.title}</Typography>                                 
                              <p className='pt-[1.5px] text-sm font-bold'>
                                {item.title === 'Agent'
                                  ? item.value
                                  : item.title === 'Superusers'
                                    ? item.value
                                    : item.title === 'Customer' 
                                    ? item.value : ''
                                      }
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
                        <Typography className='font-medium capitalize mb-2' color='text.primary'>Specific User</Typography>
                        <UserListGet  data={data} setData={setData}/>
                        {/* <CountrySelect/> */}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid key={3} item xs={12} md={12} lg={4}>
                <Card className='h-full'>
                  <CardContent className='h-full'>
                    <div className='grid gap-y-4'>
                    <div 
                       
                       className='flex items-center flex-wrap flex-col md:flex-row sm:flex-row lg:flex-row justify-between'
                       onDrop={e => onDrop(e)}
                       onDragOver={e => onDragOver(e)}

                     >
                       <p className='font-bold w-1/6'>To :- </p>
                       <div  className={`box-border flex flex-wrap gap-3 rounded sm:w-5/6 md:w-5/6 lg:w-5/6 w-full ${toUser.length >0 ? 'p-2' : 'p-4'} border-2 whitespace-normal break-words`} >
                         {
                           toUser.length > 0 && toUser.map((item:any, index)=> <Chip className='text-wrap'
                           key={index}
                           label={`${item.title} - [ ${item.value} ]`}
                           avatar={<Avatar src='/images/avatars/1.png' alt='' />}
                           onDelete={handleDelete(item)}
                         />  ) 
                         }
                       </div>
                     </div>
                    </div>
                  
                    {/* <div className='grid mt-4'>
                      <CustomTextField
                        multiline
                        rows={10}
                      />
                    </div> */}
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

export default SMSAlertTabPanel;
