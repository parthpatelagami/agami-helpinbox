'use client'

// React Import
import React, { useState } from 'react'

// Next Import
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

// Mui Import
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'

// Type Imports
import type { Locale } from '@/configs/i18n'
import { getLocalizedUrl } from '@/utils/i18n'

interface Box {
  x: number
  y: number
}

const AddNewBusinessHours: React.FC = () => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const [showAddHoliday, setShowAddHoliday] = useState(false)
  const router = useRouter()
  const { lang: locale } = useParams()
  const [dateValue, setDateValue] = useState<null>(null)

  const [selectedContributionBoxes, setSelectedContributionBoxes] = useState<Box[]>([])
  const [selectedHolidayBoxes, setSelectedHolidayBoxes] = useState<Box[]>([])

  // const [hoveredContributionBox, setHoveredContributionBox] = useState<Box | null>(null)
  // const [hoveredHolidayBox, setHoveredHolidaynBox] = useState<Box | null>(null)

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
    setSelectedHolidayBoxes([])

    // setHoveredContributionBox(null)
    // setHoveredHolidaynBox(null)

    // Reset the background color of all table cells
    const cells = document.querySelectorAll('.box')

    cells.forEach(cell => {
      cell.style.backgroundColor = 'transparent'
    })
  }

  return (
    <Card>
      <CardHeader
        title='Business Hours / New'
        action={
          <Box>
            <Tooltip placement='top' title='Close'>
              <Link href={getLocalizedUrl(`businesshours`, locale as Locale)}>
                <IconButton>
                  <i className='tabler-x border-solid text-[20px] text-textSecondary' />
                </IconButton>
              </Link>
            </Tooltip>
          </Box>
        }
      />
      <Divider />
      <CardContent>
        <Box className='p-5'>
          {/* TITLE COMPONENT */}
          <Box className='mt-10 mb-5' display='flex' flexDirection='column'>
            <Typography variant='h6' className='font-bold text-lg capitalize'>
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
              <Box className='flex justify-center' flexDirection='row'>
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
      </CardContent>
    </Card>
  )
}

export default AddNewBusinessHours
