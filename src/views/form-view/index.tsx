'use client'

import { useState } from 'react'
import { CardHeader, useTheme, Divider, IconButton, Tooltip, MenuItem } from '@mui/material'

import { useSettings } from '@/@core/hooks/useSettings'
import CustomTextField from '@/@core/components/mui/TextField'

import { FieldType, LayoutBreakpoints } from '@/types/formViewTypes'

import FormArea from './FormArea'
import FormAreaNew from './FormAreaNew'
import SidebarLeft from './SidebarLeft'
import { StyledGrid } from './styles'
import FormPreview from './FormPreview'
interface PropsType {
  fields: FieldType[]
}

const initialLayout: LayoutBreakpoints = {
  lg: [],
  md: [],
  sm: []
}

const FormView = (props: PropsType) => {
  // ** Hooks
  const { settings } = useSettings()
  const theme = useTheme()

  // ** Vars
  const { skin } = settings
  const backgroundColor = theme.palette.mode === 'dark' ? '#1A2027' : 'white'

  // ** States
  const [unusedFields, setUnusedFields] = useState(props.fields)
  const [usedFields, setUsedFields] = useState<FieldType[]>([])
  const [layoutState, setLayoutState] = useState<LayoutBreakpoints>(initialLayout)
  const [columns, setColumns] = useState(3)

  return (
    <StyledGrid className='h-full flex flex-col'>
      <div
        className={`bg-[${backgroundColor}] p-0 pt-3 border ${skin == 'default' && 'shadow'} rounded flex flex-col flex-grow`}
      >
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
                onChange={e => setColumns(parseInt(e.target.value))}
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
                <FormPreview layoutState={layoutState} usedFields={usedFields} columns={columns} />
              </Tooltip>
            </div>
          }
        />
        <Divider className='pt-2' />
        <div className='flex-grow flex'>
          <SidebarLeft unusedFields={unusedFields} setUnusedFields={setUnusedFields} />
          <FormAreaNew
            columns={columns}
            unusedFields={unusedFields}
            setUnusedFields={setUnusedFields}
            usedFields={usedFields}
            setUsedFields={setUsedFields}
            layoutState={layoutState}
            setLayoutState={setLayoutState}
          />
        </div>
      </div>
    </StyledGrid>
  )
}

export default FormView
