import { Typography, IconButton, Stack, Paper } from '@mui/material'
import { Check, Delete, ModeEdit } from '@mui/icons-material'
import { styled } from '@mui/material/styles'

const handleEdit = (id: any, event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault()
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
    flex: 0.015,
    minWidth: 200,
    field: 'id',
    headerName: 'Sr No.',
    renderCell: (params: any) => (
      <Typography variant='h6' className='text-secondary mt-2 ml-3'>
        {params.row.id}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 800,
    field: 'title',
    headerName: 'Title',
    renderCell: (params: any) => (
      <Typography variant='h6' className='text-secondary mt-2'>
        {params.row.title}
      </Typography>
    )
  },
  {
    field: 'action',
    minWidth: 200,
    headerName: 'Action',
    sortable: false,
    renderCell: (params: any) => (
      <div>
        <Stack display='flex' flexDirection='row' className='mt-1'>
          <Item>
            <IconButton aria-label='check' title='Check'>
              <Check />
            </IconButton>
          </Item>
          <Item>
            <IconButton aria-label='edit' title='Edit' onClick={e => handleEdit(params.row.id, e)}>
              <ModeEdit />
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
