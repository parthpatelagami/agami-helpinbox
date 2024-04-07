'use client'

import { useSettings } from '@/@core/hooks/useSettings'
import { Card, Box, CardContent, CardHeader, useTheme, Divider } from '@mui/material'
import SidebarLeft from './SidebarLeft'
import FormArea from './FormArea'
import { StyledGrid } from './styles'
import { useState } from 'react'
import { FieldType } from '@/types/formViewTypes'

interface PropsType {
  fields: FieldType[]
}

const FormView = (props: PropsType) => {
  // ** Hooks
  const { settings } = useSettings()

  // ** Vars
  const { skin } = settings

  // ** States
  const [fields, setFields] = useState(props.fields)

  return (
    <StyledGrid className='h-full'>
      <div className={`h-full flex-col bg-white p-6 border ${skin == 'default' && 'shadow'} rounded`}>
        <CardHeader title='Form View' className='p-0' action={<i className='tabler-player-play-filled' />} />
        <div className='grid grid-cols-9 gap-2 h-full py-6'>
          <SidebarLeft fields={fields} setFields={setFields} />
          <FormArea fields={fields} setFields={setFields} />
        </div>
      </div>
    </StyledGrid>
  )
}

export default FormView
