// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Third Party Imports
import { format, addDays } from 'date-fns'
import type { ReactDatePickerProps } from 'react-datepicker'

// import DatePicker from 'react-datepicker'

import CustomTextField from '@core/components/mui/TextField'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

interface PickerProps {
  label?: string
  end: Date | number
  start: Date | number
}

const PickersRange = ({
  popperPlacement,
  label
}: {
  popperPlacement: ReactDatePickerProps['popperPlacement']
  label: string
}) => {
  // ** States
  // const [startDate, setStartDate] = useState<Date | null | undefined>(new Date())
  // const [endDate, setEndDate] = useState<Date | null | undefined>(addDays(new Date(), 15))
  const [startDateRange, setStartDateRange] = useState<Date | null | undefined>(new Date())
  const [endDateRange, setEndDateRange] = useState<Date | null | undefined>(addDays(new Date(), 45))

  // const handleOnChange = (dates: any) => {
  //   const [start, end] = dates

  //   setStartDate(start)
  //   setEndDate(end)
  // }

  const handleOnChangeRange = (dates: any) => {
    const [start, end] = dates

    setStartDateRange(start)
    setEndDateRange(end)
  }

  const CustomInput = forwardRef((props: PickerProps, ref) => {
    const startDate = format(props.start, 'MM/dd/yyyy')
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return <CustomTextField inputRef={ref} label={props.label || ''} {...props} value={value} />
  })

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <AppReactDatepicker
        selectsRange
        monthsShown={2}
        endDate={endDateRange}
        selected={startDateRange}
        startDate={startDateRange}
        shouldCloseOnSelect={false}
        id='date-range-picker-months'
        onChange={handleOnChangeRange}
        popperPlacement={popperPlacement}
        customInput={
          <CustomInput label={label} end={endDateRange as Date | number} start={startDateRange as Date | number} />
        }
      />
    </Box>
  )
}

export default PickersRange
