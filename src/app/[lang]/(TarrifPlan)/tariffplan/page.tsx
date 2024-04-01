import { Grid } from '@mui/material'
import React from 'react'
import TarrifPlanForm from '@views/tariff-plan/TariffPlanForm'

export default function index() {
  return (
    <Grid item xs={12}>
      <TarrifPlanForm />
    </Grid>
  )
}
