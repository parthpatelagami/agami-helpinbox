import { Fragment } from 'react'

import { Box, Card, Divider, Grid, Typography } from '@mui/material'

const ChannelsComponents = () => {
  return (
    <Fragment>
      <Box className='p-5'>
        <Typography variant='h5' className='font-bold-500 text-lg capitalize'>
          Channels
        </Typography>
        <Divider />

        <Grid container spacing={2} className='mt-5'>
          <Grid item xs={12} display='flex' flexDirection='row'>
            <Grid item xs={3} className='m-2'>
              <Card className='p-4 flex items-center group transition-colors duration-300 hover:bg-gray-200'>
                <i className='tabler-mail text-5xl' />
                <Box className='ml-5' display='flex' flexDirection='column'>
                  <Typography variant='h5' className='font-normal text-lg capitalize'>
                    Email
                  </Typography>
                  <Typography variant='body2' className='font-normal text-xs'>
                    Integrate support mailboxes, configure it, custom mail servers, Bcc and more
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={3} className='m-2'>
              <Card className='p-4 flex items-center group transition-colors duration-300 hover:bg-gray-200'>
                <i className='tabler-brand-facebook text-5xl' />
                <Box className='ml-5' display='flex' flexDirection='column'>
                  <Typography variant='h5' className='font-bold-500 text-lg capitalize'>
                    Facebook
                  </Typography>
                  <Typography variant='body2' className='font-normal text-xs'>
                    Integrate support mailboxes, configure it, custom mail servers, Bcc and more
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={3} className='m-2'>
              <Card className='p-4 flex items-center group transition-colors duration-300 hover:bg-gray-200'>
                <i className='tabler-phone-call' />
                <Typography variant='h5' className='font-bold-500 text-lg capitalize'>
                  Phone
                </Typography>
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={12} display='flex' flexDirection='row'>
            <Grid item xs={3} className='m-2'>
              <Card className='p-4 flex items-center group transition-colors duration-300 hover:bg-gray-200'>
                <i className='tabler-brand-whatsapp' />
                <Typography variant='h5' className='font-bold-500 text-lg capitalize'>
                  Whatsapp
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  )
}

export default ChannelsComponents
