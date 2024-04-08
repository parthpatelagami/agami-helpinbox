
// React Imports
import { useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

type Props = {
  open: boolean
  handleClose: () => void
}

type FormDataType = {
  bcc: string
  cc: string
  subject: string
  emailto: string
}

// Vars
const initialData = {
  bcc: '',
  cc: '',
  subject: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi maxime voluptatibus odit sint, animi quos minus possimus tempora esse, atque accusantium. Consequuntur expedita et porro beatae amet commodi quo? Harum?',
  emailto: ''
}

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder'
]

const ForwardTicket = ({ open, handleClose }: Props) => {
  // States
  const [formData, setFormData] = useState<FormDataType>(initialData)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleClose()
    setFormData(initialData)
  }

  const handleReset = () => {
    handleClose()
    setFormData({
      bcc: '',
      cc: '',   
      subject: '',
      emailto: ''
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
        <Typography variant='h5'>Forward Ticket</Typography>
        <IconButton onClick={handleReset}>
          <i className='tabler-x text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6'>
            <CustomTextField
                select
                fullWidth
                id='emailto'
                value={formData.emailto}
                onChange={e => setFormData({ ...formData, emailto: e.target.value })}
                label='Email To:- '
                inputProps={{ placeholder: 'Email' }}
            >
                {names.map(name => (
                <MenuItem key={name} value={name}>
                    {name}
                </MenuItem>
                ))}
            </CustomTextField>
            <CustomTextField
                select
                fullWidth
                id='cc'
                value={formData.cc}
                onChange={e => setFormData({ ...formData, cc: e.target.value })}
                label='CC:- '
                inputProps={{ placeholder: 'CC' }}
            >
                {names.map(name => (
                <MenuItem key={name} value={name}>
                    {name}
                </MenuItem>
                ))}
            </CustomTextField>
            <CustomTextField
                select
                fullWidth
                id='bcc'
                value={formData.bcc}
                onChange={e => setFormData({ ...formData, bcc: e.target.value })}
                label='BCC:- '
                inputProps={{ placeholder: 'BCC' }}
            >
               {names.map(name => (
                <MenuItem key={name} value={name}>
                    {name}
                </MenuItem>
                ))}
            </CustomTextField>
            <CustomTextField
                label='Subject:- '
                fullWidth
                placeholder='Ticket Subject'
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
            />
            <form className="flex items-center space-x-6">
                <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <input type="file" className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100
                    "/>
                </label>
            </form>
            <div className='flex items-center md:justify-end sm:justify-center gap-4'>
                <Button variant='contained' type='submit'>
                Forward
                </Button>
                <Button variant='tonal' color='error' type='reset' onClick={() => handleReset()}>
                Clear
                </Button>
            </div>
        </form>
      </div>
    </Drawer>
  )
}

export default ForwardTicket
