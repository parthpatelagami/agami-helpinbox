'use client'

// NEXT IMPORTS
import { useParams } from 'next/navigation'
import Link from 'next/link'

// MUI IMPORTS
import { Box, Breadcrumbs, Card, CardContent, Divider, IconButton, Tooltip, Typography } from '@mui/material'

// Type Imports
import type { Locale } from '@/configs/i18n'
import { getLocalizedUrl } from '@/utils/i18n'
import Table from '@/views/sla/components/Table'

const EmailListPageComponents = () => {
  const { lang: locale } = useParams()

  return (
    <>
      <Card>
        <CardContent>
          <Box className='mt-[-10px]'>
            <Breadcrumbs aria-label='breadcrumb'>
              <Link underline='hover' href={getLocalizedUrl(`settings/`, locale as Locale)}>
                <Typography color='textPrimary'>Settings</Typography>
              </Link>
              <Link underline='hover' href={getLocalizedUrl(`settings/`, locale as Locale)}>
                <Typography color='textPrimary'>Channels</Typography>
              </Link>
              <Link underline='hover' aria-current='page' href='#'>
                Email
              </Link>
            </Breadcrumbs>
          </Box>
        </CardContent>

        <Box className='p-3'>
          <Box className='flex justify-between items-center mb-3'>
            <Typography variant='h5' className='font-bold-500 text-lg capitalize'>
              Emails
            </Typography>
            <Box>
              <Link href={getLocalizedUrl(`settings/channels/email/add-new-emails`, locale as Locale)}>
                <Tooltip placement='top' title='Add Emails'>
                  <IconButton className='hover:border-1 hover:border-inherit hover:border-solid'>
                    <i className='tabler-plus border-solid text-[20px] text-textSecondary' />
                  </IconButton>
                </Tooltip>
              </Link>
            </Box>
          </Box>

          <Divider></Divider>

          <CardContent>
            <Table />
          </CardContent>
        </Box>
      </Card>
    </>
  )
}

export default EmailListPageComponents
