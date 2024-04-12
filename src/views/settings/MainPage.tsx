'use client'

// REACT IMPORTS
import React, { useState } from 'react'

// NEXT IMPPORTS
import { useParams } from 'next/navigation'
import Link from 'next/link'

// MUI IMPORTS
import styled from 'styled-components'
import { useTheme } from '@mui/material/styles'
import type { CardContentProps } from '@mui/material/CardContent'
import CardContent from '@mui/material/CardContent'
import type { StepProps } from '@mui/material/Step'
import MuiStep from '@mui/material/Step'
import { Avatar, Box, Card, StepLabel, Stepper, Typography, Breadcrumbs } from '@mui/material'

// CORE IMPORTS
import Icon from '@core/components/icon'
import StepperWrapper from '@/@core/styles/stepper'
import CustomAvatar from '@/@core/components/mui/Avatar'
import { hexToRGBA } from '@/utils/hex-to-rgba'

// CUSTOM COMPONENTS
import ChannelsComponents from './components/channels/MainPage'
import ModulesComponents from './components/Modules'
import WorkFlowComponents from './components/WorkFlow'
import TeamComponents from './components/Team'
import AccountDetailsComponents from './components/AccountDetails'

// Type Imports
import type { Locale } from '@/configs/i18n'
import { getLocalizedUrl } from '@/utils/i18n'

// SIDE BAR MENU
const steps = [
  {
    icon: 'uil:channel',
    title: 'Channels',
    subtitle: 'Bring in customer queries from various sources'
  },
  {
    icon: 'streamline:module-three',
    title: 'Modules',
    subtitle: 'Define and setup related modules'
  },
  {
    icon: 'tabler-grid-dots',
    title: 'Work Flow',
    subtitle: 'Set up your ticket routing and resolution process'
  },
  {
    icon: 'tabler-users',
    title: 'Team',
    subtitle: 'Define agents access levels and working hours'
  },
  {
    icon: 'tabler:user',
    title: 'Account Details',
    subtitle: 'Manage your billing and account information'
  }
]

// STEP CONTAINER STYLE
const StepperHeaderContainer = styled(CardContent)<CardContentProps>(() => ({
  width: 350,
  padding: 20,
  borderRight: `1px solid #dedede`
}))

// STEP MENU STYLE
const Step = styled(MuiStep)<StepProps>(() => ({
  '& .MuiStepLabel-root': {
    padding: 12
  },
  '&:not(:last-of-type) .MuiStepLabel-root': {
    paddingBottom: 12,
    borderBottom: `1px solid #dedede`
  },
  '&:last-of-type .MuiStepLabel-root': {
    paddingBottom: 20
  },
  '& .MuiStepLabel-iconContainer': {
    display: 'none'
  },
  '& + svg': {
    color: '#dedede'
  },
  '&.Mui-completed .step-title': {
    color: '#dedede'
  },
  '& .MuiStepLabel-label': {
    cursor: 'pointer'
  }
}))

const MainPage = () => {
  // STATES
  const [activeStep, setActiveStep] = useState<number>(0)
  const [selectedStep, setSelectedStep] = useState<number>(0)

  // HOOKS
  const theme = useTheme()
  const { lang: locale } = useParams()

  // DEFINE STEP COMPONENTS
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ChannelsComponents />
      case 1:
        return <ModulesComponents />
      case 2:
        return <WorkFlowComponents />
      case 3:
        return <TeamComponents />
      case 4:
        return <AccountDetailsComponents />
      default:
        return null
    }
  }

  // RENDER STEP CONTENT
  const renderContent = () => {
    return getStepContent(activeStep)
  }

  const handleStepClick = (index: number) => {
    setActiveStep(index)
    setSelectedStep(index)
  }

  const renderBreadcrumbs = () => {
    if (selectedStep !== null) {
      const currentUrl = getLocalizedUrl('settings', locale as Locale)

      return (
        <Box className='mt-[-15px]'>
          <Breadcrumbs aria-label='breadcrumb'>
            <Typography color='textPrimary'>Settings</Typography>
            <Link underline='hover' color='inherit' href={currentUrl} aria-current='page'>
              {steps[selectedStep].title}
            </Link>
          </Breadcrumbs>
        </Box>
      )
    } else {
      return null
    }
  }

  return (
    <>
      <Card className='flex flex-col lg:flex-row mt-1'>
        <CardContent>
          <div>{renderBreadcrumbs()}</div>
          <StepperHeaderContainer>
            <StepperWrapper className='h-full'>
              <Stepper connector={<></>} orientation='vertical' activeStep={activeStep} className='h-full min-w-15rem'>
                {steps.map((step, index) => {
                  const RenderAvatar = activeStep >= index ? CustomAvatar : Avatar

                  return (
                    <Step
                      key={index}
                      onClick={() => handleStepClick(index)}
                      className={activeStep === index ? 'Mui-completed' : ''}
                    >
                      <StepLabel>
                        <div className='step-label'>
                          <RenderAvatar
                            variant='rounded'
                            {...(activeStep >= index && { skin: 'light' })}
                            {...(activeStep === index && { skin: 'filled' })}
                            {...(activeStep >= index && { color: 'primary' })}
                            className={`
                            ${activeStep === index && theme.shadows[5]}
                            ${activeStep > index && hexToRGBA(theme.palette.primary.main, 0.4)}
                          `}
                          >
                            <Icon icon={step.icon} fontSize='1.5rem' />
                          </RenderAvatar>
                          <div>
                            <Typography className='font-bold text-sm'>{step.title}</Typography>
                            <Typography className='font-normal text-xs'>{step.subtitle}</Typography>
                          </div>
                        </div>
                      </StepLabel>
                    </Step>
                  )
                })}
              </Stepper>
            </StepperWrapper>
          </StepperHeaderContainer>
        </CardContent>
        <CardContent className='w-full ml-[-40px]'>{renderContent()}</CardContent>
      </Card>
    </>
  )
}

export default MainPage
