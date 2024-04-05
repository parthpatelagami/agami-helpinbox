// ** React Imports
import { SyntheticEvent, useState, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiTab, { TabProps } from '@mui/material/Tab'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import CircularProgress from '@mui/material/CircularProgress'

// ** Demo Components Imports
import ReplyTabView from './ReplyTabView';
import TransferTabView from './TransferTabView';
import TicketFieldView from './TicketFieldView'
import HistoryTabView from './HistoryTabView';
import RelatedTicketView from './RelatedTicketView';
import ChildTicketView from './ChildTicketView'
import JiraMainTabView from './Jira/JiraMainTabView'
// ** Types
// import { InvoiceType } from 'src/types/apps/replypagetype'
import { Card, CardContent, Divider, Grid } from '@mui/material'

interface Props {
  invoiceData: []
}

// ** Styled Tab component
const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1)
  }
}))

// const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
//   borderBottom: '0 !important',
//   '&, & .MuiTabs-scroller': {
//     boxSizing: 'content-box',
//     padding: theme.spacing(1.25, 1.25, 2),
//     margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
//   },
//   '& .MuiTabs-indicator': {
//     display: 'none'
//   },
//   '& .Mui-selected': {
//     boxShadow: theme.shadows[2],
//     backgroundColor: theme.palette.primary.main,
//     color: `${theme.palette.common.white} !important`
//   },
//   '& .MuiTab-root': {
//     lineHeight: 0,
//     borderRadius: theme.shape.borderRadius,
//     '&:hover': {
//       color: theme.palette.primary.main
//     }
//   }
// }))
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
    <Grid>
      <Typography variant='subtitle1'>Description </Typography> 
      <Box
        sx={{
          p: 5,
          display: 'flex',
          borderRadius: 1,
          flexDirection: 'column',
          backgroundColor: 'action.selected',
          mb: 5
        }}
      >
        <Typography sx={{ mb: 2 }} variant='h6'>
          Buying gift for a loved one?
        </Typography>
        <Typography sx={{ mb: 2, color: 'text.secondary' }}>
          Gift wrap and personalized message on , Only for $2.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
          Dolorum minima possimus nisi laudantium! Aperiam earum ipsum velit impedit, 
          illum asperiores tempora alias similique dignissimos ea maiores. Assumenda sunt libero qui.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Quam possimus voluptatem ab nemo pariatur, 
          quae dicta optio id labore eos fugiat facere delectus libero consequuntur quos aliquid ducimus assumenda molestias?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Quo explicabo dolor rem eum quisquam sapiente ipsam, 
          unde eveniet! Nihil a in impedit tempora hic libero veritatis architecto perferendis porro maxime?
        </Typography>
        <Typography sx={{ mb: 2, color: 'text.secondary' }}>
          Gift wrap and personalized message on , Only for $2.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
          Dolorum minima possimus nisi laudantium! Aperiam earum ipsum velit impedit, 
          illum asperiores tempora alias similique dignissimos ea maiores. Assumenda sunt libero qui.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Quam possimus voluptatem ab nemo pariatur, 
          quae dicta optio id labore eos fugiat facere delectus libero consequuntur quos aliquid ducimus assumenda molestias?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Quo explicabo dolor rem eum quisquam sapiente ipsam, 
          unde eveniet! Nihil a in impedit tempora hic libero veritatis architecto perferendis porro maxime?
        </Typography>
      </Box>   
      <Divider sx={{mb:7, mt:7}}/>  
      
      <TabContext value={activeTab}>
        <TabList
          variant='scrollable'
          scrollButtons='auto'
          onChange={handleChange}
          aria-label='simple tabs example'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab value='reply' label='Comments' />
          <Tab value='transfer' label='Transfer'/>
          <Tab value='related-ticket' label='Related Tickets'/>
          <Tab value='ticket-field' label='Ticket Field'  />
          <Tab value='child-ticket' label='Child Tickets' />
          <Tab value='history' label='History' />
          <Tab value='jira' label='Jira' />        
        </TabList>
        <Box sx={{ mt: 2 }}>
          {isLoading ? (
            <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <CircularProgress sx={{ mb: 4 }} />
              <Typography>Loading...</Typography>
            </Box>
          ) : (
            <>
              <TabPanel sx={{ p: 0 }} value='reply'>
                <ReplyTabView />
                {/* <ConversationView/> */}
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value='transfer'>
                <TransferTabView />
                
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value='related-ticket'>
                <RelatedTicketView />
                
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value='ticket-field'>
                <TicketFieldView />
                
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value='child-ticket'>
                <ChildTicketView />
                
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value='history'>
                <HistoryTabView/>
                
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value='jira'>
                <JiraMainTabView/>
              </TabPanel>
            </>
          )}
        </Box>
      </TabContext>
    </Grid>
  )
}

export default ReplyViewRight
