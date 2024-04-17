'use client'

import { useSettings } from '@/@core/hooks/useSettings'
import { CardHeader, useTheme, Divider, IconButton, Tooltip, MenuItem } from '@mui/material'
import SidebarLeft from './SidebarLeft'
import FormArea from './FormArea'
import { StyledGrid } from './styles'
import { useState } from 'react'
import { FieldType } from '@/types/formViewTypes'

import CustomTextField from '@/@core/components/mui/TextField'
import FormAreaNew from './FormAreaNew'
interface PropsType {
  fields: FieldType[]
}

const FormView = (props: PropsType) => {
  // ** Hooks
  const { settings } = useSettings()
  const theme = useTheme()

  // ** Vars
  const { skin } = settings

  // ** States
  const [unusedFields, setUnusedFields] = useState(props.fields)
  const [layout, setLayout] = useState(3)

  return (
    <StyledGrid className='h-full flex flex-col'>
      <div className={`bg-white p-0 pt-3 border ${skin == 'default' && 'shadow'} rounded flex flex-col flex-grow`}>
        <CardHeader
          title='Form View'
          subheader='Last updated at ...'
          subheaderTypographyProps={{ className: 'text-xs' }}
          className='p-0 px-3'
          action={
            <div className='flex items-center gap-2'>
              <CustomTextField
                select
                className='rounded border-solid border border-primary'
                defaultValue='3'
                onChange={e => setLayout(parseInt(e.target.value))}
                sx={{
                  '& .MuiInputBase-input:not(textarea).MuiInputBase-inputSizeSmall': {
                    color: theme.palette.primary.main
                  },
                  '& .tabler-chevron-down': {
                    color: theme.palette.primary.main
                  }
                }}
              >
                <MenuItem value={2}>2 Columns</MenuItem>
                <MenuItem value={3}>3 Columns</MenuItem>
                <MenuItem value={4}>4 Columns</MenuItem>
              </CustomTextField>
              <Tooltip placement='top' title='Preview'>
                <IconButton size='small' className='mx-1 p-1 border-solid border border-primary rounded-full'>
                  <i className={`tabler-player-play-filled text-primary`} />
                </IconButton>
              </Tooltip>
            </div>
          }
        />
        <Divider className='pt-2' />
        <div className='flex-grow flex'>
          <SidebarLeft unusedFields={unusedFields} setUnusedFields={setUnusedFields} />
          <FormAreaNew unusedFields={unusedFields} layout={layout} setUnusedFields={setUnusedFields} />
        </div>
      </div>
    </StyledGrid>
  )
}

export default FormView
