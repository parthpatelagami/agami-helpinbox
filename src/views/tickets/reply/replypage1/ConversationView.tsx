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

  return ( 
    <Card sx={{mt:5, height:'600px'}}>
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
          <Typography variant='h5' sx={{ mr: 3.5 }}>
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
            <Box
                sx={{
                  p: 5,
                  mb: 10,
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >                
            {ReplyData.map((item:any, index:number) =>
                <Box
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
                  key={index}
                >
                  <Box sx={{ py: 3, px: 6 }}>
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar alt={item.from.name} src={item.from.avatar} sx={{ width: 32, height: 32, mr: 3 , backgroundColor:`${theme.palette.primary.main}`, color:'white'}} />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography variant='h6'>{item.from.name}</Typography>
                          <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                            {item.from.email}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {
                          item.split && <CustomChip label="Split Ticket" sx={{mr:2}} onClick={splitTicket} color="primary"/>
                        }

                        <Typography variant='body2' sx={{ mr: 3, color: 'text.disabled' }}>
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
                        
                      </Box>
                    </Box>
                  </Box>
                  <Divider sx={{ m: '0 !important' }} />
                  <Box sx={{ px: 6 }}>
                    <Box sx={{ color: 'text.secondary' }} dangerouslySetInnerHTML={{ __html: item.message }} />
                    <Link
                        component="button"
                        variant="body1"
                        sx={{mb:4}}                            
                        >
                        Show More +
                      </Link>
                  </Box>
                  {item.attachments.length ? (
                    <>
                      <Divider sx={{ mx: 5, my: '0 !important' }} />
                      <Box sx={{ px: 6, pt: 3 }}>
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
                      </Box>
                    </>
                  ) : null}
                </Box>
            )}
            </Box>            
        </Fragment>   
      </ScrollWrapper> 
    </Card>
  )
}

export default ConversationView
