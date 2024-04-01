import Divider from '@mui/material/Divider'
import {
  Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Card,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import CustomTextField from '@core/components/mui/TextField'
interface LicenseModuleProps {
  control: any
  rows: any[]
  errors: FieldErrors
}
const TarrifModule: React.FC<LicenseModuleProps> = ({ control, rows, errors }) => {
  return (
    <Grid item xs={12} className='mt-5'>
      <Divider />
      <Typography className='text-red-600 mt-4'>
        *Note It is a long established fact that a reader will be distracted by the readable content of a page when
        looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it look like readable English
      </Typography>
      <Card className='mt-5 border'>
        <TableContainer component={Paper}>
          <Table stickyHeader className='min-w-[650px]' aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Module</TableCell>
                <TableCell>Limit</TableCell>
                <TableCell>Features</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell component='th' scope='row'>
                    {row.name}
                    <Controller
                      name={`module_feature_right_data.[${index}].module_id`}
                      defaultValue={23}
                      control={control}
                      rules={{ required: false }}
                      render={({ field: { value, onChange } }) => <></>}
                    />
                  </TableCell>
                  <TableCell align='left'>
                    <Controller
                      name={`module_feature_right_data.[${index}].limit`}
                      defaultValue={0}
                      control={control}
                      rules={{ required: false }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          type='number'
                          value={value}
                          fullWidth
                          label={`Limit`}
                          onChange={onChange}
                          placeholder='0'
                          defaultValue={0}
                          aria-describedby='validation-basic-Tarrif-Plan-Name'
                          className='w-1/2'
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell align='right'>
                    <div className='flex flex-wrap'>
                      {' '}
                      {row.features.map((ft: any, ind: any) => (
                        <Controller
                          key={ind}
                          name={`module_feature_right_data.[${index}].features.${ft}`}
                          control={control}
                          rules={{ required: false }}
                          defaultValue={false}
                          render={({ field: { value, ...field } }) => (
                            <FormControlLabel control={<Checkbox {...field} checked={!!value} />} label={`${ft}`} />
                          )}
                        />
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Grid>
  )
}
export default TarrifModule
