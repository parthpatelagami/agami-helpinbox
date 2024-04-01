// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const DashboardCRM = () => {
  // Vars
  const serverMode = getServerMode()

  return (
    <Grid container spacing={6}>
      Dashboard
    </Grid>
  )
}

export default DashboardCRM
