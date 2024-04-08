'use client'

import { useSettings } from '@/@core/hooks/useSettings'
import { Card, Box, CardContent, CardHeader, useTheme, Divider, IconButton, Tooltip } from '@mui/material'
import SidebarLeft from './SidebarLeft'
import FormArea from './FormArea'
import { StyledGrid } from './styles'
import { useState } from 'react'
import { FieldType } from '@/types/formViewTypes'
import OptionMenu from '@/@core/components/option-menu'
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

  return (
    <StyledGrid className='h-full'>
      <div className={`h-full flex-col bg-white p-6 border ${skin == 'default' && 'shadow'} rounded`}>
        <CardHeader
          title='Form View'
          className='p-0'
          action={
            <>
              <Tooltip placement='top' title='Layout'>
                <OptionMenu
                  options={[
                    {
                      text: '2 Columns',
                      menuItemProps: {}
                    },
                    {
                      text: '3 Columns',
                      menuItemProps: {
                        selected: true
                      }
                    },
                    {
                      text: '4 Columns',
                      menuItemProps: {}
                    }
                  ]}
                  iconButtonProps={{ className: 'mx-1 p-1 border-solid border border-primary rounded-full' }}
                  icon='tabler-layout-grid'
                  iconClassName='text-primary'
                />
              </Tooltip>
              <Tooltip placement='top' title='Preview'>
                <IconButton size='small' className='mx-1 p-1 border-solid border border-primary rounded-full'>
                  <i className={`tabler-player-play-filled text-primary`} />
                </IconButton>
              </Tooltip>
            </>
          }
        />
        <div className='grid grid-cols-9 gap-2 h-full py-6'>
          <SidebarLeft fields={fields} setFields={setFields} />
          <FormArea fields={fields} setFields={setFields} />
        </div>
      </div>
    </StyledGrid>
  )
}

export default FormView
