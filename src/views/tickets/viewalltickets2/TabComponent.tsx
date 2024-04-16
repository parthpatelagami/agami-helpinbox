import { TabPanel } from '@mui/lab'

import TableServerSide from './TableServerSide'
import { data } from './ViewAllTicketData'
import ReplyPage from '../reply/replypage1/ReplyPage'

const TabComponent = (props: any) => {
  return (
    <>
      <TabPanel value='1'>
        <TableServerSide tableData={data} />
      </TabPanel>
      {props.incremntTab.length > 1 &&
        props.incremntTab.map((tabValue: number) => (
          <TabPanel value={tabValue.toString()}>{tabValue !== 1 && <ReplyPage />}</TabPanel>
        ))}

      {/* <TabPanel value="2">
                <FormLayoutsBasic />
            </TabPanel>
            <TabPanel value="3">
                <FormLayoutsBasic />
            </TabPanel> */}
    </>
  )
}

export default TabComponent
