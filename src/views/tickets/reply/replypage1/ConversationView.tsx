'use client'

// ** React Imports
import React, { Fragment, useState, ReactNode } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

import CustomTextField from '@core/components/mui/TextField'
import { ReplyData } from '@core/components/reply';
// ** MUI Imports
import List from '@mui/material/List'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'

import ListItemIcon from '@mui/material/ListItemIcon'


// ** Third Party Imports
import CustomChip from '@core/components/mui/Chip'
import Chip from '@mui/material/Chip'

// ** Hooks
import { useSettings } from '@core/hooks/useSettings'
import PerfectScrollbar from 'react-perfect-scrollbar'

import Link from '@mui/material/Link'

const ConversationView = ()=>{

  const theme = useTheme();

  const [hidden, setHidden] = useState<boolean>(false);
  const ScrollWrapper = ({ children }: { children: ReactNode }) => {
    if (hidden) {
      return <Box sx={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
      return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
    }
  }
  // ** Hook
  const splitTicket =()=>{
    console.log("click")
  }
  const { settings } = useSettings()
  const direction = "rtl";

  const prevMailIcon = direction === 'rtl' ? 'tabler:chevron-right' : 'tabler:chevron-left' 
  const boxShadowValue = settings.skin === 'bordered' ? 'none' : '0 0 6px rgba(0, 0, 0, 0.1)';
  const borderValue = `1px solid ${theme.palette.divider}`;

  const styles = {
    boxShadow: boxShadowValue,
    border: borderValue
  };
  return ( 
    <Card className='mt-5 h-[600px]'>
      <Grid sm={12} item container spacing={1}
        sx={{
          display: 'flex',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          alignItems:'center',
          justifyContent:'space-between',
          // px: 5,
          p: 4,
          backgroundColor: 'background.paper',
          borderBottom: theme => `1px solid ${theme.palette.divider}`
        }}
      >
        <Grid item sm={6}>
          <Typography variant='h5' className='me-3.5'>
            Conversation History
          </Typography>
        </Grid>
        <Grid item sm={4}>
          <CustomTextField select fullWidth label='' defaultValue='0'>
              <MenuItem value='0'>All</MenuItem>
              <MenuItem value='manual'>Manual</MenuItem>
              <MenuItem value='email'>Email</MenuItem>
              <MenuItem value='customer_portail'>Customer Portail</MenuItem>
              <MenuItem value='facebook'>Facebook</MenuItem>
              <MenuItem value='call'>Call</MenuItem>
              <MenuItem value='chat'>Chat</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
      <ScrollWrapper>
        <Fragment >         
            <div className='p-5 mb-10 w-full flex items-center flex-col justify-center'>                
            {ReplyData.map((item:any, index:number) =>
                <div
                  style={styles}
                  className='mb-5 w-full rounded overflow-visible relative'
                  key={index}
                >
                  <div className='py-3 px-6'>
                    <div className='flex items-center justify-between flex-wrap' >
                      <div className='flex items-center'>
                        <Avatar alt={item.from.name} src={item.from.avatar} className='w-10 h-10 me-3' />
                        <div className='flex flex-col'>
                          <Typography variant='h6'>{item.from.name}</Typography>
                          <p className='text-xs text-secondary'>
                            {item.from.email}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center'>
                        {
                          item.split && <CustomChip label="Split Ticket" sx={{mr:2}} onClick={splitTicket} color="primary"/>
                        }

                        <Typography variant='body2' className='me-3 font-light'>
                          {new Date(item.time).toDateString()}{' '}
                          {new Date(item.time).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </Typography>
                        
                        {/* <IconButton size='small'>
                            <Icon icon='tabler:paperclip' fontSize='1.25rem' />
                        </IconButton> */}
                        
                        {
                          item.tag && <CustomChip label={item.tag.label} color={item.tag.color}/>
                        }
                        
                      </div>
                    </div>
                  </div>
                  <Divider className='m-0' />
                  <div className='px-6 my-5'>
                    <div className='text-secondary' dangerouslySetInnerHTML={{ __html: item.message }} />
                    <Link
                        component="button"
                        variant="body1"
                        
                        className='my-4 no-underline hover:underline'                           
                        >
                        Show More +
                      </Link>
                  </div>
                  {item.attachments.length ? (
                    <>
                      <Divider className='mx-5 my-0'/>
                      <div className='px-6 pt-3'>
                        <Typography className='text-secondary font-semibold'>
                          {`${item.attachments.length} Attachment${item.attachments.length > 1 ? 's' : ''}`}
                        </Typography>
                        <List>
                          {item.attachments.map((item: any) => {
                            return (
                              <ListItem disableGutters key={item.fileName}>
                                <ListItemIcon className='mr-2'>
                                  <img src={item.thumbnail} alt={item.fileName} width='24' height='24' />
                                </ListItemIcon>
                                <Typography className='text-secondary'>{item.fileName}</Typography>
                              </ListItem>
                            )
                          })}
                        </List>
                      </div>
                    </>
                  ) : null}
                </div>
            )}
            </div>            
        </Fragment>   
      </ScrollWrapper> 
    </Card>
  )
}

export default ConversationView
