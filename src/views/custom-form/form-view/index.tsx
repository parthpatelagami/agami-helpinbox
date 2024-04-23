'use client'

import { useState } from 'react'
import { CardHeader, useTheme, Divider, Tooltip, MenuItem } from '@mui/material'

import { useSettings } from '@/@core/hooks/useSettings'
import CustomTextField from '@/@core/components/mui/TextField'

import { FieldType, LayoutBreakpoints } from '@/types/formViewTypes'

import FormArea from './FormArea'
import FormAreaNew from './FormAreaNew'
import SidebarLeft from './SidebarLeft'
import { StyledGrid } from './styles'
import FormPreview from './FormPreview'
import PerfectScrollbar from 'react-perfect-scrollbar'

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
      <div className={`bg-[white] p-0 border ${skin == 'default' && 'shadow'} h-full rounded-t f`}>
        <div className='rounded-t border border-solid w-full p-1 pl-2 flex justify-between'>
          <div>
            <p className='text-base'>Form-View</p>
            <div className='flex gap-1 text-gray-500'>
              <p className='pt-[0.5px] text-xs'>Last updated at...</p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <CustomTextField
              size='small'
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
        </div>
        <div className='flex h-[calc(100%-50px)]'>
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
