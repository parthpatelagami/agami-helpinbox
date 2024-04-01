// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TarrifPlanTable from './TariffPlanDataTable'

const TariffData = [
  {
    Tarrif_Plan_Name: 'Basic Plan',
    Country: 'India',
    Currency: 'Rupee',
    Amount: '10,000',
    Duration: 'Montly'
  },
  {
    Tarrif_Plan_Name: 'Pro Plan',
    Country: 'India',
    Currency: 'Rupee',
    Amount: '25,000',
    Duration: 'Montly'
  },
  {
    Tarrif_Plan_Name: 'Essential Plan',
    Country: 'India',
    Currency: 'Rupee',
    Amount: '20,000',
    Duration: 'Montly'
  }
]

const Roles = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TarrifPlanTable tableData={TariffData} />
      </Grid>
    </Grid>
  )
}

export default Roles
