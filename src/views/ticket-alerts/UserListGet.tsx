'use client'
// ** React Imports
import React, { useState, ChangeEvent, useEffect } from 'react'


// ** MUI Imports
import { styled } from '@mui/material/styles'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import InputAdornment from '@mui/material/InputAdornment'
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { AllUsersData } from '@core/components/ticket-alertdata'
// ** Custom Component Imports
import CustomAutocomplete from '@core/components/mui/Autocomplete'
import CustomTextField from '@/@core/components/mui/TextField'
import { UserDataType } from '@/types/ticketAlertType'
interface Props {
  data: any;
  setData: any;
}

// Styled Autocomplete component
const Autocomplete = styled(CustomAutocomplete)(() => ({

}))

const UserListGet = (props: Props) => {
  // ** States
  const [value, setValue] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const {data, setData} = props
  const [userData, setUserData] =  useState<UserDataType[] | any>();

  function handleDragStart(event:any, option:any) {
    event.dataTransfer.setData('text/plain', JSON.stringify(option));
  }

  const handleRedirection = (option:any) => {
    setOpen(false)
    setValue(option.title);
    setUserData((prevUserData:any) => {
      const newUserData = prevUserData.filter((user: any) => user.id !== option.id);
      return newUserData;
    });
    const newData = [...data]    
    newData.push(option)
    setData(newData)
  }

  useEffect(()=>{
    setUserData(AllUsersData);
  },[])
  return (

      <Autocomplete
        open={open}
        disablePortal
        inputValue={value}
        options={userData}
        onClose={() => setOpen(false)}
        className='mb-4'
        sx={{
          '& + .MuiAutocomplete-popper .MuiAutocomplete-listbox': {  },
        }}
        getOptionLabel={(option: any| unknown) =>
          (option as any).title || ''
        }
        isOptionEqualToValue={(option: any| unknown, value) =>
          value === (option as any)
        }
        onChange={(event, option: any| unknown) =>
          handleRedirection(option as any)
        }
        onInputChange={(event, value: string) => {
          setValue(value)
          setOpen(!!(event.target as HTMLInputElement).value)
        }}
        
        renderInput={(params: AutocompleteRenderInputParams) => (
            
          <CustomTextField
            {...params}
            value={value}
            fullWidth
            placeholder='Search a user...'
            sx={{ '& .MuiInputBase-root': { borderRadius: '30px !important' } }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position='start' sx={{ color: 'text.secondary' }}>
                  <i className='tabler-search' />
                </InputAdornment>
              )
            }}
          />
        )}
        renderOption={(props, option: any| unknown, index) => {
          return value.length ? (            
            <ListItem
              {...props}
                className='!p-0'
                key={(option as any).id}
                onClick={() => handleRedirection(option as any)}
                // draggable 
                // onDragStart={(event) => handleDragStart(event, option as any)} 
            >
              <ListItemButton className="cursor-move" sx={{ py: 1.5 }}>{(option as any).title}</ListItemButton>
            </ListItem>
          ) : null
        }}
      />

  )
}

export default UserListGet;
