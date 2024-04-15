'use client'

import { useSettings } from '@/@core/hooks/useSettings'
import { Card, Box, CardContent, CardHeader, useTheme, Divider, IconButton, Tooltip, MenuItem } from '@mui/material'
import SidebarLeft from './SidebarLeft'
import FormArea from './FormArea'
import { StyledGrid } from './styles'
import { useState } from 'react'
import { FieldType } from '@/types/formViewTypes'
import OptionMenu from '@/@core/components/option-menu'
import classNames from 'classnames'
import CustomTextField from '@/@core/components/mui/TextField'
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
  const [fields, setFields] = useState(props.fields)
  const [layout, setLayout] = useState(4)

  return (
    <StyledGrid className='h-full flex flex-col'>
      <div className={`bg-white p-0 pt-3 border ${skin == 'default' && 'shadow'} rounded flex flex-col flex-grow`}>
        <CardHeader
          title='Form View'
          className='p-0 px-3'
          action={
            <div className='flex items-center'>
              <CustomTextField
                select
                className='rounded border-solid border border-primary text-primary color-primary'
                defaultValue='4'
                onChange={e => setLayout(parseInt(e.target.value))}
              >
                <MenuItem value={6}>2 Columns</MenuItem>
                <MenuItem value={4}>3 Columns</MenuItem>
                <MenuItem value={3}>4 Columns</MenuItem>
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
          <SidebarLeft fields={fields} setFields={setFields} />
          <FormArea fields={fields} layout={layout} setFields={setFields} />
        </div>
      </div>
    </StyledGrid>
  )
}

export default FormView
