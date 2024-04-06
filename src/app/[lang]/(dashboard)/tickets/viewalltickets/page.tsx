import TabsLayout from '@/views/tickets/viewalltickets/TabsLayout'
import { Grid } from '@mui/material'

export default function Page() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TabsLayout />
      </Grid>
    </Grid>
  )
}
