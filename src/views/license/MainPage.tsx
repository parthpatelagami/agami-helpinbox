'use client'
import type { ChangeEvent } from 'react'
import { useState } from 'react'

// MUI IMPORTS
import { Card, CardContent } from '@mui/material'

// CUSTOM COMPONENTS
import LicenseHeaderComponent from './components/LicenseHeader'
import LicensePlanComponents from './components/LicensePlan'

const MainPage = () => {
  const [plan, setPlan] = useState<'monthly' | 'annually'>('annually')

  const handleChange = (e: ChangeEvent<{ checked: boolean }>) => {
    if (e.target.checked) {
      setPlan('annually')
    } else {
      setPlan('monthly')
    }
  }

  return (
    <>
      <Card>
        <CardContent>
          <LicenseHeaderComponent plan={plan} handleChange={handleChange} />
          <LicensePlanComponents plan={plan} />
        </CardContent>
      </Card>
    </>
  )
}

export default MainPage
