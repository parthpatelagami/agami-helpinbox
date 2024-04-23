'use client'

// React Imports
import { useState } from 'react'
import type { SyntheticEvent } from 'react'

// Next Imports
import dynamic from 'next/dynamic'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import type { Theme } from '@mui/material/styles'
import { useColorScheme, useTheme } from '@mui/material/styles'
import { Button, Grid, Accordion, AccordionDetails, AccordionSummary, InputAdornment} from '@mui/material';

// Third Party Imports
import classnames from 'classnames'
import type { ApexOptions } from 'apexcharts'

import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { rgbaToHex } from '@/utils/rgbaToHex';
import CustomTextField from '@core/components/mui/TextField';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

type TabCategory = 'email' | 'SMS' | 'In App' | 'Firebase'

type TabType = {
  type: TabCategory
  avatarIcon: string
}

// Vars
const tabData: TabType[] = [
  {
    type: 'email',
    avatarIcon: 'custom-email-icon',
  },
  {
    type: 'SMS',
    avatarIcon: 'custom-sms-icon',
    
  },
  {
    type: 'In App',
    avatarIcon: 'custom-app-icon',
    
  },
  {
    type: 'Firebase',
    avatarIcon: 'custom-firebase-icon',
  },
  
]

const userdata = [
  {
    title: 'Agent',
    value: '2,459',
    avatarIcon: 'tabler-users',
    avatarColor: 'primary',
    subTitle: 'Total User'
  },
  {
    title: 'Super Users',
    value: '459',
    avatarIcon: 'tabler-users',
    avatarColor: 'primary',
    subTitle: 'Total User'
  },
  {
    title: 'Customer',
    value: '21,459',
    avatarIcon: 'tabler-users',
    avatarColor: 'primary',
    subTitle: 'Total User'
  }
]

const renderTabs = (value: TabCategory) => {
  return tabData.map((item, index) => (
    <Tab
      key={index}
      value={item.type}
      className='mie-4 flex justify-between'
      label={
        <div
          className={classnames(
            'flex flex-col items-center justify-center gap-2 is-[210px] bs-[100px] border rounded-xl',
            item.type === value ? 'border-solid border-[var(--mui-palette-primary-main)]' : 'border-dashed'
          )}
        >
          <CustomAvatar variant='rounded' skin='light' size={40} {...(item.type === value && { color: 'primary' })}>
            <i className={classnames('text-[25px]', { 'text-textSecondary': item.type !== value }, item.avatarIcon)} />
          </CustomAvatar>
          <Typography className='font-medium capitalize' color='text.primary'>
            {item.type}
          </Typography>
        </div>
      }
    />
  ))
}


const renderTabPanels = (value: TabCategory, theme: Theme, options: ApexOptions, colors: string[]) => {
  return tabData.map((item, index) => {

    return (
      <TabPanel key={index} value={item.type} className='!p-0'>
        <Grid container spacing={6}>
          <Grid key={index} item xs={12} md={12} lg={3} >
            <Card className='h-full'>              
                <div className='w-full'>
                  <Stack spacing={2} className='grid gap-y-2'>
                    <Accordion defaultExpanded className='border rounded m-2'>
                      <AccordionSummary id='panel-header-1' aria-controls='panel-content-1'>
                        <Typography>New Ticket Alert</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {/* <Stack direction='row' spacing={3}>
                          <Item elevation={0}></Item>
                        </Stack> */}
                      </AccordionDetails>
                    </Accordion>
                    <Accordion className='border rounded m-2'>
                      <AccordionSummary id='panel-header-1' aria-controls='panel-content-1'>
                        <Typography>New Reply</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        
                      </AccordionDetails>
                    </Accordion>
                    <Accordion className='border rounded m-2'>
                      <AccordionSummary id='panel-header-1' aria-controls='panel-content-1'>
                        <Typography>Escalation</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        
                      </AccordionDetails>
                    </Accordion>
                    <Accordion className='border rounded m-2'>
                      <AccordionSummary id='panel-header-2' aria-controls='panel-content-2'>
                        <Typography>SLA</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        
                      </AccordionDetails>
                    </Accordion>
                    <Accordion className='border rounded m-2'>
                      <AccordionSummary id='panel-header-3' aria-controls='panel-content-3'>
                        <Typography>Reminder</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        
                      </AccordionDetails>
                    </Accordion>
                    <Accordion className='border rounded m-2'>
                      <AccordionSummary id='panel-header-4' aria-controls='panel-content-4'>
                        <Typography>Resolve to close status</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        
                      </AccordionDetails>
                    </Accordion>
                    <Accordion className='border rounded m-2'>
                      <AccordionSummary id='panel-header-4' aria-controls='panel-content-4'>
                        <Typography>New Customer Added</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        
                      </AccordionDetails>
                    </Accordion>
                    <Accordion className='border rounded m-2'>
                      <AccordionSummary id='panel-header-4' aria-controls='panel-content-4'>
                        <Typography>Ticket Status change</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        
                      </AccordionDetails>
                    </Accordion>
                    <Accordion className='border rounded m-2'>
                      <AccordionSummary id='panel-header-4' aria-controls='panel-content-4'>
                        <Typography>Ticket Transfer Report</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        
                      </AccordionDetails>
                    </Accordion>
                   
                  </Stack>                  
                </div>
              
            </Card>
          </Grid>
          <Grid key={index} item xs={12} md={12} lg={6}>
            <Card className='h-full'>
              <CardContent className='h-full'>
                <div className='flex flex-wrap justify-between gap-1'>
                {
                  userdata.map((item, index)=>(
                    <Grid key={index} className='' item xs={12} sm={5} lg={3} md={3}>
                      <Card>
                        <CardContent className='flex justify-between gap-1'>
                          <div className='flex flex-col gap-1 flex-grow'>
                            <Typography color='text.primary'>{item.title}</Typography>
                            <div className='flex items-center gap-2 flex-wrap'>
                              <Typography variant='h4'>{item.value}</Typography>
                              
                            </div>
                            <Typography variant='body2'>{item.subTitle}</Typography>
                          </div>
                          <CustomAvatar color='primary' skin='light' variant='rounded' size={42}>
                            <i className={classnames('tabler-users', 'text-[26px]')} />
                          </CustomAvatar>
                        </CardContent>
                      </Card>
                    </Grid>
                  )

                  )
                }
                </div>
                <div className='flex my-4 flex-col justify-between'>
                  <div className=''>
                    <Typography className='font-medium capitalize mb-2' color='text.primary'>Specific User :-</Typography>
                    <CustomTextField
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
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid key={index} item xs={12} md={12} lg={3}>
            <Card className='h-full'>
              <CardContent className='h-full'>
                <div className='grid gap-y-4'>
                  <div className='flex items-center justify-between'>
                    <p className='font-bold'>To :- </p>
                    <div className=''>
                      <CustomTextField/>
                    </div>
                  </div>
                  <div className='flex  items-center justify-between'>
                    <p className='font-bold'>CC :- </p>
                    <div>
                      <CustomTextField/>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <p className='font-bold'>BCC :- </p>
                    <div>
                      <CustomTextField/>
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
        <div className='flex items-center md:justify-end sm:justify-center mt-3 gap-4'>
            <Button variant='tonal' color='error' type='reset'>Cancel</Button>
            <Button variant='contained' type='submit'>Save</Button>
        </div>
      </TabPanel>
    )
  })
}

const TicketAlerts = () => {
  // States
  const [value, setValue] = useState<TabCategory>('email')

  // Hooks
  const theme = useTheme()
  const { mode } = useColorScheme()

  // Vars
  
  const disabledText = rgbaToHex(`rgb(${theme.palette.primary.mainChannel} / 0.4)`)

  const handleChange = (event: SyntheticEvent, newValue: TabCategory) => {
    setValue(newValue)
  }

  const colors = Array(9).fill(rgbaToHex(`rgb(${theme.palette.primary.mainChannel} / 0.16)`))

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        distributed: true,
        columnWidth: '33%',
        borderRadiusApplication: 'end',
        dataLabels: { position: 'top' }
      }
    },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: {
      offsetY: -11,
      formatter: val => `${val}k`,
      style: {
        fontWeight: 500,
        colors: [rgbaToHex(`rgb(${theme.palette.primary.mainChannel}/ 0.9)`)],
        fontSize: theme.typography.body1.fontSize as string
      }
    },
    colors,
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    grid: {
      show: false,
      padding: {
        top: -19,
        left: -4,
        right: 0,
        bottom: -11
      }
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { color: rgbaToHex(`rgb(12/ 0.12)`) },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      labels: {
        style: {
          colors: disabledText,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize as string
        }
      }
    },
    yaxis: {
      labels: {
        offsetX: -18,
        formatter: val => `$${val}k`,
        style: {
          colors: disabledText,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize as string
        }
      }
    },
    responsive: [
      {
        breakpoint: 1450,
        options: {
          plotOptions: {
            bar: { columnWidth: '45%' }
          }
        }
      },
      {
        breakpoint: 600,
        options: {
          dataLabels: {
            style: {
              fontSize: theme.typography.body2.fontSize as string
            }
          },
          plotOptions: {
            bar: { columnWidth: '58%' }
          }
        }
      },
      {
        breakpoint: 500,
        options: {
          plotOptions: {
            bar: { columnWidth: '70%' }
          }
        }
      }
    ]
  }

  return (
    <Card className='h-full'>      
      <CardContent sx={{
          '.mui-1pyy021-MuiTabs-flexContainer': {
            display: 'flex',
            justifyContent: 'space-between',
          }
        }}>
        <TabContext value={value}>          
          <TabList
            variant='scrollable'
            scrollButtons='auto'
            onChange={handleChange}
            aria-label='earning report tabs'
            className='!border-0 mbe-5'
            sx={{
              '& .MuiTabs-indicator': { display: 'none !important' },
              '& .MuiTab-root': { padding: '0 !important', border: '0 !important' }
            }}
          >           
            {renderTabs(value)}
            
          </TabList>
          <div className='border rounded h-full'>
            <CardContent className='py-3 h-full'>
              <FormControlLabel value='start' label='Enable' labelPlacement='start' className='gap-6 px-2' control={<Switch defaultChecked />} />
              
              {renderTabPanels(value, theme, options, colors)}
            </CardContent>
          </div>
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default TicketAlerts
