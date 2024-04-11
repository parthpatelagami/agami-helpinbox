'use client'
// ** React Imports
import React, { useState, ReactNode } from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
// import Icon from 'src/@core/components/icon'
import Tooltip from '@mui/material/Tooltip'
import Grid, { GridProps } from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'
import { Divider } from '@mui/material'
import PerfectScrollbar from 'react-perfect-scrollbar'
import JiraRightPanelView from './JiraRightPanelView'
import JiraLeftPanelView from './JiraLeftPanelView'
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))


const JiraMainTabView = () => {
  const theme = useTheme()

  const [hidden, setHidden] = useState<boolean>(false);
  const ScrollWrapper = ({ children }: { children: ReactNode }) => {
    if (hidden) {
      return <Box sx={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
      return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
    }
  }

    return (     
      <Card className='h-[600px]'>
        <ScrollWrapper>
          <Grid container item sm={12} md={12} xs={12}>              
            <StyledGrid sx={{ pt: 0 }} sm={12} md={9} xs={12}> 
                <CardContent sx={{pt:0, pb:0}}>                             
                  <Grid item md={12} sm={12} xs={12} sx={{ py: 3.75, width: 'auto', display: 'flex', alignItems: 'center' }}>                      
                    <Box  sx={{ mr: 3, ml:-2}}>
                      {/* <Icon icon='fontisto:ticket' color={`${theme.palette.primary.main}`} fontSize={25} /> */}
                    </Box>       
                    <Link
                        component="button"
                        variant="h5"
                        sx={{textAlign:'start'}}
                      >
                      HEL-13 Test Jira Ticket by Shubham Pangale !!!
                    </Link>                                     
                  </Grid>                               
                </CardContent>                 
                <Divider/>
                <CardContent>  
                  <Grid item sm={12} md={12} xs={12}>
                    <JiraLeftPanelView invoiceData={[]} />                     
                  </Grid>
                </CardContent>  
            </StyledGrid>
            <Grid
                container
                item
                spacing={2}
                sm={12}
                xs={12}
                md={3}
              >
              <JiraRightPanelView/>
            </Grid>
          </Grid>       
        </ScrollWrapper>
      </Card>
    )
}

export default JiraMainTabView
