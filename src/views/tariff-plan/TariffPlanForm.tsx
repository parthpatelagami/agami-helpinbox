'use client'

// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Link from 'next/link'

import { useParams } from 'next/navigation'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Custom Component Import

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// Table
import { Box, Divider, TextField, styled } from '@mui/material'

import Tooltip from '@mui/material/Tooltip'
import { useTheme } from '@mui/material/styles'

import TarrifModule from './TarrifModule'
import CustomTextField from '@core/components/mui/TextField'
import { data } from './ModuleFeatureData'
import { getLocalizedUrl } from '@/utils/i18n'

import type { Locale } from '@/configs/i18n'

type moduleData = {
  module_id: string
  limit: string | number
  features: any
}

type submitData = {
  tarrif_plan_name: string
  country_id: string
  currency_id: string
  total_amount: string
  duration: string
  module_feature_right_data: moduleData[]
}
type propsType = {
  defaultValues: any
}

const TarrifPlanForm = (props: propsType) => {
  const defaultValues = props.defaultValues

  // ** Hooks
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit: any = (data: submitData) => {
    console.log(data)

    const serverData = {
      country_id: 0,
      currency_id: 0,
      duration: 0,
      tarrif_plan_name: '',
      total_amount: 0,
      module_feature_right_data: data.module_feature_right_data
    }

    serverData.country_id = Number(data.country_id)
    serverData.currency_id = Number(data.currency_id)
    serverData.duration = Number(data.duration)
    serverData.tarrif_plan_name = data.tarrif_plan_name
    serverData.total_amount = Number(data.total_amount)

    const moduleArray = serverData.module_feature_right_data

    moduleArray.map((mod, index) => {
      mod.limit = mod.limit != null && mod.limit != undefined ? Number(mod.limit) : Number(0)
      const moduleFeature = mod.features

      if (moduleFeature != null && moduleFeature != undefined) {
        const moduleFeatureIds = Object.entries(moduleFeature)
          .filter(([key, value]) => value === true)
          .map(([key]) => key)

        mod.features = moduleFeatureIds
      }
    })

    console.log(serverData)
  }

  const currenyIdSymbolData = {
    1: '8377',
    2: '36',
    3: '65',
    4: '128'
  }

  const rows = data
  const [Currency, setCurrency] = useState('8377')
  const theme = useTheme()
  const { lang: locale } = useParams()

  return (
    <Card>
      <CardHeader
        title='Tarrif Plan'
        action={
          <Box>
            <Tooltip placement='top' title='Reset'>
              <IconButton onClick={() => reset()}>
                <i className='tabler-refresh border-solid text-[20px] text-textSecondary' />
              </IconButton>
            </Tooltip>
            <Tooltip placement='top' title='Close'>
              <Link href={getLocalizedUrl(`tariffplan`, locale as Locale)}>
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Controller
                name='tarrif_plan_name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    label='Tarrif Plan Name'
                    variant='standard'
                    onChange={onChange}
                    placeholder='Pro Plan'
                    error={Boolean(errors.tarrif_plan_name)}
                    aria-describedby='validation-basic-Tarrif-Plan-Name'
                    className='mt-2'
                    {...(errors.tarrif_plan_name && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name='CopyFrom'
                control={control}
                defaultValue='Pro'
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue=''
                    label='CopyFrom'
                    SelectProps={{
                      value: value,
                      onChange: e => onChange(e)
                    }}
                    id='validation-basic-select'
                    error={Boolean(errors.CopyFrom)}
                    aria-describedby='validation-basic-select'
                    {...(errors.CopyFrom && { helperText: 'This field is required' })}
                  >
                    <MenuItem value='Pro'>Pro</MenuItem>
                    <MenuItem value='Basic'>Basic</MenuItem>
                    <MenuItem value='Essential'>Essential</MenuItem>
                    <MenuItem value='Standard'>Standard</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name='country_id'
                control={control}
                defaultValue='1'
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue='1'
                    label='Country'
                    SelectProps={{
                      value: value,
                      onChange: e => onChange(e)
                    }}
                    id='validation-basic-select'
                    error={Boolean(errors.country_id)}
                    aria-describedby='validation-basic-select'
                    {...(errors.country_id && { helperText: 'This field is required' })}
                  >
                    <MenuItem value='1'>India</MenuItem>
                    <MenuItem value='2'>USA</MenuItem>
                    <MenuItem value='3'>Australia</MenuItem>
                    <MenuItem value='4'>Germany</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name='currency_id'
                control={control}
                rules={{ required: true }}
                defaultValue='1'
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue='1'
                    label='Currency'
                    value='1'
                    SelectProps={{
                      value: value,
                      onChange: e => {
                        console.log('Currect change', e)

                        //@ts-ignore
                        setCurrency(currenyIdSymbolData[e.target.value])
                        onChange(e)
                      }
                    }}
                    id='validation-basic-Currency'
                    error={Boolean(errors.currency_id)}
                    aria-describedby='validation-basic-Currency'
                    {...(errors.currency_id && { helperText: 'This field is required' })}
                  >
                    <MenuItem value='1'>₹Ruppee</MenuItem>
                    <MenuItem value='2'>$Dollar</MenuItem>
                    <MenuItem value='3'>AED</MenuItem>
                    <MenuItem value='4'>€Euro</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name='total_amount'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    type='number'
                    value={value}
                    label='Total Amount'
                    onChange={onChange}
                    placeholder='100'
                    variant='standard'
                    className='mt-3'
                    error={Boolean(errors.total_amount)}
                    aria-describedby='validation-basic-Tarrif-Plan-Name'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <IconButton edge='start' size='small' aria-label='toggle password visibility'>
                            {String.fromCharCode(Number(Currency))}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    {...(errors.total_amount && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name='duration'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue=''
                    label='Duration'
                    SelectProps={{
                      value: value,
                      onChange: e => onChange(e)
                    }}
                    id='validation-basic-Duration'
                    error={Boolean(errors.duration)}
                    aria-describedby='validation-basic-Duration'
                    {...(errors.duration && { helperText: 'This field is required' })}
                  >
                    <MenuItem value='1'>Monthly</MenuItem>
                    <MenuItem value='2'>Yearly</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <TarrifModule control={control} rows={rows} errors={errors} />

            <Grid item xs={12} spacing={10}>
              <Button type='submit' variant='contained'>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default TarrifPlanForm
