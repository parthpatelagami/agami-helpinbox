import TarrifPlanForm from '@/views/tariff-plan/TariffPlanForm'
import Grid from '@mui/material/Grid'
import React from 'react'

export default function Page() {
  const defaultValues = {
    tarrif_plan_name: '',
    currency_id: '',
    country_id: '',
    total_amount: '',
    duration: '',
    CopyFrom: '',
    module_feature_right_data: []
  }
  return (
    <Grid item xs={12}>
      <TarrifPlanForm defaultValues={defaultValues} />
    </Grid>
  )
}
