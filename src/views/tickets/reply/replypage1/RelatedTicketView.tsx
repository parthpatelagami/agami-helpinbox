import { Box, Card, CardContent,  Grid, Divider, Typography } from "@mui/material";
// import Icon from 'src/@core/components/icon'
import { styled, useTheme } from '@mui/material/styles'
import CustomAvatar from '@core/components/mui/Avatar';
import { relatedTicketData } from "@core/components/reply";
import React, { useState, ReactNode } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar'


const RelatedTicketView = ()=>{
    const [hidden, setHidden] = useState<boolean>(false);
    const theme = useTheme();
    const ScrollWrapper = ({ children }: { children: ReactNode }) => {
      if (hidden) {
        return <Box sx={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
      } else {
        return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
      }
    }

    return (
        <Card sx={{mt:7 , height:'500px'}}>
            <ScrollWrapper>
                <Grid item>          
                {relatedTicketData.map((ticketData, index) =>
                    <Box key={index}>       
                        <CardContent>
                            <Grid item md={12} xs={12} sm={12} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent:'space-around' }}>
                                <Grid item md={1} xs={12} sm={12} sx={{textAlign:'center' }}>                        
                                    <CustomAvatar skin='light' sx={{ width: 50, height: 50, mb: 2.25 }}>
                                        {/* <Icon icon='streamline:ticket-1-solid' color={`${theme.palette.primary.main}`} fontSize={30} />    */}
                                    </CustomAvatar>                   
                                </Grid>
                            
                                <Grid item md={5} xs={12} sm={12} sx={{ display: 'flex', mb: 4, flexDirection:'column' }}>
                                    <Typography sx={{ mr: 2, color: 'text.secondary', fontWeight: 800 }}>#{ticketData.id}</Typography>
                                    <Typography >{ticketData.ticketSubject}</Typography>
                                </Grid>

                                <Divider orientation="vertical" flexItem />
                                <Grid item md={2} xs={12} sm={12} sx={{ display: 'flex', mb: 4, flexDirection:'column',  textAlign:'center' }}>
                                    <Typography sx={{ mr: 2, color: 'text.secondary', fontWeight: 800 }}>Ticket Status</Typography>
                                    <Typography >{ticketData.replyStatus}</Typography>
                                </Grid>

                                <Divider orientation="vertical" flexItem />
                                <Grid item md={2} xs={12} sm={12} sx={{ display: 'flex', mb: 4, flexDirection:'column', textAlign:'center' }}>
                                    <Typography sx={{ mr: 2, color: 'text.secondary', fontWeight: 800 }}>Ticket Chanel</Typography>
                                    <Typography >{ticketData.ticketChanel}</Typography>
                                </Grid>

                                <Divider orientation="vertical" flexItem sx={{mr:2, ml:2}} />
                                <Grid item md={2} xs={12} sm={12} sx={{ display: 'flex', mb: 4, textAlign:'center', flexDirection:'column' }}>
                                    <Typography sx={{ mr: 2, color: 'text.secondary', fontWeight: 800 }}>Reply Status</Typography>
                                    <Typography >{ticketData.replyStatus}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />
                    </Box>   
                )}                                       
                </Grid>
            </ScrollWrapper>
        </Card>
    )
}

export default RelatedTicketView;