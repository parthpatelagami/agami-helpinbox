// ** React Imports
import { ChangeEvent, useState } from 'react'

// ** Next Import

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
// ** Custom Component Import
import CustomTextField from '@core/components/mui/TextField'
import { ticketFieldData } from '@core/components/reply'
// ** Icon Imports

interface State {
  password: string
  showPassword: boolean
}


const TicketFieldView = () => {
  // ** States

  return (
    <Card className='mt-7'>        
        <CardContent>        
        <form onSubmit={e => e.preventDefault()}>                 
          {ticketFieldData && 
          <Grid container spacing={5}>  
          {ticketFieldData.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
            {item.inputField === "INPUT" ? (
                <CustomTextField
                fullWidth
                label={`${item.label}`}
                placeholder='Enter Here'
                defaultValue={`${item.defaultValue}`}
                />
            ) : item.inputField === "SELECT" ? (
                <CustomTextField
                select
                fullWidth
                label={`${item.label}`}
                defaultValue={`${item.defaultValue}`}
                >
                {item.optionValue && item.optionValue.map(option => (
                    <MenuItem key={option.id} value={`${option.id}`}>{option.name}</MenuItem>
                ))}
                </CustomTextField>
            ) : null}
            </Grid>
            ))}
            
            <Grid item xs={12}>            
                <Button type='submit' variant='contained'>
                    Save All
                </Button>           
            </Grid>
                    
          </Grid>}          
        </form>    
      </CardContent>
      
    </Card>
  )
}

export default TicketFieldView;
