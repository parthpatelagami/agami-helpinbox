'use client'

import { useState } from 'react'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { styled } from '@mui/material/styles'
import type { SwitchProps } from '@mui/material/Switch'
import Switch from '@mui/material/Switch'

// Type Imports
import type { Locale } from '@/configs/i18n'
import { getLocalizedUrl } from '@/utils/i18n'

const SLASwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
))(({ theme }) => ({
  width: 55,
  height: 29,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '500ms',
    '&.Mui-checked': {
      transform: 'translateX(35px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.3
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff'
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
    }
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22
  },
  '& .MuiSwitch-track': {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    })
  }
}))

const AddNewSLA = () => {
  const { lang: locale } = useParams()

  const [slaTitle, setSlaTitle] = useState('')
  const [slaTitleError, setSlaTitleError] = useState(false)
  const [slaDescription, setSlaDescription] = useState('')
  const [checked, setChecked] = useState(true)

  const [lowFirstReply, setLowFirstReply] = useState('4')
  const [lowFirstReplySelect, setLowFirstReplySelect] = useState('Hours')
  const [lowNextReply, setLowNextReply] = useState('8')
  const [lowNextReplySelect, setLowNextReplySelect] = useState('Hours')
  const [lowResolutionReply, setLowResolutionReply] = useState('12')
  const [lowResolutionReplySelect, setLowResolutionReplySelect] = useState('Hours')

  const [mediumFirstReply, setMediumFirstReply] = useState('3')
  const [mediumFirstReplySelect, setMediumFirstReplySelect] = useState('Hours')
  const [mediumNextReply, setMediumNextReply] = useState('6')
  const [mediumNextReplySelect, setMediumNextReplySelect] = useState('Hours')
  const [mediumResolutionReply, setMediumResolutionReply] = useState('8')
  const [mediumResolutionReplySelect, setMediumResolutionReplySelect] = useState('Hours')

  const [highFirstReply, setHighFirstReply] = useState('1')
  const [highFirstReplySelect, setHighFirstReplySelect] = useState('Hours')
  const [highNextReply, setHighNextReply] = useState('2')
  const [highNextReplySelect, setHighNextReplySelect] = useState('Hours')
  const [highResolutionReply, setHighResolutionReply] = useState('3')
  const [highResolutionReplySelect, setHighResolutionReplySelect] = useState('Hours')

  const [urgentFirstReply, setUrgentFirstReply] = useState('30')
  const [urgentFirstReplySelect, setUrgentFirstReplySelect] = useState('Minutes')
  const [urgentNextReply, setUrgentNextReply] = useState('1')
  const [urgentNextReplySelect, setUrgentNextReplySelect] = useState('Hours')
  const [urgentResolutionReply, setUrgentResolutionReply] = useState('2')
  const [urgentResolutionReplySelect, setUrgentResolutionReplySelect] = useState('Hours')

  const [operationalHoursSelect, setOperationalHoursSelect] = useState('Calendar Hours')

  const handleChange = () => {
    setChecked(prev => !prev)
  }

  const checkedMessage = checked ? 'Enabled' : 'Disabled'

  return (
    <>
      <Card>
        <CardHeader
          title='SLAs / New'
          action={
            <Box>
              <Tooltip placement='top' title='Close'>
                <Link href={getLocalizedUrl(`sla`, locale as Locale)}>
                  <IconButton>
                    <i className='tabler-x border-solid text-[20px] text-textSecondary' />
                  </IconButton>
                </Link>
              </Tooltip>
            </Box>
          }
        />
        <Divider />
        <CardContent>
          <Box className='mb-5' display='flex' flexDirection='column'>
            <Typography variant='h6' className='capitalize'>
              When cases are set to certain statuses, SLA timers may pause (for example, while you are waiting to hear
              back from the customer).
            </Typography>

            <Typography variant='h5' className='font-bold capitalize mt-10'>
              SLA Details
            </Typography>

            <TextField
              className='w-72'
              id='standard-multiline-flexible'
              label='SLA Title*'
              variant='standard'
              error={slaTitleError}
              value={slaTitle}
              onBlur={() => {
                if (slaTitle.trim() === '') {
                  setSlaTitleError(true)
                } else {
                  setSlaTitleError(false)
                }
              }}
              onChange={e => {
                setSlaTitle(e.target.value)
              }}
            />

            <TextField
              className='w-72 mt-8 mb-5'
              id='standard-multiline-flexible'
              label='Description'
              variant='standard'
              value={slaDescription}
              onChange={e => {
                setSlaDescription(e.target.value)
              }}
            />

            <Box className='mt-5' display='flex' flexDirection='row'>
              <SLASwitch checked={checked} onChange={handleChange} />
              <Typography variant='h6' className='capitalize ml-5 mt-1'>
                SLA is {checkedMessage}
              </Typography>
            </Box>
          </Box>

          <Divider />

          <Box className='mt-5 mb-5' display='flex' flexDirection='column'>
            <Typography variant='h6' className='capitalize mt-1'>
              Targets
            </Typography>
            <Typography variant='h6' className='capitalize mt-1'>
              Specify goals for each metric across different case priorities.
            </Typography>

            <Box display='contents'>
              {/* LOW PRIORITY */}
              <Box className='m-3 mt-10' display='flex' flexDirection='row' flexWrap='wrap'>
                <Typography variant='h6' className='capitalize mt-4 w-20 absolute'>
                  Low
                </Typography>
                <Grid container>
                  <Grid item xs={4}>
                    {/* First set of inputs */}
                    <Box display='flex' flexDirection='row' alignItems='center' flexWrap='wrap'>
                      <TextField
                        className='ml-28 mr-2'
                        id='low-first-reply'
                        variant='filled'
                        size='small'
                        inputProps={{ style: { textAlign: 'center' } }}
                        value={lowFirstReply}
                        onChange={e => setLowFirstReply(e.target.value)}
                      />
                      <FormControl className='flex-grow' size='small'>
                        <InputLabel id='demo-select-small-label'>Select</InputLabel>
                        <Select
                          labelId='demo-select-small-label'
                          id='low-first-reply-select'
                          label='Select'
                          value={lowFirstReplySelect}
                          onChange={e => setLowFirstReplySelect(e.target.value)}
                        >
                          <MenuItem value='Minutes'>Minutes</MenuItem>
                          <MenuItem value='Hours'>Hours</MenuItem>
                          <MenuItem value='Days'>Days</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>

                  <Grid item xs={4}>
                    {/* Second set of inputs */}
                    <Box display='flex' flexDirection='row' alignItems='center' flexWrap='wrap'>
                      <TextField
                        className='ml-28 mr-2'
                        id='low-next-reply'
                        variant='filled'
                        size='small'
                        inputProps={{ style: { textAlign: 'center' } }}
                        value={lowNextReply}
                        onChange={e => setLowNextReply(e.target.value)}
                      />
                      <FormControl className='flex-grow' size='small'>
                        <InputLabel id='demo-select-small-label'>Select</InputLabel>
                        <Select
                          labelId='demo-select-small-label'
                          id='low-next-reply-select'
                          label='Select'
                          value={lowNextReplySelect}
                          onChange={e => setLowNextReplySelect(e.target.value)}
                        >
                          <MenuItem value='Minutes'>Minutes</MenuItem>
                          <MenuItem value='Hours'>Hours</MenuItem>
                          <MenuItem value='Days'>Days</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>

                  <Grid item xs={4}>
                    {/* Third set of inputs */}
                    <Box display='flex' flexDirection='row' alignItems='center' flexWrap='wrap'>
                      <TextField
                        className='ml-28 mr-2'
                        id='low-resolution-reply'
                        variant='filled'
                        size='small'
                        inputProps={{ style: { textAlign: 'center' } }}
                        value={lowResolutionReply}
                        onChange={e => setLowResolutionReply(e.target.value)}
                      />
                      <FormControl className='flex-grow' size='small'>
                        <InputLabel id='demo-select-small-label'>Select</InputLabel>
                        <Select
                          labelId='demo-select-small-label'
                          id='low-resolution-reply-select'
                          label='Select'
                          value={lowResolutionReplySelect}
                          onChange={e => setLowResolutionReplySelect(e.target.value)}
                        >
                          <MenuItem value='Minutes'>Minutes</MenuItem>
                          <MenuItem value='Hours'>Hours</MenuItem>
                          <MenuItem value='Days'>Days</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {/* MEDIUM PRIORITY */}
              <Box className='m-3 mt-10' display='flex' flexDirection='row' flexWrap='wrap'>
                <Typography variant='h6' className='capitalize mt-4 w-20 absolute'>
                  Medium
                </Typography>
                <Grid container>
                  <Grid item xs={4}>
                    {/* First set of inputs */}
                    <Box display='flex' flexDirection='row' alignItems='center' flexWrap='wrap'>
                      <TextField
                        className='ml-28 mr-2'
                        id='medium-first-reply'
                        variant='filled'
                        size='small'
                        inputProps={{ style: { textAlign: 'center' } }}
                        value={mediumFirstReply}
                        onChange={e => setMediumFirstReply(e.target.value)}
                      />
                      <FormControl className='flex-grow' size='small'>
                        <InputLabel id='demo-select-small-label'>Select</InputLabel>
                        <Select
                          labelId='demo-select-small-label'
                          id='medium-first-reply-select'
                          label='Select'
                          value={mediumFirstReplySelect}
                          onChange={e => setMediumFirstReplySelect(e.target.value)}
                        >
                          <MenuItem value='Minutes'>Minutes</MenuItem>
                          <MenuItem value='Hours'>Hours</MenuItem>
                          <MenuItem value='Days'>Days</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>

                  <Grid item xs={4}>
                    {/* Second set of inputs */}
                    <Box display='flex' flexDirection='row' alignItems='center' flexWrap='wrap'>
                      <TextField
                        className='ml-28 mr-2'
                        id='medium-next-reply'
                        variant='filled'
                        size='small'
                        inputProps={{ style: { textAlign: 'center' } }}
                        value={mediumNextReply}
                        onChange={e => setMediumNextReply(e.target.value)}
                      />
                      <FormControl className='flex-grow' size='small'>
                        <InputLabel id='demo-select-small-label'>Select</InputLabel>
                        <Select
                          labelId='demo-select-small-label'
                          id='medium-nexy-reply-select'
                          label='Select'
                          value={mediumNextReplySelect}
                          onChange={e => setMediumNextReplySelect(e.target.value)}
                        >
                          <MenuItem value='Minutes'>Minutes</MenuItem>
                          <MenuItem value='Hours'>Hours</MenuItem>
                          <MenuItem value='Days'>Days</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>

                  <Grid item xs={4}>
                    {/* Third set of inputs */}
                    <Box display='flex' flexDirection='row' alignItems='center' flexWrap='wrap'>
                      <TextField
                        className='ml-28 mr-2'
                        id='medium-resolution-reply'
                        variant='filled'
                        size='small'
                        inputProps={{ style: { textAlign: 'center' } }}
                        value={mediumResolutionReply}
                        onChange={e => setMediumResolutionReply(e.target.value)}
                      />
                      <FormControl className='flex-grow' size='small'>
                        <InputLabel id='demo-select-small-label'>Select</InputLabel>
                        <Select
                          labelId='demo-select-small-label'
                          id='medium-resolution-reply-select'
                          label='Select'
                          value={mediumResolutionReplySelect}
                          onChange={e => setMediumResolutionReplySelect(e.target.value)}
                        >
                          <MenuItem value='Minutes'>Minutes</MenuItem>
                          <MenuItem value='Hours'>Hours</MenuItem>
                          <MenuItem value='Days'>Days</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {/* HIGH PRIORITY */}
              <Box className='m-3 mt-10' display='flex' flexDirection='row' flexWrap='wrap'>
                <Typography variant='h6' className='capitalize mt-4 w-20 absolute'>
                  High
                </Typography>

                <Grid container>
                  <Grid item xs={4}>
                    {/* First set of inputs */}
                    <Box display='flex' flexDirection='row' alignItems='center' flexWrap='wrap'>
                      <TextField
                        className='ml-28 mr-2'
                        id='filled-basic'
                        variant='filled'
                        size='small'
                        inputProps={{ style: { textAlign: 'center' } }}
                        value={highFirstReply}
                        onChange={e => setHighFirstReply(e.target.value)}
                      />
                      <FormControl className='flex-grow' size='small'>
                        <InputLabel id='demo-select-small-label'>Select</InputLabel>
                        <Select
                          labelId='demo-select-small-label'
                          id='lowprioritySelect'
                          label='Select'
                          value={highFirstReplySelect}
                          onChange={e => setHighFirstReplySelect(e.target.value)}
                        >
                          <MenuItem value='Minutes'>Minutes</MenuItem>
                          <MenuItem value='Hours'>Hours</MenuItem>
                          <MenuItem value='Days'>Days</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>

                  <Grid item xs={4}>
                    {/* Second set of inputs */}
                    <Box display='flex' flexDirection='row' alignItems='center' flexWrap='wrap'>
                      <TextField
                        className='ml-28 mr-2'
                        id='filled-basic'
                        variant='filled'
                        size='small'
                        inputProps={{ style: { textAlign: 'center' } }}
                        value={highNextReply}
                        onChange={e => setHighNextReply(e.target.value)}
                      />
                      <FormControl className='flex-grow' size='small'>
                        <InputLabel id='demo-select-small-label'>Select</InputLabel>
                        <Select
                          labelId='demo-select-small-label'
                          id='lowprioritySelect'
                          label='Select'
                          value={highNextReplySelect}
                          onChange={e => setHighNextReplySelect(e.target.value)}
                        >
                          <MenuItem value='Minutes'>Minutes</MenuItem>
                          <MenuItem value='Hours'>Hours</MenuItem>
                          <MenuItem value='Days'>Days</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>

                  <Grid item xs={4}>
                    {/* Third set of inputs */}
                    <Box display='flex' flexDirection='row' alignItems='center' flexWrap='wrap'>
                      <TextField
                        className='ml-28 mr-2'
                        id='filled-basic'
                        variant='filled'
                        size='small'
                        inputProps={{ style: { textAlign: 'center' } }}
                        value={highResolutionReply}
                        onChange={e => setHighResolutionReply(e.target.value)}
                      />
                      <FormControl className='flex-grow' size='small'>
                        <InputLabel id='demo-select-small-label'>Select</InputLabel>
                        <Select
                          labelId='demo-select-small-label'
                          id='lowprioritySelect'
                          label='Select'
                          value={highResolutionReplySelect}
                          onChange={e => setHighResolutionReplySelect(e.target.value)}
                        >
                          <MenuItem value='Minutes'>Minutes</MenuItem>
                          <MenuItem value='Hours'>Hours</MenuItem>
                          <MenuItem value='Days'>Days</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {/* URGENT PRIORITY */}
              <Box className='m-3 mt-10' display='flex' flexDirection='row' flexWrap='wrap'>
                <Typography variant='h6' className='capitalize mt-4 w-20 absolute'>
                  Urgent
                </Typography>
                <Grid container>
                  <Grid item xs={4}>
                    {/* First set of inputs */}
                    <Box display='flex' flexDirection='row' alignItems='center' flexWrap='wrap'>
                      <TextField
                        className='ml-28 mr-2'
                        id='filled-basic'
                        variant='filled'
                        size='small'
                        inputProps={{ style: { textAlign: 'center' } }}
                        value={urgentFirstReply}
                        onChange={e => setUrgentFirstReply(e.target.value)}
                      />
                      <FormControl className='flex-grow' size='small'>
                        <InputLabel id='demo-select-small-label'>Select</InputLabel>
                        <Select
                          labelId='demo-select-small-label'
                          id='lowprioritySelect'
                          label='Select'
                          value={urgentFirstReplySelect}
                          onChange={e => setUrgentFirstReplySelect(e.target.value)}
                        >
                          <MenuItem value='Minutes'>Minutes</MenuItem>
                          <MenuItem value='Hours'>Hours</MenuItem>
                          <MenuItem value='Days'>Days</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>

                  <Grid item xs={4}>
                    {/* Second set of inputs */}
                    <Box display='flex' flexDirection='row' alignItems='center' flexWrap='wrap'>
                      <TextField
                        className='ml-28 mr-2'
                        id='filled-basic'
                        variant='filled'
                        size='small'
                        inputProps={{ style: { textAlign: 'center' } }}
                        value={urgentNextReply}
                        onChange={e => setUrgentNextReply(e.target.value)}
                      />
                      <FormControl className='flex-grow' size='small'>
                        <InputLabel id='demo-select-small-label'>Select</InputLabel>
                        <Select
                          labelId='demo-select-small-label'
                          id='lowprioritySelect'
                          label='Select'
                          value={urgentNextReplySelect}
                          onChange={e => setUrgentNextReplySelect(e.target.value)}
                        >
                          <MenuItem value='Minutes'>Minutes</MenuItem>
                          <MenuItem value='Hours'>Hours</MenuItem>
                          <MenuItem value='Days'>Days</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>

                  <Grid item xs={4}>
                    {/* Third set of inputs */}
                    <Box display='flex' flexDirection='row' alignItems='center' flexWrap='wrap'>
                      <TextField
                        className='ml-28 mr-2'
                        id='filled-basic'
                        variant='filled'
                        size='small'
                        inputProps={{ style: { textAlign: 'center' } }}
                        value={urgentResolutionReply}
                        onChange={e => setUrgentResolutionReply(e.target.value)}
                      />
                      <FormControl className='flex-grow' size='small'>
                        <InputLabel id='demo-select-small-label'>Select</InputLabel>
                        <Select
                          labelId='demo-select-small-label'
                          id='lowprioritySelect'
                          label='Select'
                          value={urgentResolutionReplySelect}
                          onChange={e => setUrgentResolutionReplySelect(e.target.value)}
                        >
                          <MenuItem value='Minutes'>Minutes</MenuItem>
                          <MenuItem value='Hours'>Hours</MenuItem>
                          <MenuItem value='Days'>Days</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>

            <Typography variant='h6' className='capitalize mt-10'>
              Specify whether these metrics will be measured according to your business hours or to calendar hours (24
              hours a day).{' '}
            </Typography>

            <Box className='mt-10' display='flex' flexDirection='row'>
              <Typography variant='h6' className='capitalize'>
                Operational hours:
              </Typography>
              <FormControl className='w-72 ml-10' size='small'>
                <InputLabel id='demo-select-small-label'>Select</InputLabel>
                <Select
                  labelId='demo-select-small-label'
                  id='operationalHoursSelect'
                  label='Select'
                  value={operationalHoursSelect}
                  onChange={e => setOperationalHoursSelect(e.target.value)}
                >
                  <MenuItem value='Calendar Hours'>Calendar Hours</MenuItem>
                  <MenuItem value='Surat Office Hours'>Surat Office Hours</MenuItem>
                  <MenuItem value='Office Hours'>Office Hours</MenuItem>
                  <MenuItem value='Default Business Hours'>Default Business Hours</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Typography variant='h6' className='capitalize mt-10'>
              When cases are set to certain statuses, SLA timers may pause (for example, while you are waiting to hear
              back from the customer). This behaviour can be configured under status settings.
            </Typography>
          </Box>

          <Divider />

          {/* BUTTONS */}
          <Box className='mt-5'>
            <Box className='flex items-center'>
              <Button className='mx-2' variant='contained'>
                Save
              </Button>
              <Button className='mx-2' variant='outlined'>
                Reset
              </Button>
              <Link href={getLocalizedUrl(`sla`, locale as Locale)}>
                <Button className='mx-2' variant='outlined'>
                  Close
                </Button>
              </Link>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default AddNewSLA
