import { ReplyData } from '@core/components/reply';
// ** React Imports
import React, { Fragment, useState, ReactNode } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

import CustomTextField from '@core/components/mui/TextField'

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

// import {
//   MailAttachmentType
// } from 'src/types/apps/replypagetype'
import Link from '@mui/material/Link'

const ConversationView = ()=>{

  const mails = ReplyData;
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

  return (   
        <Fragment>    
            <Grid item md={4} sm={12} xs={12} className='mt-5'>                
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
            <Grid container item xs={12} sm={12} md={12} className='my-5 w-full flex flex-col justify-center items-center'>            
            {mails.map((item:any, index:number) =>
                <Grid key={index} item xs={12} md={12} sm={12}
                  sx={{ boxShadow: settings.skin === 'bordered' ? 0 : 6,  border: theme => `1px solid ${theme.palette.divider}` }}
                  className='mb-5 w-full rounded overflow-visible relative'
                  >                  
                    <Grid item sm={12} xs={12} md={12} className='flex justify-between flex-col py-3 px-6 lg:justify-between lg:flex-row md:justify-between md:flex-row sm:justify-between sm:flex-col'>
                      <Grid item xs={12} md={4} sm={4} className='flex items-center'>
                        <Avatar alt={item.from.name} src={item.from.avatar} className='w-10 h-10 mr-3 text-white'  />
                        <Grid className='flex flex-col'>
                          <p className='text-sm font-semibold'>{item.from.name}</p>
                          <p className='text-xs font-thin'>
                            {item.from.email}
                          </p>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} md={8} sm={8} className='flex items-center md:flex-row-reverse'>
                        {
                          item.tag && <CustomChip  label={item.tag.label} color={item.tag.color}/>
                        }
                        
                        <p className='px-2'>
                          {new Date(item.time).toDateString()}{' '}
                          {new Date(item.time).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </p>
                        
                        {
                          item.split && <CustomChip label="Split Ticket"  onClick={splitTicket} color="primary"/>
                        }
                                     
                      </Grid>                    
                  </Grid>
                  <Divider className='mb-2'/>
                  <Grid item className='px-6'>
                    <Grid dangerouslySetInnerHTML={{ __html: item.message }} />
                    <Link
                        component="button"
                        className='my-3 no-underline hover:underline'                                                   
                        >
                        Show More +
                      </Link>
                  </Grid>
                  {item.attachments.length ? (
                    <>
                      <Divider className='mx-5 my-0'/>
                      <Grid item className='px-6 pt-3'>
                        <Typography className='text-sm font-semibold'>
                          {`${item.attachments.length} Attachment${item.attachments.length > 1 ? 's' : ''}`}
                        </Typography>
                        <List>
                          {item.attachments.map((item: any) => {
                            return (
                              <ListItem disableGutters key={item.fileName}>
                                <ListItemIcon sx={{ mr: 2 }}>
                                  <img src={item.thumbnail} alt={item.fileName} width='24' height='24' />
                                </ListItemIcon>
                                <Typography className='text-secondary'>{item.fileName}</Typography>
                              </ListItem>
                            )
                          })}
                        </List>
                      </Grid>
                    </>
                  ) : null}
                </Grid>
            )}
            </Grid>            
        </Fragment>   
  )
}

export default ConversationView
