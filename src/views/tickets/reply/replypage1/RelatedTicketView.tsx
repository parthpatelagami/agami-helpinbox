import { Box, Card, CardContent,  Grid, Divider, Typography } from "@mui/material";
import {Icon} from '@iconify/react'
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
        <Card className="h-[500px]">
            <ScrollWrapper>
                <div className="grid grid-rows-1 gap-2">          
                {relatedTicketData.map((ticketData:any, index:number) =>
                    <Box key={index}>       
                        <CardContent>
                        <div className="grid grid-cols-12">
                            <div className="col-span-1">                        
                                <CustomAvatar skin='light' className="w-50 h-50 mb-2.5">
                                        <Icon icon='streamline:ticket-1-solid' color={`${theme.palette.primary.main}`} fontSize={30} />   
                                </CustomAvatar> 
                            </div>
                            <div className="col-span-5 border-r  mx-2">
                                <p className=" font-bold">#{ticketData.id}</p>
                                <p>{ticketData.ticketSubject}</p>
                            </div>
                            
                            <div className="col-span-2 text-center border-r ">
                                <p className=" font-bold">Ticket Status</p>
                                <p>{ticketData.ticketStatus}</p>
                            </div>
        
                            <div className="col-span-2 text-center border-r ">
                                <p className=" font-bold">Ticket Chanel</p>
                                <p>{ticketData.ticketChanel}</p>
                            </div>

                            <div className="col-span-2 text-center ">
                                <p className=" font-bold">Reply Status</p>
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

export default RelatedTicketView;
