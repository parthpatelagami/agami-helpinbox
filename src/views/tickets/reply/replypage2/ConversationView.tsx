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
      <ScrollWrapper>
        <Fragment >         
            <Grid container item xs={12} sm={12} md={12}
                sx={{                
                  mb: 10,
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >                
            {mails.map((item:any, index:number) =>
                <Grid key={index} item xs={12} md={12} sm={12}
                  sx={{
                    mb: 5,
                    width: '100%',
                    borderRadius: 1,
                    overflow: 'visible',
                    position: 'relative',
                    backgroundColor: 'background.paper',
                    boxShadow: settings.skin === 'bordered' ? 0 : 6,
                    border: theme => `1px solid ${theme.palette.divider}`
                  }}
                >                  
                    <Grid item sm={12} xs={12} md={12} sx={{ display: 'flex', py: 3, px: 6, justifyContent: {md:'space-between', xs:'unset', sm:'space-between'}, flexDirection:{md:'unset', xs:'column', sm:'unset'} }}>
                      <Grid item xs={12} md={4} sm={4} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar alt={item.from.name} src={item.from.avatar} sx={{ width: 32, height: 32, mr: 3 , backgroundColor:`${theme.palette.primary.main}`, color:'white'}} />
                        <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography variant='h6'>{item.from.name}</Typography>
                          <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                            {item.from.email}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} md={8} sm={8} sx={{ display: 'flex', alignItems:'center', flexDirection:{xs:'column', md:'row-reverse', sm:'row-reverse'} }}>
                        {
                          item.tag && <CustomChip  label={item.tag.label} color={item.tag.color}/>
                        }
                        
                        <Typography variant='body2' sx={{color: 'text.disabled', pl:2, pr:2 }}>
                          {new Date(item.time).toDateString()}{' '}
                          {new Date(item.time).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </Typography>
                        
                        {
                          item.split && <CustomChip label="Split Ticket"  onClick={splitTicket} color="primary"/>
                        }
                                     
                      </Grid>                    
                  </Grid>
                  <Divider sx={{ m: '0 !important' }} />
                  <Grid item sx={{ px: 6 }}>
                    <Grid sx={{ color: 'text.secondary' }} dangerouslySetInnerHTML={{ __html: item.message }} />
                    <Link
                        component="button"
                        variant="body1"
                        sx={{mb:4}}                            
                        >
                        Show More +
                      </Link>
                  </Grid>
                  {item.attachments.length ? (
                    <>
                      <Divider sx={{ mx: 5, my: '0 !important' }} />
                      <Grid item sx={{ px: 6, pt: 3 }}>
                        <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>
                          {`${item.attachments.length} Attachment${item.attachments.length > 1 ? 's' : ''}`}
                        </Typography>
                        <List>
                          {item.attachments.map((item: any) => {
                            return (
                              <ListItem disableGutters key={item.fileName}>
                                <ListItemIcon sx={{ mr: 2 }}>
                                  <img src={item.thumbnail} alt={item.fileName} width='24' height='24' />
                                </ListItemIcon>
                                <Typography sx={{ color: 'text.secondary' }}>{item.fileName}</Typography>
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
      </ScrollWrapper> 

  )
}

export default ConversationView
