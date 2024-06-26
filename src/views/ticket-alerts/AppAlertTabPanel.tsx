'use client'

// React Imports
import { useState, DragEvent, useEffect } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch'
import { Layout, Responsive, WidthProvider } from 'react-grid-layout'
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
import UserListGet from './UserListGet';
import { title } from 'process';
import { UserDataType } from '@/types/ticketAlertType';

const Step = styled(MuiStep)<StepProps>({
  '&.Mui-completed .step-title , &.Mui-completed .step-subtitle': {
    color: 'var(--mui-palette-text-primary)'
  }
})

type TabCategory = 'email' | 'SMS' | 'In App' | 'Firebase'

type AppAlertTabPanelProps = {
  value: TabCategory; 
  theme: Theme; 
  colors: string[];
  enable?: boolean;
}


const AppAlertTabPanel:React.FC<AppAlertTabPanelProps> = (props) => {
    
    const [activeStep, setActiveStep] = useState<number>(0)
    const [data, setData] = useState<UserDataType[] | undefined | any>([]);
    const [toUser, setTouser] = useState<Object[]>([]);
    const [ccUser, setCcUser] = useState<Object[]>([]);
    const [bccUser, setBccUser] = useState<Object[]>([]);

    useEffect(()=>{
      setData(UserData);
    },[])

    const handleDragStart = (e: DragEvent<HTMLDivElement>, item: { title:any, value:any, id:any, index: number }) => {

      e.dataTransfer.setData('text/plain', JSON.stringify({ id: item.id, title: item.title, value: item.value }))
      e.dataTransfer.setData('index', item.index.toString())
    }
 ;
    const onDrop = (e: DragEvent<HTMLDivElement>, callfrom:any) => {
      const fieldtitle = JSON.parse(e.dataTransfer?.getData('text/plain')) || ''
      const index = parseInt(e.dataTransfer?.getData('index') || '')
      
      if (callfrom === 'TO') {
        setTouser((prevUsers) => [...prevUsers, fieldtitle]);
        const newFields = [...data]
        newFields.splice(index, 1)
        setData(newFields)  
      } else if (callfrom === 'CC') {
        setCcUser((prevUsers) => [...prevUsers, fieldtitle]);
        const newFields = [...data]
        newFields.splice(index, 1)
        setData(newFields)  
      } else if (callfrom === 'BCC') {
        setBccUser((prevUsers) => [...prevUsers, fieldtitle]);
        const newFields = [...data]
        newFields.splice(index, 1)
        setData(newFields)  
      }
    }
  
    const onDragOver = (e: DragEvent<HTMLDivElement>, callfrom:any) => {
      e.preventDefault();
    }

    const handleDelete = (chipToDelete:any, key:any) => () => {
      
      if (chipToDelete === 'TO') {
        setTouser(prevUsers => prevUsers.filter((user:any) => user.id !== key.id));
        const newFields = [...data]
        newFields.push(key)
        setData(newFields)
      } else if (chipToDelete === 'CC') {
        setCcUser(prevUsers => prevUsers.filter((user:any) => user.id !== key.id));
        const newFields = [...data]
        newFields.push(key)
        setData(newFields)
      } else if (chipToDelete === 'BCC') {        
        setBccUser(prevUsers => prevUsers.filter((user:any) => user.id !== key.id));
        const newFields = [...data]
        newFields.push(key)
        setData(newFields)
      }
    }

    return (
      <CardContent className='py-3 h-full'>
          <FormControlLabel key={1} value='start' label='Enable' labelPlacement='start' className='gap-6 px-2' control={<Switch defaultChecked={false} />} />
          <TabPanel key={2} value={props.value} className='!p-0 my-3'>
            <Grid container spacing={6}>
              <Grid key={1} item xs={12} md={12} lg={2} >
                <Card className='h-full'>  
                <CardContent >           
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
                                  <p color='text.primary' className='step-title whitespace-normal break-all'>
                                    {label.alertname}
                                  </p>
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
                      data && data.map((item:any, index:number)=>(
                        <Grid key={index} className='' item xs={12} sm={5} lg={3} md={3}> 
                          <Card className='cursor-move'>                        
                          <div draggable onDragStart={e => handleDragStart(e, {...item, index})} className=''>                               
                            <div key={index} className='flex justify-between w-full p-4 pl-2' >
                              <Typography color='text.primary' className='text-sm'>{item.title}</Typography>                                 
                              <p className='pt-[1.5px] text-sm font-bold'>
                                {item.title === 'Agent'
                                  ? item.value
                                  : item.title === 'Superusers'
                                    ? item.value
                                    :item.title === 'Customer'
                                      ? item.value
                                        : ''}
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
                        <UserListGet data={data} setData={setData}/>
                        
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
                       
                        className='flex items-start md:items-center sm:items-center lg:items-center flex-col md:flex-row sm:flex-row lg:flex-row justify-between'
                        onDrop={e => onDrop(e, 'TO')}
                        onDragOver={e => onDragOver(e, 'TO')}

                      >
                        <p className='font-bold w-1/6'>To </p>
                        <div  className={`box-border flex flex-wrap gap-3 rounded sm:w-5/6 md:w-5/6 lg:w-5/6 w-full ${toUser.length >0 ? 'p-2' : 'p-4'} border-2`} >
                          {
                            toUser.length > 0 && toUser.map((item:any, index)=> <Chip
                            key={index}
                            label={`${item.title} - [ ${item.value} ]`}
                            avatar={<Avatar src='/images/avatars/1.png' alt='' />}
                            onDelete={handleDelete('TO', item)}
                          />  ) 
                          }
                        </div>
                      </div>
                      <div 
                        className='flex items-start md:items-center sm:items-center lg:items-center flex-col md:flex-row sm:flex-row lg:flex-row justify-between'
                        onDrop={e => onDrop(e, 'CC')}
                        onDragOver={e => onDragOver(e, 'CC')}
                      >
                        <p className='font-bold w-1/6'>CC </p>
                        <div className={`box-border flex flex-wrap gap-3 rounded sm:w-5/6 md:w-5/6 lg:w-5/6 w-full ${ccUser.length > 0 ? 'p-2' : 'p-4'} border-2`}>
                          {
                            ccUser.length >0 && ccUser.map((item:any, index)=>
                              <Chip
                                key={index}
                                label={`${item.title} - [ ${item.value} ]`}
                                avatar={<Avatar src='/images/avatars/1.png' alt='' />}
                                onDelete={handleDelete('CC', item)}
                              />  
                            ) 
                          }
                        </div>
                      </div>
                      <div 
                        className='flex items-start md:items-center sm:items-center lg:items-center flex-col md:flex-row sm:flex-row lg:flex-row justify-between'
                        onDrop={e => onDrop(e, 'BCC')}
                        onDragOver={e => onDragOver(e, 'BCC')}
                        >
                        <p className='font-bold w-1/6'>BC </p>
                        <div className={`box-border flex flex-wrap gap-3 rounded sm:w-5/6 md:w-5/6 lg:w-5/6 w-full ${bccUser.length > 0 ? 'p-2' : 'p-4'} border-2`}>
                          {/* <CustomTextField/> */}
                          {/* <p className='text-md'>{bccUser}</p>
                          <p className='pt-[1.5px] text-sm'>{bccValue}</p> */}
                          {
                            bccUser.length > 0 && ( bccUser.map((item:any, index) =>
                              <Chip
                                className=''
                                key={index}
                                label={`${item.title} - [ ${item.value} ]`}
                                avatar={<Avatar src='/images/avatars/1.png' alt='' />}
                                onDelete={handleDelete("BCC", item)}
                              /> 
                            ))
                          }
                             
                        </div>
                      </div>
                    </div>
                  
                    <div className='mt-4 flex justify-center'>
                      <div></div> 
                      <div>                      
                        <svg width="270" height="240" viewBox="0 0 270 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="0.5" y="0.5" width="269" height="239" rx="7.5" stroke="#DDDDDD" stroke-dasharray="8 8"/>
                          <line x1="4.33138" y1="3.62558" x2="265.331" y2="234.626" stroke="#DDDDDD" stroke-dasharray="8 8"/>
                          <line x1="267.332" y1="2.37417" x2="3.33165" y2="236.374" stroke="#DDDDDD" stroke-dasharray="8 8"/>
                        </svg>
                      </div>  
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            
            </Grid>
            
          </TabPanel>
        </CardContent>
      )   
  }

export default AppAlertTabPanel;
