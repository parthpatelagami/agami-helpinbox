'use client'

import { useState } from 'react'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import { Box, Card, CardContent, CardHeader, Divider, IconButton, TextField, Tooltip, Typography } from '@mui/material'
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
          <Box display='flex' flexDirection='column'>
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
              className='w-72 mt-8'
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
        </CardContent>
      </Card>
    </>
  )
}

export default AddNewSLA
