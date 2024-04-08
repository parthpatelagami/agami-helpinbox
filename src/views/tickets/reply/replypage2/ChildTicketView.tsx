import { Box, Card, CardContent,  Grid, Divider, Typography } from "@mui/material";
// import Icon from 'src/@core/components/icon'
import { styled, useTheme } from '@mui/material/styles'
import CustomAvatar from '@core/components/mui/Avatar';
import { relatedTicketData } from "@core/components/reply";
import React, { useState, ReactNode } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar'


const ChildTicketView = ()=>{
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
        <Card sx={{mt:7 , height:'600px'}}>
            <ScrollWrapper>
                <div className="grid grid-rows-1 gap-2">          
                {relatedTicketData.map((ticketData:any, index:number) =>
                    <Box key={index}>       
                        <CardContent>
                        <div className="grid grid-cols-12">
                            <div className="col-span-1">                        
                                <CustomAvatar skin='light' sx={{ width: 50, height: 50, mb: 2.25 }}>
                                        {/* <Icon icon='streamline:ticket-1-solid' color={`${theme.palette.primary.main}`} fontSize={30} />    */}
                                </CustomAvatar> 
                            </div>
                            <div className="col-span-5 border-r border-gray-300 mx-2">
                                <Typography sx={{ mr: 2, color: 'text.secondary', fontWeight: 800 }}>#{ticketData.id}</Typography>
                                <Typography >{ticketData.ticketSubject}</Typography>
                            </div>
                            
                            <div className="col-span-2 text-center border-r border-gray-300">
                                <Typography sx={{ mr: 2, color: 'text.secondary', fontWeight: 800 }}>Ticket Status</Typography>
                                <Typography >{ticketData.replyStatus}</Typography>
                            </div>
                            
                            <div className="col-span-2 text-center border-r border-gray-300">
                                <Typography sx={{ mr: 2, color: 'text.secondary', fontWeight: 800 }}>Reply Status</Typography>
                                <Typography >{ticketData.replyStatus}</Typography>
                            </div>
                            
                            <div className="col-span-2 text-center">
                                <Typography sx={{ mr: 2, color: 'text.secondary', fontWeight: 800 }}>Ticket Chanel</Typography>
                                <Typography >{ticketData.ticketChanel}</Typography>
                            </div>
                        </div>
                        </CardContent>
                        <Divider />
                    </Box>   
                )}                                       
                </div>
            </ScrollWrapper>
        </Card>
    )
}

export default ChildTicketView;