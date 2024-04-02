import TarrifPlanForm from '@/views/tariff-plan/TariffPlanForm'
import Grid from '@mui/material/Grid'
import React from 'react'

export default function Page() {
  const defaultValues = {
    tarrif_plan_name: 'xyz',
    currency_id: '1',
    country_id: '1',
    total_amount: '10000',
    duration: '1',
    CopyFrom: '1',
    module_feature_right_data: [
      {
        features: {
          'Bulk Select': true
        },
        limit: 5,
        module_id: 23
      }
    ]
  }
  return (
    <Grid item xs={12}>
      <TarrifPlanForm defaultValues={defaultValues} />
    </Grid>
  )
}
