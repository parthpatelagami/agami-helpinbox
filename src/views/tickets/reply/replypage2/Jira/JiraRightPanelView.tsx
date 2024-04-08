import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CustomTextField from '@core/components/mui/TextField'
import { useState, SyntheticEvent } from 'react'
import Grid, { GridProps } from '@mui/material/Grid'
// import { UsersType } from 'src/types/apps/Usertypes'
// import Icon from 'src/@core/components/icon'
import { styled, useTheme } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'

// ** MUI Imports
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { Divider } from '@mui/material'
import CustomChip from '@core/components/mui/Chip'


const collaboratorsdata = [
  {
    email:'pangaleshubham10@gmail.com'
  },
  {
    email:'pangaleshubham@gmail.com'
  },
  {
    email:'pangale@gmail.com'
  },
  {
    email:'patelparthkumar@gmail.com'
  },
  {
    email:'suvareravikala12222@gmail.com'
  }
]
const data = {
    id: 1,
    date: '2024-03-13 12:11:09 PM',
    status: 'active',
    username: 'Shubham',
    avatarColor: 'primary',
    country: 'El Salvador',
    company: 'Yotz PVT LTD',
    billing: 'Manual - Cash',
    contact: '+91-8909909090',
    currentPlan: 'enterprise',
    fullName: 'Shubham Pangale',
    email: 'shubham.pangale@agami-tech.com',
    avatar: '/images/avatars/14.png'
  }

  // import { makeStyles } from '@material-ui/core';
  // const useStyles = makeStyles({
  //   customTextField: {
  //     '& .MuiInputBase-input:not(textarea).MuiInputBase-inputSizeSmall': {
  //       fontWeight: 'bolder',
  //       color: 'aliceblue',
  //       fontSize: '15px',
  //     },
  //   },
  // });

const JiraRightPanelView = ()=>{

    // const classes = useStyles();
   
    const theme = useTheme();
    const [expanded, setExpanded] = useState<string | false | true>(true)
    const [expanded1, setExpanded1] = useState<string | false | true>(true)
  
    const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      if(panel === "panel1"){
        setExpanded(isExpanded ? true : false)
      }
      if(panel === "panel2"){
        setExpanded1(isExpanded ? true : false)
      }
     
    }
    
    return(
      <Grid item sm={12} xs={12} md={12}>
        <CardContent> 
          <Grid item md={12} sm={12} xs={12} className='gap-2 flex items-center mb-5' >
            <Typography variant='subtitle1'>Status:- </Typography>           
            <CustomChip label="To Do" color="primary"/>
          </Grid>            
          <Box sx={{ pt: 1 }}>
            <Box sx={{ display: 'flex', mb: 4, alignItems:{md:'unset', sm:'center', xs:'unset'}, flexDirection:{md:'column', sm:'row', xs:'column'} }}>                 
                <Typography sx={{ color: 'text.secondary', mr: 2, fontWeight: 800 }}>Assignee: </Typography>    
                <Box sx={{ display: 'flex', alignItems:'center'}}>
                  <Avatar alt='Avatar' src='/images/avatars/1.png' sx={{ width: 30, height: 30, mr: 1 }} />
                  <Typography sx={{ color: 'text.secondary' }}>{data.fullName}</Typography>
                </Box>                
            </Box>
            <Box sx={{ display: 'flex', mb: 4, alignItems:{md:'unset', sm:'center', xs:'unset'}, flexDirection:{md:'column', sm:'row', xs:'column'} }}>                 
                <Typography sx={{ color: 'text.secondary', mr: 2, fontWeight: 800 }}>Reporter: </Typography>    
                <Box sx={{ display: 'flex', alignItems:'center'}}>
                  <Avatar alt='Avatar' src='/images/avatars/1.png' sx={{ width: 30, height: 30, mr: 1 }} />
                  <Typography sx={{ color: 'text.secondary' }}>{data.fullName}</Typography>
                </Box>                
            </Box>             
            <Box sx={{ display: 'flex', mb: 4, alignItems:{md:'unset', sm:'center', xs:'unset'}, flexDirection:{md:'column', sm:'row', xs:'column'} }}>
              <Typography sx={{ mr: 2, color: 'text.secondary', fontWeight: 800 }}>Due date:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>2024-03-13 12:11:09 PM</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 4, alignItems:{md:'unset', sm:'center', xs:'unset'}, flexDirection:{md:'column', sm:'row', xs:'column'}  }}>
                <Typography sx={{ mr: 2, color: 'text.secondary', fontWeight: 800 }}>Priority:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>High</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 4, alignItems:{md:'unset', sm:'center', xs:'unset'}, flexDirection:{md:'column', sm:'row', xs:'column'} }}>                 
                <Typography sx={{ color: 'text.secondary', mr: 2, fontWeight: 800 }}>Suport Reporter: </Typography>    
                <Box sx={{ display: 'flex', alignItems:'center'}}>
                  <Avatar alt='Avatar' src='/images/avatars/2.png' sx={{ width: 30, height: 30, mr: 1 }} />
                  <Typography sx={{ mr: 2, color: 'text.secondary' }}>Parth Patel</Typography>
                </Box>                
            </Box>                   
          </Box>            
        </CardContent>        
      </Grid>
    )
}
export default JiraRightPanelView;