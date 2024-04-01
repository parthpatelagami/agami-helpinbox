'use client'

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Box, Typography, Divider, Card, IconButton } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import AddIcon from '@mui/icons-material/Add'

import BusinessHoursTable from './components/BusinessHoursTable'

const MainPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const router = useRouter()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setIsLoading(true)

    router.push('/business-hours/add-new-business-hours')
    setIsLoading(false)
  }

  return (
    <>
      <Card>
        <Box className='p-5'>
          <div className='flex justify-between items-center mb-5'>
            <Typography variant='caption' className='font-bold text-lg capitalize'>
              Business Hours
            </Typography>

            {isLoading && (
              <div>
                <IconButton title='Info'>
                  <InfoIcon />
                </IconButton>
                <IconButton title='Add' onClick={handleClick}>
                  <AddIcon />
                </IconButton>
              </div>
            )}
          </div>

          <Divider />

          <Box>
            <Typography variant='h1' component='p' className='font-medium text-base mt-5'>
              Business hours tell what days and hours of the week your team is working.
            </Typography>
          </Box>

          <Card className='mt-20 mb-10 m-10'>
            <BusinessHoursTable />
          </Card>
        </Box>
      </Card>
    </>
  )
}

export default MainPage
