import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Switch from '@mui/material/Switch'
import Link from '@mui/material/Link'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'
import CustomTextField from '@core/components/mui/TextField'
import { useState, SyntheticEvent } from 'react'
import Grid, { GridProps } from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import Chip from '@mui/material/Chip'
// import { UsersType } from 'src/types/apps/Usertypes'
// import Icon from 'src/@core/components/icon'
import MuiListItem, { ListItemProps } from '@mui/material/ListItem'
import { styled, useTheme } from '@mui/material/styles'
import MuiTextField, { TextFieldProps } from '@mui/material/TextField'

// ** MUI Imports
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { Divider } from '@mui/material'


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

  const CustomTextField1 = styled(MuiTextField)<TextFieldProps>(({ theme }) => ({
    '& .MuiInputBase-input:not(textarea).MuiInputBase-inputSizeSmall': {
      fontWeight: 'bolder',
      color: 'aliceblue',
      fontSize: '15px',
    },
  }))

const ReplyLeftView = ()=>{
    const [openEdit, setOpenEdit] = useState<boolean>(false)
    const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
    const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false)
    // const classes = useStyles();
    const handleEditClickOpen = () => setOpenEdit(true)
    const handleEditClose = () => setOpenEdit(false)
    const theme = useTheme();
    const [expanded, setExpanded] = useState<string | false | true>(true)
    const [expanded1, setExpanded1] = useState<string | false | true>(true)
    const [expanded2, setExpanded2] = useState<string | false | true>(true)
    const [expanded3, setExpanded3] = useState<string | false | true>(true)

    const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      if(panel === "panel1"){
        setExpanded(isExpanded ? true : false)
      }
      if(panel === "panel2"){
        setExpanded1(isExpanded ? true : false)
      }
      if(panel === "panel3"){
        setExpanded2(isExpanded ? true : false)
      }
      if(panel === "panel4"){
        setExpanded3(isExpanded ? true : false)
      }
    }
    
    return(
      <Grid item sm={12} xs={12} md={12}>
        <CardContent  sx={{ pb: 4 }}> 
          <Grid item md={12} sm={12} xs={12} className='gap-2 flex items-center mb-5' >
            <p className='text-gray-700'>Status:- </p>           
            <CustomTextField select fullWidth label='' className='rounded' sx={{backgroundColor:`${theme.palette.primary.main}`, '& .MuiInputBase-input:not(textarea).MuiInputBase-inputSizeSmall': { color: 'white', fontWeight: 'bold' } }} defaultValue='0'>
              <MenuItem value='0'>Open</MenuItem>
              <MenuItem value='pending'>Pending</MenuItem>
              <MenuItem value='active'>Resolved</MenuItem>
              <MenuItem value='inactive'>Close</MenuItem>
            </CustomTextField>
          </Grid>
          <Accordion expanded={expanded === true} sx={{mb:5}} onChange={handleChange('panel1')}>
            <AccordionSummary
              id='controlled-panel-header-1'
              aria-controls='controlled-panel-content-1'
              // expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
            >
              <Typography>Customer Details</Typography>
            </AccordionSummary>
            <Divider/>
            <AccordionDetails>
              <Box sx={{ pt: 1 }}>
                  <Box sx={{ display: 'flex', mb: 4, flexDirection:'column' }}>
                      <Box sx={{ display: 'flex', justifyContent:'space-between' }}>
                          <Typography sx={{ mr: 2, color: 'text.secondary' }}>Customer Name:</Typography>
                          <Tooltip placement='top' title='Update Customer Details'>
                          <Link
                              component="button"
                              variant="body1"
                              onClick={handleEditClickOpen}
                          >
                              Edit
                          </Link>
                          </Tooltip>
                      </Box>
                      <Typography sx={{ color: 'text.secondary', fontWeight: 800 }}>{data.fullName}</Typography>                    
                  </Box>
                  <Box sx={{ display: 'flex', mb: 4, flexDirection:'column' }}>
                      <Typography sx={{ mr: 2, color: 'text.secondary' }}>Customer Email:</Typography>
                      <Typography sx={{ color: 'text.secondary', fontWeight: 800 }}>{data.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 4, flexDirection:'column' }}>
                      <Typography sx={{ mr: 2, color: 'text.secondary' }}>Customer Number:</Typography>
                      <Typography sx={{ color: 'text.secondary', fontWeight: 800 }}>{data.contact}</Typography>
                  </Box>                  
              </Box>
            </AccordionDetails>
          </Accordion> 
          <Accordion expanded={expanded1 === true} sx={{mb:5}} onChange={handleChange('panel2')}>
            <AccordionSummary
              id='controlled-panel-header-1'
              aria-controls='controlled-panel-content-1'
              // expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
            >
              <Typography>Agent Details</Typography>
            </AccordionSummary>
            <Divider/>
            <AccordionDetails>
              <Box sx={{ display: 'flex', mb: 4, mt:2, flexDirection:'column' }}>
                <Typography sx={{ mr: 2, color: 'text.secondary' }}>Assigneed To:</Typography>
                <CustomTextField select defaultValue='10' label='' sx={{border:'none', alignItems:'normal'}} id='custom-select'>
                    <MenuItem value=''>
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Shubham Pangale</MenuItem>
                    <MenuItem value={20}>Parth Patel</MenuItem>
                    <MenuItem value={30}>Vinod Suvare</MenuItem>
                </CustomTextField>
              </Box>
              <Box sx={{ display: 'flex', mb: 4, flexDirection:'column' }}>
                  <Typography sx={{ mr: 2, color: 'text.secondary' }}>Due date:</Typography>
                  <Typography sx={{ color: 'text.secondary', fontWeight: 800, textTransform: 'capitalize' }}>2024-03-13 12:11:09 PM</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 4, flexDirection:'column' }}>
                <Typography sx={{ mr: 2, color: 'text.secondary' }}>Priority:</Typography>
                <CustomTextField select defaultValue='10' label='' sx={{border:'none', alignItems:'normal'}} id='custom-select'>
                    <MenuItem value=''>
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Low</MenuItem>
                    <MenuItem value={20}>High</MenuItem>
                    <MenuItem value={30}>Medium</MenuItem>
                </CustomTextField>
              </Box>
            </AccordionDetails>
          </Accordion>  
          <Accordion expanded={expanded2 === true} sx={{mb:5}} onChange={handleChange('panel3')}>
            <AccordionSummary
              id='controlled-panel-header-1'
              aria-controls='controlled-panel-content-1'
              // expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
            >
              <Typography>Other Details</Typography>
            </AccordionSummary>
            <Divider/>
            <AccordionDetails>
              <Box sx={{ display: 'flex', mb: 4, mt:2, flexDirection:'column' }}>
                <Typography sx={{ mr: 2,  color: 'text.secondary' }}>Channel:</Typography>
                <Typography sx={{ color: 'text.secondary', fontWeight: 800 }}>Manual</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb:4, flexDirection:'column' }}>
                  <Typography sx={{ mr: 2, color: 'text.secondary' }}>Request Type:</Typography>
                  <CustomTextField select defaultValue='10' label='' sx={{border:'none', alignItems:'normal'}} id='custom-select'>
                      <MenuItem value=''>
                      <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Incident</MenuItem>
                      <MenuItem value={20}>HD</MenuItem>
                      <MenuItem value={30}>Task</MenuItem>
                  </CustomTextField>
              </Box>
              <Box sx={{ display: 'flex', mb:4, flexDirection:'column' }}>
                  <Typography sx={{ mr: 2, color: 'text.secondary' }}>Ticket Type:</Typography>
                  <CustomTextField select defaultValue='10' label='' sx={{border:'none', alignItems:'normal'}} id='custom-select'>
                      <MenuItem value=''>
                      <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Complaint</MenuItem>
                      <MenuItem value={20}>Issue</MenuItem>
                      <MenuItem value={30}>Somthing</MenuItem>
                  </CustomTextField>
              </Box>
              <Box sx={{ display: 'flex', mb:4, flexDirection:'column' }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Department Name:</Typography>
                  <CustomTextField select defaultValue='10' label='' sx={{border:'none', alignItems:'normal'}} id='custom-select'>
                      <MenuItem value=''>
                      <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Developer</MenuItem>
                      <MenuItem value={20}>QA</MenuItem>
                      <MenuItem value={30}>Tester</MenuItem>
                  </CustomTextField>
              </Box>
              <Box sx={{ display: 'flex', mb: 4, flexDirection:'column' }}>
                  <Typography sx={{ mr: 2, color: 'text.secondary' }}>Category:</Typography>
                  <CustomTextField select defaultValue='10' label='' sx={{border:'none', alignItems:'normal'}} id='custom-select'>
                      <MenuItem value=''>
                      <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Requirement</MenuItem>
                      <MenuItem value={20}>Service Affecting</MenuItem>
                      <MenuItem value={30}>Non-Service Affecting</MenuItem>
                  </CustomTextField>
              </Box>
              <Box sx={{ display: 'flex', mb: 4, flexDirection:'column' }}>
                  <Typography sx={{ mr: 2, color: 'text.secondary' }}>Sub-Category:</Typography>
                  <CustomTextField select defaultValue='10' label='' sx={{border:'none', alignItems:'normal'}} id='custom-select'>
                      <MenuItem value=''>
                      <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Requirement</MenuItem>
                      <MenuItem value={20}>Service Affecting</MenuItem>
                      <MenuItem value={30}>Non-Service Affecting</MenuItem>
                  </CustomTextField>
              </Box>
            </AccordionDetails>
          </Accordion>    
          <Accordion expanded={expanded3 === true} sx={{mb:5}} onChange={handleChange('panel4')}>
            <AccordionSummary
              id='controlled-panel-header-1'
              aria-controls='controlled-panel-content-1'
              // expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
            >
              <Typography>Email Details</Typography>
            </AccordionSummary>
            <Divider/>
            <AccordionDetails>
              <Box sx={{ display: 'flex', mb: 4, mt:2, flexDirection:'column' }}>
                <Typography sx={{ mr: 2, color: 'text.secondary' }}>CC:</Typography>
                <Grid mt={2} container spacing={2}>
                  {collaboratorsdata.map((item, index) => <Chip key={index} label={item.email} sx={{mb:2}} size='small' />)}
                </Grid>
            </Box>
            <Box sx={{ display: 'flex', mb: 4, flexDirection:'column' }}>
                <Typography sx={{ mr: 2, color: 'text.secondary' }}>TO:</Typography>
                <Grid mt={2} container spacing={2}>
                  {collaboratorsdata.map((item, index) => <Chip key={index} label={item.email} sx={{mb:2}} size='small' />)}
                </Grid>
            </Box>
            </AccordionDetails>
          </Accordion>    
          <Box sx={{ display: 'flex', mb:4, flexDirection:'column' }}>
              <Link
              component="button"
              variant="body1"
              onClick={() => setSuspendDialogOpen(true)}
              >
              Show More +
              </Link>
          </Box>            
        </CardContent>
        <Dialog
            open={openEdit}
            onClose={handleEditClose}
            aria-labelledby='user-view-edit'
            aria-describedby='user-view-edit-description'
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
          >
            <DialogTitle
              id='user-view-edit'
              sx={{
                textAlign: 'center',
                fontSize: '1.5rem !important',
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              Edit User Information
            </DialogTitle>
            <DialogContent
              sx={{
                pb: theme => `${theme.spacing(8)} !important`,
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
              }}
            >
              <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                Updating user details will receive a privacy audit.
              </DialogContentText>
              <form>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      fullWidth
                      label='Full Name'
                      placeholder='John Doe'
                      defaultValue={data.fullName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      fullWidth
                      label='Username'
                      placeholder='John.Doe'
                      defaultValue={data.username}
                      InputProps={{ startAdornment: <InputAdornment position='start'></InputAdornment> }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      fullWidth
                      type='email'
                      label='Email'
                      defaultValue={data.email}
                      placeholder='john.doe@gmail.com'
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField select fullWidth label='Assignee' defaultValue={data.status}>
                      <MenuItem value='pending'>Shubham</MenuItem>
                      <MenuItem value='active'>Parth</MenuItem>
                      <MenuItem value='inactive'>Vinod</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField fullWidth label='TAX ID' defaultValue='Tax-8894' placeholder='Tax-8894' />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      fullWidth
                      label='Contact'
                      placeholder='723-348-2344'
                      defaultValue={`+91 ${data.contact}`}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField select fullWidth label='Language' defaultValue='English'>
                      <MenuItem value='English'>English</MenuItem>
                      <MenuItem value='Spanish'>Spanish</MenuItem>
                      <MenuItem value='Portuguese'>Portuguese</MenuItem>
                      <MenuItem value='Russian'>Russian</MenuItem>
                      <MenuItem value='French'>French</MenuItem>
                      <MenuItem value='German'>German</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField select fullWidth label='Country' defaultValue='USA'>
                      <MenuItem value='USA'>USA</MenuItem>
                      <MenuItem value='UK'>UK</MenuItem>
                      <MenuItem value='Spain'>Spain</MenuItem>
                      <MenuItem value='Russia'>Russia</MenuItem>
                      <MenuItem value='France'>France</MenuItem>
                      <MenuItem value='Germany'>Germany</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      label='Use as a billing address?'
                      control={<Switch defaultChecked />}
                      sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
                    />
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
            <DialogActions
              sx={{
                justifyContent: 'center',
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClose}>
                Submit
              </Button>
              <Button variant='tonal' color='secondary' onClick={handleEditClose}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
      </Grid>
    )
}
export default ReplyLeftView;