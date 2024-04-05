// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import ReplyViewMain from './ReplyViewMain'

const ReplyPage = () => {
  return (
    <Grid container spacing={6}>      
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <ReplyViewMain />
      </Grid>
    </Grid>
  )
}

export default ReplyPage
