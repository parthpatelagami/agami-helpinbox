import { Box, Button, Checkbox, IconButton, ListItemText, Menu, MenuItem, TextField, Toolbar } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ReactDatePickerProps } from 'react-datepicker'
import Icon from 'src/@core/components/icon'
import PickersRange from './PickersRange'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import CustomAutocompleteDatatable from './CustomAutocompleteInput'
import ToolbarIcons from './Toolbar'

const FILTERS = [
  { id: 1, label: 'Agent', options: ['Mustafa Dahodwala', 'Parth Patel', 'Aadil', 'Nimit'], type: 'select' },
  { id: 2, label: 'Product', options: ['Helpinbox', 'Intalk', 'ChatinBox', 'Aniceya'], type: 'select' },
  { id: 4, label: 'Channel', options: ['Email', 'Manual', 'Facebook', 'Twitter'], type: 'select' },
  { id: 5, label: 'Status', options: ['Open', 'Pending', 'Close', 'Resolved'], type: 'select' },
  { id: 7, label: 'Department', options: ['Support', 'DevOps', 'Devlopment', 'Testing'], type: 'select' },
  { id: 8, label: 'Issue Type', options: ['Incident', 'Problem', 'Task', 'Dev'], type: 'select' },
  {
    id: 9,
    label: 'Filter 3',
    options: ['filter3-option1', 'filter3-option2', 'filter3-option3', 'filter3-option4'],
    type: 'dfse'
  }
]
// interface jsonres {
//   title?: string;

// }
const Filtertoolbar = (props: any) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedFilters, setSelectedFilters] = useState<any[]>([])
  const [callfrom, setCallFrom] = useState<any>(null)
  const [filteroption, setFilteroption] = useState<any>([])

  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleCloseDropdown = () => {
    setCallFrom(null)
  }
  const handleFilterChange = (event: any, filter: any) => {
    const updatedFilters: any[] = [...selectedFilters]
    if (event.target.checked) {
      updatedFilters.push(filter)
    } else {
      updatedFilters.splice(updatedFilters.indexOf(filter), 1)
    }
    setSelectedFilters(updatedFilters)
  }

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then((res: any) => {
        setFilteroption(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <Toolbar
      sx={{
        alignItems: 'flex-start',
        marginTop: '20px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          marginBottom: '20px',
          width: '70%'
        }}
      >
        {FILTERS.map(filter => {
          const isSelected = selectedFilters.some(selectedFilter => selectedFilter.id === filter.id)
          if (!isSelected) {
            return null
          }
          if (filter.type == 'select') {
            return <CustomAutocompleteDatatable filter={filter} filteroption={filter.options} />
          } else {
            return (
              <DatePickerWrapper key={filter.id} sx={{ padding: '8px 16px 8px 16px' }}>
                <PickersRange popperPlacement={popperPlacement} label='Select Month' />
              </DatePickerWrapper>
            )
          }
        })}
        <Box sx={{ mt: 5, padding: '0px 16px 8px 16px' }}>
          <Button
            size='small'
            onClick={handleClick}
            startIcon={
              <IconButton size='small' title='Clear' aria-label='Clear' sx={{ padding: '0px' }}>
                <Icon fontSize='1.25rem' icon='ic:baseline-plus' />
              </IconButton>
            }
          >
            More
          </Button>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: 100 * 4.5,
              width: '25ch'
            }
          }}
        >
          {FILTERS.map(filters => (
            <MenuItem key={filters.id} value={filters.label} onChange={e => handleFilterChange(e, filters)}>
              <Checkbox checked={selectedFilters.some(selectedFilter => selectedFilter.id === filters.id)} />
              <ListItemText primary={filters.label} />
            </MenuItem>
          ))}
        </Menu>
        <Menu anchorEl={callfrom} open={Boolean(callfrom)} onClose={handleCloseDropdown}>
          <MenuItem>
            <TextField size='small' />
          </MenuItem>
        </Menu>
      </Box>
      <ToolbarIcons />
    </Toolbar>
  )
}
export default Filtertoolbar
