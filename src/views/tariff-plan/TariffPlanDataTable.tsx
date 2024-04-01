// ** React Imports
import { useEffect, useCallback, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { SelectChangeEvent } from '@mui/material/Select'

// ** Custom Components Imports
import CustomChip from '@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import TableHeader from './TariffPlanHeader'
import axios from 'axios'

interface UserRoleType {
  [key: string]: { icon: string; color: string }
}

interface UserStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: any
}

// ** Vars
const userRoleObj: UserRoleType = {
  editor: { icon: 'tabler:edit', color: 'info' },
  author: { icon: 'tabler:user', color: 'warning' },
  admin: { icon: 'tabler:device-laptop', color: 'error' },
  maintainer: { icon: 'tabler:chart-pie-2', color: 'success' },
  subscriber: { icon: 'tabler:circle-check', color: 'primary' }
}

const columns: GridColDef[] = [
  {
    flex: 0.1,
    minWidth: 280,
    field: 'TariffName',
    headerName: 'TariffName',
    renderCell: ({ row }: CellType) => {
      const { TariffName } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              component={Link}
              href='/apps/user/view/account'
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {TariffName}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    field: 'Country',
    minWidth: 170,
    headerName: 'Country',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.Country}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 120,
    headerName: 'Currency',
    field: 'Currency',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
          {row.Currency}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 190,
    field: 'Amount',
    headerName: 'Amount',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.Amount}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'Duration',
    headerName: 'Duration',
    renderCell: ({ row }: CellType) => {
      return <CustomChip rounded skin='light' size='small' label={row.Duration} sx={{ textTransform: 'capitalize' }} />
    }
  }
]
const DataForTable = [
  {
    id: 1,
    TariffName: 'Test34',
    Country: 'India',
    Currency: 'Ruppe',
    Amount: '300',
    Duration: 'Montly'
  },
  {
    id: 2,
    TariffName: 'Test34',
    Country: 'India',
    Currency: 'Dollar',
    Amount: '400',
    Duration: 'Yearly'
  },
  {
    id: 3,
    TariffName: 'Test34',
    Country: 'India',
    Currency: 'Dollar',
    Amount: '500',
    Duration: 'Monthly'
  }
]
const UserList = () => {
  const [tariffdata, setTariffData] = useState<any>([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  useEffect(() => {
    setTariffData(DataForTable)
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          {/* <TableHeader plan={plan} value={value} handleFilter={handleFilter} handlePlanChange={handlePlanChange} /> */}
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={tariffdata}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserList
