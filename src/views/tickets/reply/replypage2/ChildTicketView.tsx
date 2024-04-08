import { Box, Card, CardContent,  Divider } from "@mui/material";
// import Icon from 'src/@core/components/icon'
import { styled, useTheme } from '@mui/material/styles'
import CustomAvatar from '@core/components/mui/Avatar';
import { relatedTicketData } from "@core/components/reply";
import React, { useState, ReactNode } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Icon } from '@iconify/react';

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
                                        <Icon icon='streamline:ticket-1-solid' color={`${theme.palette.primary.main}`} fontSize={30} />   
                                </CustomAvatar> 
                            </div>
                            <div className="col-span-5 border-r border-gray-300 mx-2">
                                <p className="text-gray-800 font-bold">#{ticketData.id}</p>
                                <p>{ticketData.ticketSubject}</p>
                            </div>
                            
                            <div className="col-span-2 text-center border-r border-gray-300">
                                <p className="text-gray-800 font-bold">Ticket Status</p>
                                <p>{ticketData.ticketStatus}</p>
                            </div>
        
                            <div className="col-span-2 text-center border-r border-gray-300">
                                <p className="text-gray-800 font-bold">Ticket Chanel</p>
                                <p>{ticketData.ticketChanel}</p>
                            </div>

                            <div className="col-span-2 text-center ">
                                <p className="text-gray-800 font-bold">Reply Status</p>
                                <p>{ticketData.replyStatus}</p>
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