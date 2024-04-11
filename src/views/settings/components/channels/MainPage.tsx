'use client'

// REACT IMPORTS
import { Fragment } from 'react'

// NEXT IMPORTS
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI IMPORTS
import { Box, Card, Divider, Grid, Typography } from '@mui/material'

// Type Imports
import type { Locale } from '@/configs/i18n'
import { getLocalizedUrl } from '@/utils/i18n'

const ChannelsComponents = () => {
  const { lang: locale } = useParams()

  return (
    <Fragment>
      <Box className='p-3 mt-4'>
        <Typography variant='h5' className='font-bold-500 text-lg capitalize mb-4'>
          Channels
        </Typography>

        <Divider />

        <Grid container spacing={1} className='mt-3'>
          <Grid item xs={12} display='flex' flexDirection='row'>
            <Grid item xs={4} className='m-1'>
              <Link href={getLocalizedUrl('settings/channels/email', locale as Locale)}>
                <Card className='p-4 flex group transition-colors duration-300 hover:bg-gray-200'>
                  <i className='custom-email-icon text-4xl' />
                  <Box className='ml-3' display='flex' flexDirection='column'>
                    <Typography variant='h5' className='font-normal text-lg'>
                      Email
                    </Typography>
                    <Typography variant='body2' className='font-normal text-xs'>
                      Integrate support mailboxes, configure it, custom mail servers, Bcc and more
                    </Typography>
                  </Box>
                </Card>
              </Link>
            </Grid>
            <Grid item xs={4} className='m-1'>
              <Card className='p-4 flex group transition-colors duration-300 hover:bg-gray-200'>
                <i className='custom-facebook-icon text-4xl' />
                <Box className='ml-3' display='flex' flexDirection='column'>
                  <Typography variant='h5' className='font-normal text-lg'>
                    Facebook
                  </Typography>
                  <Typography variant='body2' className='font-normal text-xs'>
                    Associate your Facebook page to pull in customer posts, comments, and messages as tickets{' '}
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={4} className='m-1'>
              <Card className='p-4 flex group transition-colors duration-300 hover:bg-gray-200'>
                <i className='custom-phone-icon text-4xl' />
                <Box className='ml-3' display='flex' flexDirection='column'>
                  <Typography variant='h5' className='font-normal text-lg'>
                    Phone
                  </Typography>
                  <Typography variant='body2' className='font-normal text-xs'>
                    Run a virtual call center and manage phone conversations with Freshcaller{' '}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={12} display='flex' flexDirection='row'>
            <Grid item xs={4} className='m-1'>
              <Card className='p-4 flex group transition-colors duration-300 hover:bg-gray-200'>
                <i className='custom-whatsapp-icon text-4xl' />
                <Box className='ml-3' display='flex' flexDirection='column'>
                  <Typography variant='h5' className='font-normal text-lg'>
                    Whatsapp
                  </Typography>
                  <Typography variant='body2' className='font-normal text-xs'>
                    Integrate your WhatsApp business number to support customers and offer instant resolutions{' '}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  )
}

export default ChannelsComponents
