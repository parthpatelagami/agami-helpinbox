'use client'

// React Import
import React, { Fragment } from 'react'

// Next Impot
import { useParams } from 'next/navigation'
import Link from 'next/link'

// Mui Import
import { Box, Typography, Divider, Card, IconButton, Tooltip } from '@mui/material'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Type Imports
import type { Locale } from '@configs/i18n'

// Custom Import
import Table from './components/Table'

// import BusinessHoursTable from './components/BusinessHoursTable'

const MainPage: React.FC = () => {
  const { lang: locale } = useParams()

  return (
    <Fragment>
      <Card>
        <Box className='p-3'>
          <Box className='flex justify-between items-center mb-5'>
            <Typography variant='caption' className='font-bold text-lg capitalize'>
              Business Hours
            </Typography>
            <Box>
              <Tooltip placement='top' title='Info'>
                <IconButton className='hover:border-2 hover:border-inherit hover:border-solid'>
                  <i className='tabler-info-circle border-solid text-[20px] text-textSecondary' />
                </IconButton>
              </Tooltip>
              <Link href={getLocalizedUrl(`businesshours/add-new-business-hours`, locale as Locale)}>
                <Tooltip placement='top' title='Add'>
                  <IconButton className='hover:border-2 hover:border-inherit hover:border-solid'>
                    <i className='tabler-plus border-solid text-[20px] text-textSecondary' />
                  </IconButton>
                </Tooltip>
              </Link>
            </Box>
          </Box>

          <Divider />

          <Box>
            <Typography variant='h1' component='p' className='font-medium text-base mt-5'>
              Business hours tell what days and hours of the week your team is working.
            </Typography>
          </Box>

          <Box className='mt-20 mb-10 m-2'>
            {/* <BusinessHoursTable /> */}
            <Table />
          </Box>
        </Box>
      </Card>
    </Fragment>
  )
}

export default MainPage
