import { Typography, IconButton, Stack, Paper } from '@mui/material'
import { Check, Delete, Edit } from '@mui/icons-material'
import { styled } from '@mui/material/styles'

const handleEdit = (id: any) => {
  console.log('EDIT PARAM ::: ', id)
}

const handleDelete = (id: any) => {
  console.log('DELETE PARAM ::: ', id)
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  marginLeft: '5px'
}))

const BusinessHoursColumn = [
  {
    flex: '0 0 200px',
    minWidth: 200,
    field: 'id',
    headerName: 'Sr No.',
    renderCell: (params: any) => (
      <Typography variant='h6' className='text-secondary'>
        {params.row.id}
      </Typography>
    )
  },
  {
    flex: '0 0 800px',
    minWidth: 800,
    field: 'title',
    headerName: 'Title',
    renderCell: (params: any) => (
      <Typography variant='h6' className='text-secondary'>
        {params.row.title}
      </Typography>
    )
  },
  {
    field: 'action',
    minWidth: 200,
    headerName: 'Actions',
    sortable: false,
    renderCell: (params: any) => (
      <div>
        <Stack display='flex' flexDirection='row'>
          <Item>
            <IconButton aria-label='check' title='Check'>
              <Check />
            </IconButton>
          </Item>
          <Item>
            <IconButton aria-label='edit' title='Edit' onClick={() => handleEdit(params.row.id)}>
              <Edit />
            </IconButton>
          </Item>
          <Item>
            <IconButton aria-label='delete' title='Delete' onClick={() => handleDelete(params.row.id)}>
              <Delete />
            </IconButton>
          </Item>
        </Stack>
      </div>
    )
  }
]

export default BusinessHoursColumn
