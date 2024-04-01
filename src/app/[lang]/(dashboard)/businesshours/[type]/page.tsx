'use client'

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { Cancel } from '@mui/icons-material'

interface Box {
  x: number
  y: number
}

const AddNewBusinessHours: React.FC = () => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const [showAddHoliday, setShowAddHoliday] = useState(false)
  const router = useRouter()
  const [dateValue, setDateValue] = useState<null>(null)

  const [selectedContributionBoxes, setSelectedContributionBoxes] = useState<Box[]>([])
  const [hoveredContributionBox, setHoveredContributionBox] = useState<Box | null>(null)
  const [selectedHolidayBoxes, setSelectedHolidayBoxes] = useState<Box[]>([])
  const [hoveredHolidayBox, setHoveredHolidaynBox] = useState<Box | null>(null)

  const [businessHours, setBusinessHours] = useState('')
  const [businessHoursError, setBusinessHoursError] = useState(false)
  const [holidayHours, setHolidayHours] = useState('')
  const [holidayHoursError, setHolidayHoursError] = useState(false)

  const [isMouseDownContribution, setIsMouseDownContribution] = useState(false)
  const [isMouseDownHoliday, setIsMouseDownHoliday] = useState(false)

  const handleContributionBoxHover = (box: Box, event: React.MouseEvent) => {
    const isSelected = selectedContributionBoxes.some(selectedBox => selectedBox.x === box.x && selectedBox.y === box.y)

    if (isMouseDownContribution && event.type === 'mouseover') {
      const updatedSelectedContributionBoxes = isSelected
        ? selectedContributionBoxes.filter(selectedBox => !(selectedBox.x === box.x && selectedBox.y === box.y))
        : [...selectedContributionBoxes, box]

      setSelectedContributionBoxes(updatedSelectedContributionBoxes)
      const element = document.getElementById(`box-${box.x}-${box.y}`)

      if (element) {
        if (isSelected) {
          element.style.backgroundColor = 'transparent'
        } else {
          element.style.backgroundColor = '#078f00'
        }
      }
    }

    if (event.type === 'click') {
      const updatedSelectedContributionBoxes = isSelected
        ? selectedContributionBoxes.filter(selectedBox => !(selectedBox.x === box.x && selectedBox.y === box.y))
        : [...selectedContributionBoxes, box]

      setSelectedContributionBoxes(updatedSelectedContributionBoxes)
      const element = document.getElementById(`box-${box.x}-${box.y}`)

      if (element) {
        if (isSelected) {
          element.style.backgroundColor = 'transparent'
        } else {
          element.style.backgroundColor = '#078f00'
        }
      }
    }
  }

  const handleHolidayBoxHover = (box: Box, event: React.MouseEvent) => {
    const isSelected = selectedHolidayBoxes.some(selectedBox => selectedBox.x === box.x && selectedBox.y === box.y)

    if (isMouseDownHoliday && event.type === 'mouseover') {
      const updatedSelectedHolidayBoxes = isSelected
        ? selectedHolidayBoxes.filter(selectedBox => !(selectedBox.x === box.x && selectedBox.y === box.y))
        : [...selectedHolidayBoxes, box]

      setSelectedHolidayBoxes(updatedSelectedHolidayBoxes)
      const element = document.getElementById(`holiday-box-${box.x}-${box.y}`)

      if (element) {
        if (isSelected) {
          element.style.backgroundColor = 'transparent'
        } else {
          element.style.backgroundColor = '#078f00'
        }
      }
    }

    if (event.type === 'click') {
      const updatedSelectedHolidayBoxes = isSelected
        ? selectedHolidayBoxes.filter(selectedBox => !(selectedBox.x === box.x && selectedBox.y === box.y))
        : [...selectedHolidayBoxes, box]

      setSelectedHolidayBoxes(updatedSelectedHolidayBoxes)
      const element = document.getElementById(`holiday-box-${box.x}-${box.y}`)

      if (element) {
        if (isSelected) {
          element.style.backgroundColor = 'transparent'
        } else {
          element.style.backgroundColor = '#078f00'
        }
      }
    }
  }

  const handleClose = () => {
    router.push('/businesshours')
  }

  const toggleAddHoliday = () => {
    setShowAddHoliday(!showAddHoliday)
  }

  const resetPage = () => {
    setBusinessHours('')
    setBusinessHoursError(false)
    setHolidayHours('')
    setHolidayHoursError(false)
    setDateValue(null)
    setSelectedContributionBoxes([])
    setHoveredContributionBox(null)
    setSelectedHolidayBoxes([])
    setHoveredHolidaynBox(null)
  }

  return (
    <Card className='m-5'>
      <Box className='p-5'>
        {/* HEADER COMPONENTS */}
        <Box className='flex justify-between items-center'>
          <Typography variant='caption' className='font-bold text-lg capitalize'>
            Business Hours / New
          </Typography>

          <IconButton title='Close' onClick={handleClose}>
            <Cancel />
          </IconButton>
        </Box>

        <Divider />

        {/* TITLE COMPONENT */}
        <Box className='mt-10 mb-5' display='flex' flexDirection='column'>
          <Typography variant='caption' className='font-bold text-lg capitalize'>
            Title
            <span className='text-red-500'>*</span>
          </Typography>

          <TextField
            className='w-72'
            id='standard-multiline-flexible'
            label='Business Hours'
            variant='standard'
            placeholder='eg:- Mumbai Hours'
            error={businessHoursError}
            value={businessHours}
            onBlur={() => {
              if (businessHours.trim() === '') {
                setBusinessHoursError(true)
              } else {
                setBusinessHoursError(false)
              }
            }}
            onChange={e => {
              setBusinessHours(e.target.value)
            }}
          />
        </Box>

        <Divider />

        {/* CONTRIBUTION COMPONENT */}
        <Box>
          <Box className='flex justify-center' flexDirection='row'>
            <Box className='w-28 mt-10'>
              {daysOfWeek.map((day, index) => (
                <Typography key={index} variant='h6' className='mt-3 mx-2 text-right'>
                  {day}
                </Typography>
              ))}
            </Box>
            <Box className='mt-10 mb-4'>
              <TableContainer>
                <Table>
                  <TableBody>
                    {[...Array(7).keys()].map(rowIndex => (
                      <TableRow key={rowIndex}>
                        {[...Array(24).keys()].map(colIndex => (
                          <TableCell
                            key={`${rowIndex}-${colIndex}`}
                            id={`box-${colIndex}-${rowIndex}`}
                            className={`box ${selectedContributionBoxes.some(selectedBox => selectedBox.x === colIndex && selectedBox.y === rowIndex) ? 'selected' : ''}`}
                            style={{
                              border: '1px solid #888888',
                              width: '35px',
                              height: '35px',
                              padding: 0
                            }}
                            onMouseOver={e => handleContributionBoxHover({ x: colIndex, y: rowIndex }, e)}
                            onMouseDown={() => setIsMouseDownContribution(true)}
                            onMouseUp={() => setIsMouseDownContribution(false)}
                            onClick={e => handleContributionBoxHover({ x: colIndex, y: rowIndex }, e)}
                          />
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
          <Box className='pb-7 pl-20 ml-5'>
            <Box className='flex justify-center'>
              {[...Array(24)].map((_, index) => (
                <Typography
                  key={index}
                  variant='h6'
                  style={{ transform: 'rotate(-90deg)' }}
                >{`${index}:00`}</Typography>
              ))}
            </Box>
          </Box>
        </Box>

        <Divider />

        {/* HOLIDAY COMPONENT */}
        <Box className='mt-10 mb-5'>
          <Typography variant='h2' className='text-lg font-bold capitalize mb-5'>
            Holidays
          </Typography>
          <Typography variant='h2' className='text-base font-normal capitalize mb-5'>
            You can use holidays to create exceptions to your regular business hours schedules. For example, you might
            add a holidays for reduced office hours, or perhaps for a day off (we hope that's not wishful thinking!)
          </Typography>
          {!showAddHoliday && (
            <Button variant='contained' onClick={toggleAddHoliday}>
              Add Holiday
            </Button>
          )}
        </Box>

        {showAddHoliday && (
          <>
            <Box className='mt-10 mb-10 p-5'>
              <TextField
                className='w-72'
                id='standard-multiline-flexible'
                label='Holiday Title'
                required
                variant='standard'
                placeholder='Holiday Title'
                error={holidayHoursError}
                value={holidayHours}
                onBlur={() => {
                  if (holidayHours.trim() === '') {
                    setHolidayHoursError(true)
                  } else {
                    setHolidayHoursError(false)
                  }
                }}
                onChange={e => {
                  setHolidayHours(e.target.value)
                }}
              />
              <Box className='w-full h-52 bg-gray-200 mt-5 p-5'>
                <Box className='flex' flexDirection='row'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label='Select Date'
                      value={dateValue}
                      onChange={newValue => setDateValue(newValue)}
                      minDate={dayjs(new Date())}
                    />
                  </LocalizationProvider>
                  <Box className='justify-center relative mx-5 p-1'>
                    <TableContainer>
                      <Table>
                        <TableBody>
                          <TableRow>
                            {[...Array(24).keys()].map(colIndex => (
                              <TableCell
                                key={colIndex}
                                id={`holiday-box-${colIndex}-0`}
                                className={`box ${selectedHolidayBoxes.some(selectedBox => selectedBox.x === colIndex && selectedBox.y === 0) ? 'selected' : ''}`}
                                style={{
                                  border: '1px solid #888888'
                                }}
                                onMouseOver={e => handleHolidayBoxHover({ x: colIndex, y: 0 }, e)}
                                onClick={e => handleHolidayBoxHover({ x: colIndex, y: 0 }, e)}
                                onMouseDown={() => setIsMouseDownHoliday(true)}
                                onMouseUp={() => setIsMouseDownHoliday(false)}
                              />
                            ))}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Box className='flex justify-center mt-5 ml-0 text-right'>
                      {[...Array(24)].map((_, index) => (
                        <Typography
                          key={index}
                          variant='h6'
                          style={{ transform: 'rotate(-90deg)', fontSize: '14px', height: '10px' }}
                        >{`${index}:00`}</Typography>
                      ))}
                    </Box>
                  </Box>
                </Box>

                <Box className='mt-10'>
                  <Button className='mx-2' variant='contained'>
                    Add Holiday
                  </Button>
                  <Button className='mx-2' variant='outlined' onClick={toggleAddHoliday}>
                    Close
                  </Button>
                </Box>
              </Box>
            </Box>
          </>
        )}

        <Divider />

        {/* BUTTON COMPONENTS */}
        <Box className='mt-5'>
          <Box className='flex items-center'>
            <Button className='mx-2' variant='contained'>
              Save
            </Button>
            <Button className='mx-2' variant='outlined' onClick={resetPage}>
              Reset
            </Button>
            <Button className='mx-2' variant='outlined' onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

export default AddNewBusinessHours
