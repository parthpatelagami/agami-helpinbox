'use cient'

// React Imports
import { forwardRef, useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Component Imports
import { FormControl, FormControlLabel, Switch } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

type Props = {
  open: boolean
  handleClose: () => void
  setLockLayout: (val: any) => void
  lockLayout: boolean
}

type EventDateType = Date | null | undefined

interface PickerProps {
  label?: string
  error?: boolean
  registername?: string
}

type FormDataType = {
  endDate: Date | string
  startDate: Date | string
  lockLayout: boolean
}

// Vars

const DashboardFilter = ({ open, handleClose, lockLayout, setLockLayout }: Props) => {
  const initialData = {
    endDate: new Date(),
    startDate: new Date(),
    lockLayout: lockLayout
  }

  // States
  const [formData, setFormData] = useState<FormDataType>(initialData)

  // Refs
  const PickersComponent = forwardRef(({ ...props }: PickerProps, ref) => {
    return (
      <CustomTextField
        inputRef={ref}
        fullWidth
        {...props}
        label={props.label || ''}
        className='is-full'
        error={props.error}
      />
    )
  })

  const handleStartDate = (date: Date) => {
    if (date > formData.endDate) {
      setFormData({ ...formData, startDate: new Date(date), endDate: new Date(date) })
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLockLayout(formData.lockLayout)
    handleClose()
    setFormData(initialData)
  }

  const handleReset = () => {
    handleClose()
    setFormData({
      endDate: '',
      startDate: '',
      lockLayout: lockLayout
    })
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>Dashboard Filter</Typography>
        <IconButton onClick={handleReset}>
          <i className='tabler-x text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6'>
          <AppReactDatepicker
            selectsStart
            id='start-date'
            endDate={formData.endDate as EventDateType}
            selected={formData.startDate as EventDateType}
            startDate={formData.startDate as EventDateType}
            dateFormat='dd-MM-yyyy'
            customInput={<PickersComponent label='Start Date' registername='startDate' />}
            onChange={(date: Date) => setFormData({ ...formData, startDate: new Date(date) })}
            onSelect={handleStartDate}
          />
          <AppReactDatepicker
            selectsEnd
            id='event-end-date'
            endDate={formData.endDate as EventDateType}
            selected={formData.endDate as EventDateType}
            minDate={formData.startDate as EventDateType}
            startDate={formData.startDate as EventDateType}
            dateFormat='dd-MM-yyyy'
            customInput={<PickersComponent label='End Date' registername='endDate' />}
            onChange={(date: Date) => setFormData({ ...formData, endDate: new Date(date) })}
          />
          <FormControl>
            <FormControlLabel
              label='Lock Layout'
              control={
                <Switch
                  checked={formData.lockLayout}
                  onChange={e => setFormData({ ...formData, lockLayout: e.target.checked })}
                />
              }
            />
          </FormControl>
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={() => handleReset()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default DashboardFilter
