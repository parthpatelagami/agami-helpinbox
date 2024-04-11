'use client'
// ** React Imports
import { SyntheticEvent, useState, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiTab, { TabProps } from '@mui/material/Tab'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import CircularProgress from '@mui/material/CircularProgress'

// ** Demo Components Imports
import RelatedTicketView from './RelatedTicketView'
import ReplyTabView from './ReplyTabView'
import TransferTabView from './TransferTabView'
import ChildTicketView from './ChildTicketView'
import TextFieldView from './TextFieldView'
import ConversationView from './ConversationView'
import HistoryTabView from './HistoryTabView'
import JiraMainTabView from './Jira/JiraMainTabView'
// ** Types
// import { InvoiceType } from 'src/types/apps/replypagetype'

interface Props {
  invoiceData: [];
}

// ** Styled Tab component
const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1)
  }
}))


const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    // boxShadow: theme.shadows[0],
    backgroundColor: `${theme.palette.common.white} !important`,
    color: `${theme.palette.primary.main} !important`,
    borderTop: '3px solid !important',
    borderLeft: '1px solid !important',
    borderRight: '1px solid !important',
  },
  '& .MuiTab-root': {
    lineHeight: 0,
    // borderRadius: theme.shape.borderRadius,
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white}`,
    '&:hover': {
      color: `${theme.palette.primary.main}`,
      backgroundColor: theme.palette.common.white,
    }
  }
}))
const tab = 'reply'
const ReplyViewRight = ({ invoiceData }: Props) => {
  // ** State
  const [activeTab, setActiveTab] = useState<string>(tab)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // ** Hooks
  // const router = useRouter()

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  useEffect(() => {
    if (invoiceData) {
      setIsLoading(false)
    }
  }, [invoiceData])

  return (
    <TabContext value={activeTab}>
      <TabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleChange}
        aria-label='forced scroll tabs example'
        // sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        className='border-none'
      >
        <Tab className='me-2' value='reply' label='Reply' />
        <Tab className='me-2' value='transfer' label='Transfer'/>
        <Tab className='me-2' value='related-ticket' label='Related Tickets'/>
        <Tab className='me-2' value='ticket-field' label='Ticket Field'  />
        <Tab className='me-2' value='child-ticket' label='Child Tickets' />
        <Tab className='me-2' value='history' label='History' />
        <Tab className='me-2' value='jira' label='Jira' />        
      </TabList>
      <div className=''>
        {isLoading ? (
          <div className='mt-6 flex items-center flex-col'>
            <CircularProgress className='mb-4'/>
            <Typography>Loading...</Typography>
          </div>
        ) : (
          <>
            <TabPanel value='reply'>
              <ReplyTabView />
              <ConversationView/>
            </TabPanel>
            <TabPanel value='transfer'>
              <TransferTabView />
              <ConversationView/>
            </TabPanel>
            <TabPanel value='related-ticket'>
              <RelatedTicketView />
              <ConversationView/>
            </TabPanel>
            <TabPanel value='ticket-field'>
              <TextFieldView />
              <ConversationView/>
            </TabPanel>
            <TabPanel value='child-ticket'>
              <ChildTicketView />
              <ConversationView/>
            </TabPanel>
            <TabPanel value='history'>
              <HistoryTabView/>
              <ConversationView/>
            </TabPanel>
            <TabPanel value='jira'>
              <JiraMainTabView />
              <ConversationView/>
            </TabPanel>
          </>
        )}
      </div>
    </TabContext>
  )
}

export default ReplyViewRight
