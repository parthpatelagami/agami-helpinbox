'use client'

// React Import
import React, { Fragment } from 'react'

// Next Impot
import { useParams } from 'next/navigation'
import Link from 'next/link'

// Mui Import
import { Box, Typography, Divider, Card, IconButton, Tooltip, CardContent } from '@mui/material'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Type Imports
import type { Locale } from '@configs/i18n'

// Custom Import
import Table from './components/Table'

const MainPage: React.FC = () => {
  const { lang: locale } = useParams()

  return (
    <Fragment>
      <Card>
        <CardContent>
          <Box className='flex justify-between items-center mb-5'>
            <Typography variant='h5' className='font-bold-500 text-lg capitalize'>
              SLA
            </Typography>
            <Box>
              <Link href={getLocalizedUrl(`sla/add-new-sla`, locale as Locale)}>
                <Tooltip placement='top' title='Add'>
                  <IconButton className='hover:border-1 hover:border-inherit hover:border-solid'>
                    <i className='tabler-plus border-solid text-[20px] text-textSecondary' />
                  </IconButton>
                </Tooltip>
              </Link>
            </Box>
          </Box>
        </CardContent>
        <Divider></Divider>
        <Box className='p-5'>
          <Typography variant='h1' component='p' className='font-medium text-base mt-1'>
            Enable
          </Typography>
        </Box>
        <div className='mb-32 m-1'>
          <Table />
        </div>
      </Card>
    </Fragment>
  )
}

export default MainPage
