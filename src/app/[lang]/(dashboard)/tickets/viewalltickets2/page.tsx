'use client'

import { Grid } from '@mui/material'

import TabsLayout from '@/views/tickets/viewalltickets2/TabsLayout'

export default function Page() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TabsLayout />
      </Grid>
    </Grid>
  )
}
