'use client'

// React Imports
import { useState } from 'react'
import type { SyntheticEvent } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import { useColorScheme, useTheme } from '@mui/material/styles'
import { Button} from '@mui/material';

// Third Party Imports
import classnames from 'classnames'
import CustomAvatar from '@core/components/mui/Avatar'
import { UserData, AlertNameData } from '@core/components/ticket-alertdata'
// Util Imports
import { rgbaToHex } from '@/utils/rgbaToHex';
import { styled } from '@mui/material/styles';
import EmailAlertTabPanel from './EmailAlertTabPanel';
import SMSAlertTabPanel from './SMSAlertTabPanel';
import AppAlertTabPanel from './AppAlertTabPanel';

type TabCategory = 'email' | 'SMS' | 'In App' | 'Firebase'

type TabType = {
  type: TabCategory
  avatarIcon: string
  enable?: boolean
}

// Vars
const tabData: TabType[] = [
  {
    type: 'email',
    avatarIcon: 'custom-email-icon',
    enable: true
  },
  {
    type: 'SMS',
    avatarIcon: 'custom-sms-icon',
    enable: true
  },
  {
    type: 'In App',
    avatarIcon: 'custom-app-icon',
    enable: false
  },
  {
    type: 'Firebase',
    avatarIcon: 'custom-firebase-icon',
    enable: true
  },
  
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
            'flex flex-col items-center justify-center gap-2 is-[170px] bs-[80px] border rounded-xl',
            item.type === value ? 'border-2 border-[var(--mui-palette-primary-main)]' : 'border'
          )}
        >
          <CustomAvatar variant='rounded' skin='light' size={35} {...(item.type === value && { color: 'primary' })}>
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

const TicketAlerts = () => {
  // States
  const [value, setValue] = useState<TabCategory>('email')

  // Hooks
  const theme = useTheme()
  const { mode } = useColorScheme();
  const handleChange = (event: SyntheticEvent, newValue: TabCategory) => {
    setValue(newValue)
  }

  const colors = Array(9).fill(rgbaToHex(`rgb(${theme.palette.primary.mainChannel} / 0.16)`))

  return (
    <Card className='h-full'>      
      <CardContent sx={{
          '.mui-1pyy021-MuiTabs-flexContainer': {
            display: 'flex',
            justifyContent: 'center',
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
          <div className='border rounded'>
            {
              value === 'email' && <EmailAlertTabPanel value={value}  theme={theme} colors={colors}/>
            }                            
            {
              value === 'SMS' && <SMSAlertTabPanel value={value}  theme={theme} colors={colors} />
            } 
            {
              value === 'In App' && <AppAlertTabPanel value={value}  theme={theme} colors={colors}/>
            } 
            {
              value === 'Firebase' && <h1>Hello Firebase</h1>
            }              
          </div>
          <div className='flex items-center md:justify-end sm:justify-center mt-3 gap-4'>
            <Button variant='tonal' color='error' type='reset'>Cancel</Button>
            <Button variant='contained' type='submit'>Save</Button>
          </div>
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default TicketAlerts
